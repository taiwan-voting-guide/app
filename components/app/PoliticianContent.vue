<template>
  <td class="h-px max-w-[20rem] break-words">
    <Card>
      <div v-if="content.exist" v-html="content.body"></div>
      <div v-else class="flex flex-col items-center justify-center">
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
    </Card>
  </td>
</template>

<script setup lang="ts">
import { FaceFrownIcon, PencilSquareIcon } from '@heroicons/vue/24/outline';

const { tag, politician } = defineProps<{
  tag: string;
  politician: string;
}>();

const data = await $fetch('/api/get-content?politician', {
  params: { politician: politician, tag: tag },
});

const content = data
  ? {
      exist: true,
      body: data,
    }
  : {
      exist: false,
      body: {
        type: 'root',
        children: [],
      },
    };
</script>
