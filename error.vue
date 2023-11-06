<template>
  <div class="flex h-screen flex-col items-center justify-center gap-2 p-3">
    <h1 class="text-center font-bold">{{ error?.message }}</h1>
    <NuxtLink to="/">
      <NuxtLink
        class="flex min-w-max items-center gap-1 rounded-md px-3 py-2 font-bold"
        to="/"
      >
        回首頁
      </NuxtLink>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps({
  error: Object,
});
</script>
