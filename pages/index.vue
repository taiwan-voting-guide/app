<template>
  <aside
    class="sticky left-0 top-0 z-40 h-full flex-none overflow-y-scroll bg-white transition-all"
    :class="{ 'w-0': !showTagSideBar, 'w-60': showTagSideBar }"
  >
    <header class="sticky top-0 w-full bg-white p-3">
      <input
        v-model="searchText"
        placeholder="搜尋標籤 e.g. 目前政黨"
        type="search"
        class="h-8 w-full rounded border-primary bg-slate-50 px-2 shadow-inner placeholder:text-slate-400 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <div class="text-right">
        <NuxtLink to="/docs/contribute#標籤" class="text-xs text-primary"
          >沒有你需要的標籤嗎?</NuxtLink
        >
      </div>
    </header>
    <ClientOnly>
      <template v-if="filterTags && filterTags.length > 0">
        <ul class="px-3">
          <li>
            <button
              v-for="tag in filterTags"
              @click="() => toggle(tag)"
              class="ease w-full rounded px-4 py-2 text-left hover:bg-slate-100"
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
  <main class="flex flex-1 flex-col overflow-hidden bg-slate-50">
    <div class="flex w-full items-center p-3">
      <Button :onClick="toggleSidebar">
        <TagIcon class="h-6 w-6 text-slate-600" />
      </Button>
      <Button :onClick="openPoliticianSearchDialog">
        <MagnifyingGlassIcon class="h-6 w-6 text-slate-600" />
      </Button>
    </div>
    <ClientOnly>
      <div class="h-full" v-if="politicians.length === 0">
        <AppPoliticianCTA />
      </div>
      <div v-else class="w-full flex-1 overflow-scroll pb-8 pr-8">
        <table>
          <thead class="sticky top-0 z-20 bg-slate-50">
            <tr>
              <th class="sticky left-0 top-0 min-w-[14rem] bg-slate-50"></th>
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
              <AppTagBlock :tag="tag" />
              <td
                class="h-px"
                v-for="politician in politicians"
                :key="politician.name + tag"
              >
                <AppPoliticianContentBlock
                  :content="politician.contents.get(tag)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ClientOnly>
  </main>
  <HeadlessListbox>
    <AppPoliticianSearch />
  </HeadlessListbox>
</template>

<script setup lang="ts">
import {
  CheckIcon,
  TagIcon,
  MagnifyingGlassIcon,
} from '@heroicons/vue/24/outline';

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

const { set: setPoliticianNames } = useSelectPolitician();
setPoliticianNames(initialPoliticianNames);

const { tags, toggle, tagSet } = useSelectTag();
const { politicians, politicianNames } = useSelectPolitician();

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
