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
    <div class="flex flex-nowrap justify-around">
      <Politician v-for="name in candidates" :key="name" :name="name" />
    </div>
  </main>
</template>

<script setup lang="ts">
const tagsContent = await queryContent().where({ title: "標籤" }).findOne();
const tags = tagsContent.body.children[0].children.map(
  (tag: any) => tag.children[0].value
);

const candidates = ["侯友宜", "賴清德", "柯文哲"];
const { toggleTag, isTagClicked } = useTag();

useHead({
  title: "選前大補帖",
});
</script>
