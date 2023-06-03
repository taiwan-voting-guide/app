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
          >標籤有問題嗎?</NuxtLink
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
  <main class="flex-1 bg-slate-100 p-2">
    <PoliticianSearch />
    <table class="border-separate border-spacing-2">
      <colgroup>
        <col class="w-48" />
        <col :span="politicians.length" class="w-80" />
      </colgroup>
      <thead>
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
        <tr v-for="tag in activeTags">
          <th scope="row" class="text-slate-500">{{ tag }}</th>
          <td
            class="rounded bg-white p-2 align-top drop-shadow-lg"
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
const names = useNames();

const { activeTags, allTags, toggleTag, isTagActive } = await useTag();
const { politicians } = await usePolitician(names);

const searchText = ref<string>("");

const filterTags = computed(() => {
  return searchText.value
    ? allTags.value.filter((tag) => {
        return tag.includes(searchText.value);
      })
    : allTags.value;
});

useHead({
  title: "選前大補帖",
});
</script>
