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
      v-for="tag in tags"
      :onClick="() => toggleTag(tag)"
      :key="tag"
      :activated="isTagClicked(tag)"
    >
      {{ tag }}
    </SidebarItem>
  </Sidebar>
  <main class="flex-1 p-2">
    <table class="table-fixed">
      <thead>
        <tr>
          <th class="w-64" v-for="politician in politicians" :key="politician">
            <PoliticianHeader
              v-if="politicianContents.has(politician)"
              :photoURL="politicianContents.get(politician)?.photoURL"
              :name="politician"
            />
          </th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  </main>
</template>

<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content/dist/runtime/types";

const tagsContent = await queryContent("tag").findOne();
const tags = tagsContent.body.children[1].children.map(
  (tag: any) => tag.children[0].value
);

const politicians = ["侯友宜", "賴清德", "柯文哲"];

const { toggleTag, isTagClicked } = useTag();

const data = await queryContent<ParsedContent>()
  .where({ title: { $in: politicians } })
  .find();

const politicianContents: Ref<Map<string, ParsedContent>> = ref(new Map());

data.forEach((politicianContent) => {
  if (politicianContent.title === undefined) {
    return;
  }
  politicianContents.value.set(politicianContent.title, politicianContent);
});

useHead({
  title: "選前大補帖",
});
</script>
