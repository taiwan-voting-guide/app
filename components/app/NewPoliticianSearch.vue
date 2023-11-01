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
          v-for="result in results"
          :key="result.key"
          @click="onSelect(result.value)"
          class="cursor-pointer p-4 hover:bg-slate-100"
        >
          {{ result.name }}
        </li>
      </ul>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

const {
  open,
  onClose,
  onSelect = () => {},
} = defineProps<{
  open: boolean;
  onClose: () => void;
  onSelect?: (politicians: Array<string> | string) => void;
}>();

const searchText = ref<string>('');

const { data } = await getPoliticianSearchOptions();

const results = computed(() => {
  if (!data?.value) {
    return [];
  }

  const keywords = searchText.value.trim().replace(/\s+/g, ' ').split(' ');
  const results: Array<PoliticianSearchOption> = [];
  for (const option of data.value) {
    for (const keyword of keywords) {
      if (option.key.includes(keyword)) {
        results.push(option);
        break;
      }
    }
  }

  return results;
});
</script>
