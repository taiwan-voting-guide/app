<template>
  <div class="flex h-screen w-screen flex-col">
    <AppHeader />
    <div class="relative flex flex-1 overflow-scroll">
      <main class="relative flex-1 scroll-pt-[5.5rem] overflow-auto">
        <div v-if="politicians.length === 0" class="h-full">
          <AppCTA />
        </div>
        <div v-else class="absolute top-0 flex w-full">
          <div class="mx-auto px-20 pb-16">
            <table class="border-separate border-spacing-2">
              <thead class="sticky top-2 z-10">
                <tr>
                  <th
                    class="w-80 min-w-[20rem] max-w-[20rem]"
                    scope="col"
                    v-for="politician in politicians"
                    :key="politician"
                  >
                    <AppContentHeader :politician="politician" />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="tag in tags" :key="`${tag}-${politicians.join('')}`">
                  <AppContent
                    v-for="politician in politicians"
                    :key="`${politician}-${tag}`"
                    :politician="politician"
                    :tag="tag"
                  />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <div
        class="absolute top-0 z-10 m-2 inline-flex flex-col rounded-md bg-white p-2 drop-shadow transition-all"
        :class="{ 'left-60': showTagDialog, 'left-0': !showTagDialog }"
      >
        <ButtonInvisible :onClick="toggleTagDialog">
          <span class="text-lg"> 🏷️ </span>
        </ButtonInvisible>
        <ButtonInvisible :onClick="() => (showPoliticianDialog = true)">
          <span class="text-lg"> 🔍 </span>
        </ButtonInvisible>
      </div>
      <aside
        class="absolute top-0 z-10 h-full w-60 flex-none overflow-y-scroll bg-white transition-all"
        :class="{
          'left-0 drop-shadow-md': showTagDialog,
          '-left-60': !showTagDialog,
        }"
      >
        <header class="sticky top-0 flex flex-col gap-3 bg-white p-3">
          <ButtonPrimary to="/docs/contribute"> 🏷️ 新增標籤 </ButtonPrimary>
          <input
            v-model="searchText"
            placeholder="🔍 搜尋標籤"
            type="search"
            class="h-10 w-full rounded-md border-primary bg-slate-50 px-2 shadow-inner placeholder:text-slate-400 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </header>
        <template v-if="filterTags && filterTags.length > 0">
          <ul class="px-3">
            <li>
              <button
                v-for="tag in filterTags"
                @click="() => toggle(tag)"
                class="ease w-full rounded-md px-4 py-2 text-left hover:bg-slate-100"
                :class="{
                  'text-primary': tagSet.has(tag),
                  'text-slate-600': !tagSet.has(tag),
                }"
                :key="tag"
              >
                <div class="flex items-center">
                  <div class="mr-1 inline-block h-4 w-4">
                    <CheckIcon class="h-4 w-4" v-if="tagSet.has(tag)" />
                  </div>
                  {{ tag }}
                </div>
              </button>
            </li>
          </ul>
        </template>
        <template v-else>
          <p>找不到標籤</p>
        </template>
      </aside>
    </div>
  </div>
  <HeadlessListbox>
    <AppPoliticianSearch />
  </HeadlessListbox>
</template>

<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/24/outline';

// fetch app data
const { data } = await getAppData();
const allTags = data.value?.tags || [];

const { politicians } = useSelectPolitician();
const { tags, toggle, tagSet } = useSelectTag();

watch([tags, politicians], () => {
  const query: { tags?: string; politicians?: string } = {};

  const tagParam = tags.value.join(',');
  if (tagParam) {
    query.tags = tagParam;
  }

  const politicianParam = politicians.value.join(',');
  if (politicianParam) {
    query.politicians = politicianParam;
  }

  navigateTo({ query });
});

const searchText = ref<string>('');
const filterTags = computed(() =>
  searchText.value
    ? allTags.filter((tag) => tag.includes(searchText.value))
    : allTags,
);

const showTagDialog = useTagDialog();
const toggleTagDialog = () => {
  showTagDialog.value = !showTagDialog.value;
};

const showPoliticianDialog = usePoliticianDialog();
</script>
