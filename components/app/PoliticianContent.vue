<template>
  <td class="h-px">
    <Card>
      <ContentRenderer :value="data as ParsedContent">
        <ContentRendererMarkdown :value="data as ParsedContent" />
        <template #empty>
          <div class="flex flex-col items-center justify-center">
            <p class="mb-2 flex items-center gap-1">
              <FaceFrownIcon class="inline-block h-4 w-4 text-start" />
              目前沒有資料
            </p>
            <NuxtLink
              class="mb-2"
              :to="`/contribute?politician=${politician}&tag=${tag}`"
            >
              <ButtonPrimary>
                <PencilSquareIcon class="inline-block h-4 w-4 text-start" />
                貢獻
                <span class="rounded-md bg-slate-100/20 px-1">{{
                  politician
                }}</span>
                的
                <span class="rounded-md bg-slate-100/20 px-1">{{ tag }}</span>
              </ButtonPrimary>
            </NuxtLink>
          </div>
        </template>
      </ContentRenderer>
    </Card>
  </td>
</template>

<script setup lang="ts">
import { FaceFrownIcon, PencilSquareIcon } from '@heroicons/vue/24/outline';
import type { ParsedContent } from '@nuxt/content/dist/runtime/types';

const { tag, politician } = defineProps<{
  tag: string;
  politician: string;
}>();

const { data, error } = await useFetch<ParsedContent>(
  `/api/get-content?politician=${politician}&tag=${tag}`
);

if (error.value) {
  throw createError({ statusCode: 500 });
}
</script>
