<template>
  <div
    class="m-2 flex flex-1 flex-col items-center rounded-lg bg-slate-50 px-4 py-4"
  >
    <img
      :src="data.imageURL"
      class="h-32 w-32 rounded-full border-2 border-primary object-scale-down object-center"
      :alt="name"
    />
    <h1 class="mt-4 text-center text-2xl font-bold">{{ name }}</h1>
    <section
      class="mt-4 w-full rounded-lg bg-blue-100 p-2"
      v-for="tag in getTags()"
      :key="tag"
    >
      <h2 class="mb-1 font-bold text-primary">{{ tag }}</h2>
      <ContentRenderer>
        <ContentRendererMarkdown
          v-if="contents.get(tag)"
          :value="contents.get(tag) || {}"
        />
      </ContentRenderer>
      <div v-if="!contents.has(tag)">目前沒有資料</div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content/dist/runtime/types";

const { name } = defineProps<{
  name: string;
}>();

const { getTags } = useTag();

const data = await queryContent<ParsedContent>()
  .where({ title: name })
  .findOne();

const contents: Ref<Map<string, ParsedContent>> = ref(createContent(data));
</script>
