<template>
  <Sidebar>
    <header class="sticky top-0 w-full bg-white pb-1 pt-4">
      <input
        v-model="searchText"
        placeholder="搜尋"
        type="search"
        class="box-border h-8 w-full rounded border-primary bg-slate-100 px-2 text-sm placeholder:text-slate-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <div class="text-right">
        <NuxtLink to="/docs/contribute#標籤" class="text-xs text-primary"
          >沒有你需要的標籤嗎?</NuxtLink
        >
      </div>
    </header>
    <template v-if="filterTags && filterTags.length > 0">
      <SidebarItem
        v-for="tag in filterTags"
        :onClick="() => toggleTag(tag)"
        :key="tag"
        :activated="isTagActive(tag)"
      >
        {{ tag }}
      </SidebarItem>
    </template>
    <template v-else>
      <div class="text-slate-500">找不到標籤</div>
    </template>
  </Sidebar>
  <main class="flex flex-1 flex-col overflow-hidden bg-slate-100">
    <div class="flex w-full items-center">
      <MenuButton />
      <PoliticianSearch />
    </div>
    <div class="w-full flex-1 overflow-scroll pb-8 pr-8">
      <table>
        <thead class="sticky top-0 z-20 bg-slate-100">
          <tr>
            <th class="sticky left-0 top-0 min-w-[14rem] bg-slate-100"></th>
            <th
              class="w-80 min-w-[20rem]"
              scope="col"
              v-for="politician in activePoliticians"
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
          <tr v-for="tag in activeTags">
            <TagBlock :tag="tag" />
            <td
              class="h-px"
              v-for="politician in activePoliticians"
              :key="politician.name + tag"
            >
              <PoliticianContentBlock :content="politician.contents.get(tag)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script setup lang="ts">
const { $allTags } = useNuxtApp();
const allTags = $allTags();

const { activeTags, toggleTag, isTagActive } = useActiveTags();
const { activePoliticians } = useActivePoliticians();

const searchParamsTags = computed(() => {
  return activeTags.value.join(",");
});

watch([activeTags], () => {
  // TODO: add validation here and error handling if needed
  const query: { tags?: string; politicians?: string } = {};
  if (searchParamsTags.value) {
    query.tags = searchParamsTags.value;
  }
  navigateTo({ query });
});

const searchText = ref<string>("");
const filterTags = computed(() =>
  searchText.value
    ? allTags.filter((tag) => tag.includes(searchText.value))
    : allTags
);
</script>
