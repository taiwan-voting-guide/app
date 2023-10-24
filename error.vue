<template>
  <div class="flex h-screen flex-col items-center justify-center gap-2 p-3">
    <h1 class="text-center font-bold">{{ error?.message }}</h1>
    <NuxtLink to="/">
      <ButtonInvisible>回首頁</ButtonInvisible>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps({
  error: Object,
});
</script>
