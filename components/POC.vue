<template>
  <main class="mx-auto mt-8 max-w-4xl">
    <div class="flex flex-wrap justify-center">
      <Tag
        v-for="tag in tags"
        :key="tag"
        :text="tag"
        :onClick="() => toggleTag(tag)"
        :clicked="isTagClicked(tag)"
      />
    </div>
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
</script>
