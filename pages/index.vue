<template>
  <Sidebar>
    <header class="sticky top-0 w-full bg-white py-4">
      <input
        placeholder="搜尋"
        type="search"
        class="box-border h-8 w-full rounded border-primary bg-slate-100 pl-4 placeholder:text-slate-400 focus:border-2"
      />
    </header>
    <SidebarItem
      v-for="tag in allTags"
      :onClick="() => toggleTag(tag)"
      :key="tag"
      :activated="isTagActive(tag)"
    >
      {{ tag }}
    </SidebarItem>
  </Sidebar>
  <main class="flex-1 bg-slate-100 p-2">
    <table class="table-fixed">
      <thead>
        <tr>
          <th
            class="w-64"
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
        <tr v-for="tag in getTags()">
          <th v-for="politician in politicians" :key="politician.name">
            {{ politician.contents.get(tag) }}
          </th>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script setup lang="ts">
const names = ["侯友宜", "賴清德", "柯文哲"];

const { getTags, allTags, toggleTag, isTagActive } = useTag();
const { politicians } = usePolitician(names);

useHead({
  title: "選前大補帖",
});
</script>
