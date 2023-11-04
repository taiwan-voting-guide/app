<template>
  <Dialog :open="open" :onClose="onClose">
    <div class="flex h-72 flex-col overflow-y-auto">
      <div class="relative sticky top-0 border-b border-slate-100 bg-white p-4">
        <input
          type="text"
          v-model="searchText"
          placeholder="2024_總統, 侯友宜, 第八選舉區, ..."
          class="w-full border-0 bg-white/40 py-0 pl-9 placeholder-slate-400 backdrop-blur-sm focus:ring-0"
        />
        <MagnifyingGlassIcon
          class="absolute inset-y-0 left-4 h-5 h-full w-5 text-gray-400"
        />
      </div>
      <ul>
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
import { MagnifyingGlassIcon, CheckIcon } from '@heroicons/vue/24/outline';

const {
  open,
  onClose,
  onSelect = () => {},
} = defineProps<{
  open: boolean;
  onClose: () => void;
  onSelect?: (tag: string) => void;
}>();

const searchText = ref<string>('');
const { tagSet } = useSelectTag();
const { data } = await getAllTags();

const filteredTags = computed(() =>
  searchText.value
    ? data.value.filter((tag) => tag.includes(searchText.value))
    : data.value,
);
</script>
