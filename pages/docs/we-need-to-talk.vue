<template>
  <AppHeader />
  <main class="mx-auto flex max-w-[720px] flex-col gap-2 px-4 pb-4 pt-16">
    <DocsTabs />
    <div
      class="prose prose-slate p-2 prose-h1:text-slate-800 prose-h2:w-fit prose-h2:rounded-md prose-h2:bg-primary/20 prose-h2:px-1 prose-h2:text-slate-800 prose-h3:text-slate-800 prose-h4:text-slate-800 prose-h5:text-slate-800 prose-h6:text-slate-800 prose-p:text-slate-600 prose-a:text-blue-600 prose-strong:text-slate-600"
      v-html="data"
    />
  </main>
</template>

<script setup lang="ts">
const { data } = await useFetch<string>('/api/get-docs?name=we-need-to-talk');
</script>
