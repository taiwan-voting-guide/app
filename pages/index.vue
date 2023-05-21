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
        <tr v-for="tag in getTags()">
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
const names = ["假人_A", "假人_B", "假人_C"];

const { getTags, allTags, toggleTag, isTagActive } = useTag();
const { politicians } = usePolitician(names);

useHead({
  title: "選前大補帖",
});
</script>
