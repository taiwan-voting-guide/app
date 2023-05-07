<template>
  <div class="sticky top-0 h-full w-60 shrink-0 overflow-y-scroll px-8">
    <div class="sticky top-0 w-full bg-white py-4">
      <input
        placeholder="搜尋"
        type="search"
        class="box-border h-8 w-full rounded border-primary bg-slate-100 pl-4 placeholder:text-slate-400 focus:border-2"
      />
    </div>
    <Tag
      v-for="tag in tags"
      :key="tag"
      :text="tag"
      :onClick="() => toggleTag(tag)"
      :clicked="isTagClicked(tag)"
    />
  </div>
  <main class="shrink-0 grow px-1">
    <div class="mt-8 flex flex-nowrap justify-around">
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
