<template>
  <div
    class="m-2 flex flex-1 flex-col items-center rounded-md bg-[#F9F9F9] px-2 py-2"
  >
    <img
      :src="data.imageURL"
      class="h-32 w-32 rounded-full object-scale-down object-center"
      :alt="name"
    />
    <h1 class="mt-4 text-center text-2xl font-bold">{{ name }}</h1>
	<NuxtLink to="data.contribute" class="text-sm text-primary underline">貢獻資料</NuxtLink>
    <section class="mt-6 w-full" v-for="tag in getTags()" :key="tag">
      <div class="flex items-center">
        <span class="mr-2 h-[24px] w-2 rounded-full bg-primary"></span>
        <h2 class="text-xl font-bold">{{ tag }}</h2>
      </div>
      <div class="mt-2 rounded-md bg-white p-2 shadow">
        <ContentRenderer>
          <ContentRendererMarkdown
            v-if="contents.get(tag)"
            :value="contents.get(tag) || {}"
          />
        </ContentRenderer>
        <div v-if="!contents.has(tag)">目前沒有資料</div>
      </div>
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
