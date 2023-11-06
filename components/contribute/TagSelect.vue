<template>
  <HeadlessCombobox as="div" class="relative z-10" v-model="selected">
    <div class="relative overflow-hidden rounded-md bg-white drop-shadow">
      <HeadlessComboboxInput
        class="w-48 border-none px-3 py-2 placeholder-slate-400"
        placeholder="標籤"
        @change="query = $event.target.value"
      />
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
        class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white drop-shadow"
      >
        <div
          v-if="filteredTags.length === 0 && query !== ''"
          class="relative px-3 py-2 text-slate-400"
        >
          查無此標籤
        </div>

        <HeadlessComboboxOption
          v-for="tag in filteredTags"
          as="template"
          :key="tag"
          :value="tag"
          v-slot="{ selected, active }"
        >
          <li
            class="relative cursor-pointer select-none py-2 pl-10 pr-4"
            :class="{
              'bg-slate-100 font-bold': active,
            }"
          >
            <span :class="{ 'font-bold': selected }">
              {{ tag }}
            </span>
            <span
              class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary"
            >
              <CheckIcon v-if="selected" class="h-5 w-5" aria-hidden="true" />
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
