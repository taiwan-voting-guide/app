<template>
  <div class="flex h-screen flex-col items-center justify-center">
    <h1 class="text-slate-700">{{ error?.message }}</h1>
    <NuxtLink to="/">
      <Button>回首頁</Button>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps({
  error: Object,
});
</script>
