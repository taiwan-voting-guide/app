<template>
  <div class="flex h-screen flex-col items-center justify-center gap-2 p-2">
    <h1 class="text-center font-bold text-slate-600">{{ error?.message }}</h1>
    <NuxtLink to="/">
      <ButtonInvisible>回首頁</ButtonInvisible>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
// TODO: fix styles
defineProps({
  error: Object,
});
</script>
