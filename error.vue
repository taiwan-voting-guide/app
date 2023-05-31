<template>
  <div class="flex h-screen flex-col items-center justify-center">
    <h1 class="text-xl text-slate-700">{{ error?.message }}</h1>
  </div>
</template>

<script setup lang="ts">
defineProps({
  error: Object,
});
</script>
