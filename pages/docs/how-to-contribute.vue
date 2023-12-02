<template>
  <AppHeader />
  <main class="mx-auto flex max-w-screen-sm flex-col gap-2 px-2 pb-2 pt-16">
    <DocsTabs />
    <Prose :data="data" />
  </main>
</template>

<script setup lang="ts">
const { data } = await useFetch<string>('/api/get-docs?name=how-to-contribute');
</script>
