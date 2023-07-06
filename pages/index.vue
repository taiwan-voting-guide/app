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
  <main class="h-fit min-h-full flex-1 bg-slate-100">
    <PoliticianSearch />
    <table>
      <colgroup>
        <col class="w-48" />
        <col :span="politicians.length" class="w-80" />
      </colgroup>
      <thead class="sticky top-12 z-10 bg-slate-100">
        <tr>
          <th></th>
          <th
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
          <th scope="row" class="text-slate-500">{{ tag }}</th>
          <td
            class="h-px"
            v-for="politician in politicians"
            :key="politician.name"
          >
            <PoliticianContentBlock :content="politician.contents.get(tag)" />
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script setup lang="ts">
const { $allTags } = useNuxtApp();
const allTags = $allTags();

const { tags, toggleTag, isTagActive } = await useTag();
const { politicians } = await usePolitician();

const searchText = ref<string>("");
const filterTags = computed(() => {
  return searchText.value
    ? allTags.filter((tag) => tag.includes(searchText.value))
    : allTags;
});
</script>
