<template>
  <div class="flex h-full flex-col">
    <ContentRenderer class="flex" :value="content">
      <template #empty>
        <p class="my-1 leading-relaxed text-slate-500">目前沒有資料</p>
      </template>
      <ContentRendererMarkdown
        class="flex h-full flex-col"
        v-if="contentExist"
        :value="content as ParsedContent"
      />
    </ContentRenderer>
    <PoliticianContentBlockFooter v-if="!contentExist" />
  </div>
</template>

<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content/dist/runtime/types";

const { content } = defineProps<{
  content?: ParsedContent;
}>();

const contentExist =
  content &&
  Array.isArray(content?.body.children) &&
  content?.body.children.length > 0;
</script>
