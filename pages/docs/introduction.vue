<template>
  <AppHeader />
  <main class="mx-auto flex max-w-[720px] flex-col gap-2 px-2 pb-4 pt-16">
    <DocsTabs />
    <div
      class="prose prose-slate p-2 prose-h1:text-slate-600 prose-h2:text-slate-600 prose-a:text-blue-600 prose-h3:text-slate-600 prose-h4:text-slate-600 prose-h5:text-slate-600 prose-h6:text-slate-600 prose-p:text-slate-600"
      v-html="data"
    />
  </main>
</template>

<script setup lang="ts">
const { data } = await useFetch<string>('/api/get-docs?name=introduction');
</script>
