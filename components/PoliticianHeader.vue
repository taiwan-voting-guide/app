<template>
  <img
    :src="photoURL"
    :alt="photoURL && name"
    class="mx-auto h-32 w-32 rounded-full bg-slate-200 object-cover object-top"
  />

  <h1 class="mt-2 text-center text-2xl font-bold">{{ name }}</h1>
</template>

<script setup lang="ts">
const { name, photoURL } = defineProps<{
  photoURL?: string;
  name: string;
}>();
</script>
