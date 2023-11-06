<template>
  <Dialog :open="open" :onClose="onClose">
    <div class="flex h-full flex-col overflow-y-auto">
      <div class="relative sticky top-0 border-b border-slate-100 bg-white p-4">
        <input
          type="text"
          v-model="searchText"
          placeholder="政見, 學歷, ..."
          class="w-full border-0 py-0 pl-16 placeholder-slate-400 focus:ring-0"
        />
        <ArrowLeftIcon
          @click="onClose"
          class="absolute inset-y-0 left-4 h-5 h-full w-5 cursor-pointer text-gray-400"
        />
        <MagnifyingGlassIcon
          class="absolute inset-y-0 left-12 h-5 h-full w-5 text-gray-400"
        />
      </div>
      <ul
        :class="{
          'pb-[60vh]': isMobile,
        }"
      >
        <li
          v-for="tag in filteredTags"
          :key="tag"
          @click="onSelect(tag)"
          class="flex cursor-pointer gap-2 p-4 hover:bg-slate-100"
        >
          <div class="h-5 w-5 flex-none">
            <CheckIcon v-if="tagSet.has(tag)" class="h-5 w-5 text-slate-400" />
          </div>
          {{ tag }}
        </li>
      </ul>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import {
  MagnifyingGlassIcon,
  CheckIcon,
  ArrowLeftIcon,
} from '@heroicons/vue/24/outline';

const {
  open,
  onClose,
  onSelect = () => {},
} = defineProps<{
  open: boolean;
  onClose: () => void;
  onSelect?: (tag: string) => void;
}>();

const { isMobile } = useDevice();

const searchText = ref<string>('');
const { tagSet } = useSelectTag();
const { data } = await getAllTags();

const filteredTags = computed(() =>
  searchText.value
    ? data.value?.filter((tag) => tag.includes(searchText.value))
    : data.value,
);
</script>
