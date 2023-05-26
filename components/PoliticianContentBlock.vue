<template>
  <ContentRenderer :value="content">
    <template #empty>
      <p class="my-1 leading-relaxed text-slate-500">目前沒有資料</p>
    </template>
    <ContentRendererMarkdown v-if="content" :value="content" />
  </ContentRenderer>
  <PoliticianContentFooter />
</template>

<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content/dist/runtime/types";

const { content } = defineProps<{
  content?: ParsedContent;
}>();

console.log(content);
</script>
