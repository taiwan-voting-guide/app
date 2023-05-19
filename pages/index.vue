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
        <tr v-for="tag in getTags()">
          <th scope="row" class="text-slate-500">{{ tag }}</th>
          <th
            class="p-2"
            v-for="politician in politicians"
            :key="politician.name"
          >
            {{ politician.contents.get(tag) }}
            321 123
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
