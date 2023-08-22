<template>
  <Sidebar :hidden="!showTagSideBar">
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
            <SidebarItem
              v-for="tag in filterTags"
              @click="() => toggle(tag)"
              :key="tag"
              :activated="tagSet.has(tag)"
            >
              <div class="flex items-center">
                <div class="mr-1 inline-block h-4 w-4">
                  <CheckIcon class="h-4 w-4" v-if="tagSet.has(tag)" />
                </div>
                {{ tag }}
              </div>
            </SidebarItem>
          </li>
        </ul>
      </template>
      <template v-else>
        <p>找不到標籤</p>
      </template>
    </ClientOnly>
  </Sidebar>
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
        <PoliticianCTA />
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
                <PoliticianHeader
                  :photoURL="politician.photoURL"
                  :name="politician.name"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tag in tags">
              <TagBlock :tag="tag" />
              <td
                class="h-px"
                v-for="politician in politicians"
                :key="politician.name + tag"
              >
                <PoliticianContentBlock
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
    <PoliticianSearch />
  </HeadlessListbox>
</template>

<script setup lang="ts">
import {
  CheckIcon,
  TagIcon,
  MagnifyingGlassIcon,
} from "@heroicons/vue/24/outline";

const { $allTags } = useNuxtApp();

const { tags, toggle, tagSet } = useSelectTag();
const { politicians, politicianNames } = useSelectPolitician();

watch([tags, politicianNames], () => {
  const query: { tags?: string; politicians?: string } = {};

  const tagParam = tags.value.join(",");
  if (tagParam) {
    query.tags = tagParam;
  }

  const politicianParam = politicianNames.value.join(",");
  if (politicianParam) {
    query.politicians = politicianParam;
  }

  navigateTo({ query });
});

const searchText = ref<string>("");
const filterTags = computed(() =>
  searchText.value
    ? $allTags.filter((tag) => tag.includes(searchText.value))
    : $allTags
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
