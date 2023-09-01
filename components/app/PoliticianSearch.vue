<template>
  <ClientOnly>
    <HeadlessDialog :open="isOpen" @close="onClose">
      <div class="fixed inset-0 z-40 bg-black/40" aria-hidden="true" />
      <div class="fixed inset-0 z-40 flex items-center justify-center">
        <HeadlessDialogPanel
          class="w-full max-w-md rounded-md bg-white p-3 drop-shadow"
        >
          <div class="mb-3 flex items-center">
            <input
              v-model="searchText"
              placeholder="🔍 e.g. 2024_總統, 第八選區, 侯友宜"
              type="search"
              class="h-8 w-full rounded-md border-primary bg-slate-100 px-2 shadow-inner placeholder:text-slate-400 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <ul class="flex w-full flex-col gap-2 rounded-md">
            <template v-if="results.length === 0">
              <li
                class="flex h-24 items-center justify-center p-2 text-slate-600"
              >
                沒有結果
              </li>
            </template>
            <template v-else>
              <li
                v-for="[group, ...politicians] in results"
                class="cursor-pointer rounded-md p-2 hover:bg-slate-100"
                @click="() => onClick(politicians)"
              >
                <span class="font-semibold text-slate-600">
                  {{ group }}
                </span>
                <ol class="mt-2 flex gap-2">
                  <li
                    class="rounded-md bg-primary/20 px-2 text-slate-600"
                    v-for="politician in politicians"
                  >
                    {{ politician }}
                  </li>
                </ol>
              </li>
            </template>
          </ul>
        </HeadlessDialogPanel>
      </div>
    </HeadlessDialog>
  </ClientOnly>
</template>

<script setup lang="ts">
const { data } = await queryAppContent();

const searchPoliticianResults = computed(() => {
  const results = new Map<string, Array<string>>();

  if (!data.value) {
    return results;
  }

  for (const [groupName, politicians] of Object.entries(data.value.group)) {
    if (groupName === 'title' || groupName.startsWith('_')) {
      continue;
    }

    const key = `${groupName}_${politicians.join('_')}`;
    const value = [groupName, ...politicians];

    results.set(key, value);
  }

  return results;
});

const searchText = useState<string>('search_politician_text', () => '');
const results = computed(() => {
  const keywords = searchText.value.trim().replace(/\s+/g, ' ').split(' ');

  const results: Array<Array<string>> = [];
  searchPoliticianResults.value.forEach((value, key) => {
    for (const keyword of keywords) {
      if (key.includes(keyword)) {
        results.push(value);
        break;
      }
    }
  });

  return results;
});

const { set } = useSelectPolitician();
const isOpen = useShowPoliticianSearchDialog();
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid';

const onClose = () => {
  isOpen.value = false;
};

const onClick = async (politicians: Array<string>) => {
  set(politicians);
  searchText.value = '';
  isOpen.value = false;
};
</script>
