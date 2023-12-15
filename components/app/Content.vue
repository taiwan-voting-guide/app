<template>
  <Card>
    <div class="w-rull flex h-full flex-col gap-4 p-4">
      <h2
        :id="`${politician}-${tag}`"
        class="anchor sticky top-36 z-10 flex w-fit rounded-md bg-primary/20 px-2 py-1 text-xl font-bold backdrop-blur"
      >
        {{ tag }}
      </h2>

      <div
        class="prose-h4:text-md prose prose-slate prose-h2:text-base prose-h3:text-lg prose-a:text-blue-600"
        :class="{
          'hide-source': !showSource,
          'hide-author': !showAuthor,
        }"
        v-if="data"
        v-html="data"
      ></div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline';

const { tag, politician } = defineProps<{
  tag: string;
  politician: string;
  showSource: boolean;
  showAuthor: boolean;
  onRemoveTag: (tag: string) => void;
}>();

const { data } = await useFetch('/api/get-content-html?politician', {
  params: { politician: politician, tag: tag },
});
</script>
