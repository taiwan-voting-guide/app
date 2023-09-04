<template>
  <td class="h-px">
    <div class="h-full p-1">
      <Card>
        <h2 class="mb-2 text-primary underline underline-offset-4">
          {{ tag }}
        </h2>
        <ContentRenderer :value="content">
          <ContentRendererMarkdown
            v-if="contentExist"
            :value="content as ParsedContent"
          />
          <template #empty>
            <div class="flex flex-col items-center justify-center">
              <p class="mb-2 flex items-center gap-1">
                <FaceFrownIcon class="inline-block h-4 w-4 text-start" />
                目前沒有資料
              </p>
              <NuxtLink
                class="mb-2"
                :to="`/contribute?politician=${politicianName}&tag=${tag}`"
              >
                <ButtonPrimary>
                  <PencilSquareIcon class="inline-block h-4 w-4 text-start" />
                  貢獻
                  <span class="rounded-md bg-slate-100/20 px-1">{{
                    politicianName
                  }}</span>
                  的
                  <span class="rounded-md bg-slate-100/20 px-1">{{ tag }}</span>
                </ButtonPrimary>
              </NuxtLink>
            </div>
          </template>
        </ContentRenderer>
      </Card>
    </div>
  </td>
</template>

<script setup lang="ts">
import { FaceFrownIcon, PencilSquareIcon } from '@heroicons/vue/24/outline';
import type { ParsedContent } from '@nuxt/content/dist/runtime/types';

const { content, tag } = defineProps<{
  tag: string;
  politicianName: string;
  content?: ParsedContent;
}>();

const contentExist =
  content &&
  Array.isArray(content?.body.children) &&
  content?.body.children.length > 0;
</script>
