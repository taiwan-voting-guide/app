<template>
  <div class="flex h-full flex-col">
    <ContentRenderer :value="content">
      <template #empty>
        <p class="my-1 leading-relaxed text-slate-500">目前沒有資料</p>
      </template>
      <ContentRendererMarkdown v-if="content" :value="content" />
    </ContentRenderer>
    <PoliticianContentBlockFooter v-if="!content" />
  </div>
</template>

<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content/dist/runtime/types";

const { content } = defineProps<{
  content?: ParsedContent;
}>();
</script>
