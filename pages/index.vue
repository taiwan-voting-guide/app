<template>
  <main class="flex-1 relative overflow-auto bg-slate-200">
    <ClientOnly>
      <div v-if="loading" class="flex flex-1 items-center justify-center">
        <ArrowPathIcon class="h-8 w-8 animate-spin text-primary" />
      </div>
      <div v-else-if="politicians.length === 0" class="h-full">
        <AppPoliticianCTA />
      </div>
      <div class="flex absolute w-full top-0" v-else>
        <div class="mx-auto px-20 pb-16 pt-1">
          <table>
            <thead class="sticky top-1 z-10">
              <tr>
                <th
                  class="w-80 min-w-[20rem]"
                  scope="col"
                  v-for="politician in politicians"
                  :key="politician.name"
                >
                  <AppPoliticianHeader
                    :photoURL="politician.photoURL"
                    :name="politician.name"
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tag in tags">
                <AppPoliticianContent
                  v-for="politician in politicians"
                  :key="`${politician.name}-${tag}`"
                  :politicianName="politician.name"
                  :tag="tag"
                  :content="politician.contents.get(tag)"
                />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ClientOnly>
  </main>
  <div
    class="absolute top-0 m-2 inline-flex flex-col p-2 z-10 rounded-md bg-white drop-shadow transition-all"
    :class="{ 'left-60': showTagSideBar, 'left-0': !showTagSideBar }"
  >
    <Button :onClick="toggleSidebar">
      <span class="text-lg"> 🏷️ </span>
    </Button>
    <Button :onClick="openPoliticianSearchDialog">
      <span class="text-lg"> 🔍 </span>
    </Button>
  </div>
  <aside
    class="absolute w-60 top-0 z-10 h-full flex-none overflow-y-scroll bg-white transition-all"
    :class="{
      'left-0 drop-shadow-md': showTagSideBar,
      '-left-60': !showTagSideBar,
    }"
  >
    <header class="sticky flex flex-col gap-3 top-0 bg-white p-3">
      <ButtonPrimary to="/docs/contribute"> 🏷️ 新增標籤 </ButtonPrimary>
      <input
        v-model="searchText"
        placeholder="🔍 搜尋標籤"
        type="search"
        class="h-10 w-full rounded-md border-primary bg-slate-50 px-2 shadow-inner placeholder:text-slate-400 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </header>
    <ClientOnly>
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
    </ClientOnly>
  </aside>
  <HeadlessListbox>
    <AppPoliticianSearch />
  </HeadlessListbox>
</template>

<script setup lang="ts">
import { CheckIcon, ArrowPathIcon } from '@heroicons/vue/24/outline';

// fetch app data
const { data, error } = await queryAppContent();
if (error.value) {
  throw createError({ statusCode: 500, statusMessage: 'App data not found' });
}
const allTags = data.value?.tags || [];

// set initial tags
const url = useRequestURL();
const tagParam = url.searchParams.get('tags') || '';
const initialTags = (tagParam ? tagParam.split(',') : []).filter((tag) =>
  allTags.includes(tag)
);
const { set: setTags } = useSelectTag();
setTags(initialTags);

// set all politician names
const { data: politicianNav, error: navErr } = queryPoliticianNav();
if (navErr.value) {
  throw createError({ statusCode: 500, statusMessage: 'politician not found' });
}

const allPoliticianNames = new Set<string>();
politicianNav.value?.forEach((nav) => {
  allPoliticianNames.add(nav.title);
});

// set initial politicians
const politiciansParam = url.searchParams.get('politicians') || '';
const initialPoliticianNames = (
  politiciansParam ? politiciansParam.split(',') : []
).filter((name) => allPoliticianNames.has(name));

const {
  set: setPoliticianNames,
  politicians,
  politicianNames,
  loading,
} = useSelectPolitician();
setPoliticianNames(initialPoliticianNames);

const { tags, toggle, tagSet } = useSelectTag();

watch([tags, politicianNames], () => {
  const query: { tags?: string; politicians?: string } = {};

  const tagParam = tags.value.join(',');
  if (tagParam) {
    query.tags = tagParam;
  }

  const politicianParam = politicianNames.value.join(',');
  if (politicianParam) {
    query.politicians = politicianParam;
  }

  navigateTo({ query });
});

const searchText = ref<string>('');
const filterTags = computed(() =>
  searchText.value
    ? allTags.filter((tag) => tag.includes(searchText.value))
    : allTags
);

const showTagSideBar = useShowTagSideBar();
const toggleSidebar = () => {
  showTagSideBar.value = !showTagSideBar.value;
};

const showPoliticianSearchDialog = useShowPoliticianSearchDialog();
const openPoliticianSearchDialog = () => {
  showPoliticianSearchDialog.value = true;
};
</script>
