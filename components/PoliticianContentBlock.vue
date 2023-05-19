<template>
  <ContentRenderer :value="content" tag="div" class="p-4">
    <template #empty>
      <h1>404</h1>
    </template>
    <ContentRendererMarkdown v-if="content" :value="content" />
  </ContentRenderer>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import type { ParsedContent } from "@nuxt/content/dist/runtime/types";

const { content } = defineProps<{
  content?: ParsedContent;
}>();

console.log(content);
</script>
