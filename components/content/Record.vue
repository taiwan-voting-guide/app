<template>
  <div :title="type" class="rounded-md px-2" :class="bgColorObj">
    <slot />
  </div>
  <details class="mt-auto text-xs text-slate-500">
    <summary class="mb-1 ml-4 cursor-pointer list-outside">資料來源</summary>
    <div class="ml-4">
      <slot name="source" />
    </div>
  </details>
</template>

<script setup lang="ts">
const { type } = defineProps<{
  type: string;
}>();

const bgColorObj = {
  'bg-yellow-50': type === 'contributed',
  'bg-blue-50': type === 'self',
  'bg-green-50': type === 'verified',
};
</script>
