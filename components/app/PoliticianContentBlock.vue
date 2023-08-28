<template>
  <td class="h-px">
    <div class="h-full p-1">
      <div class="h-full rounded bg-white p-2 shadow">
        <ContentRenderer class="flex" :value="content">
          <ContentRendererMarkdown
            v-if="contentExist"
            :value="content as ParsedContent"
          />
          <template #empty>
            <div class="flex h-full flex-col items-center justify-center">
              <p class="leading-relaxed">目前沒有資料</p>
              <NuxtLink class="text-primary" to="/docs/contribute">
                點這裡貢獻
              </NuxtLink>
            </div>
          </template>
        </ContentRenderer>
      </div>
    </div>
  </td>
</template>

<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types';

const { content } = defineProps<{
  content?: ParsedContent;
}>();

const contentExist =
  content &&
  Array.isArray(content?.body.children) &&
  content?.body.children.length > 0;
</script>
