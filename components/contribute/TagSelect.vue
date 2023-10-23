<template>
  <HeadlessCombobox as="div" class="relative z-10" v-model="selected">
    <div class="relative overflow-hidden rounded bg-white drop-shadow-md">
      <HeadlessComboboxInput
        class="w-full border-none py-1 pl-3 text-slate-600"
        @change="query = $event.target.value"
      />
      <div
        v-if="!selected && query === ''"
        class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400"
      >
        政治人物
      </div>
      <HeadlessComboboxButton
        class="absolute inset-y-0 right-0 flex items-center pr-2"
      >
        <ChevronUpDownIcon class="h-5 w-5 text-slate-400" aria-hidden="true" />
      </HeadlessComboboxButton>
    </div>
    <HeadlessTransitionRoot
      leave="transition"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      @after-leave="query = ''"
    >
      <HeadlessComboboxOptions
        class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      >
        <div
          v-if="filteredTags.length === 0 && query !== ''"
          class="relative select-none px-4 py-2 text-slate-600"
        >
          查無此政治人物
        </div>

        <HeadlessComboboxOption
          v-for="person in filteredTags"
          as="template"
          :key="person"
          :value="person"
          v-slot="{ selected, active }"
        >
          <li
            class="relative cursor-default select-none py-2 pl-10 pr-4"
            :class="{
              'bg-slate-100': active,
            }"
          >
            <span
              class="block truncate"
              :class="{ 'font-medium': selected, 'font-normal': !selected }"
            >
              {{ person }}
            </span>
            <span
              v-if="selected"
              class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary"
            >
              <CheckIcon class="h-5 w-5" aria-hidden="true" />
            </span>
          </li>
        </HeadlessComboboxOption>
      </HeadlessComboboxOptions>
    </HeadlessTransitionRoot>
  </HeadlessCombobox>
</template>

<script setup lang="ts">
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';

const { tag = '', onSelectTag } = defineProps<{
  tag?: string;
  onSelectTag: (tag: string) => void;
}>();

const { data } = await getAllTags();

let selected = ref(tag);
let query = ref('');

watchEffect(() => {
  if (selected.value === '') {
    return;
  }

  onSelectTag(selected.value);
});

const filteredTags = computed(() => {
  if (data.value === null) {
    return [];
  }

  return query.value === ''
    ? data.value
    : data.value.filter((p: string) => p.includes(query.value));
});
</script>
