<template>
  <Html class="scroll-smooth" />
  <div
    v-if="data"
    class="prose prose-slate p-2 prose-h1:scroll-mt-32 prose-h1:text-slate-800 prose-h2:w-fit prose-h2:scroll-mt-32 prose-h2:rounded-md prose-h2:bg-primary/20 prose-h2:px-1 prose-h2:text-slate-800 prose-h3:scroll-mt-32 prose-h3:text-slate-800 prose-h4:text-slate-800 prose-h5:text-slate-800 prose-h6:text-slate-800 prose-p:text-slate-600 prose-a:text-blue-600 prose-strong:text-slate-800 prose-img:rounded-md prose-img:border-2 prose-img:shadow-md"
    v-html="data"
  />
</template>

<script setup lang="ts">
const { data } = defineProps<{
  data: string | null;
}>();
</script>
