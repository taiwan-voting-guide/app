<template>
  <img
    :src="photoURL"
    class="mx-auto h-32 w-32 rounded-full object-cover object-top"
    :alt="name"
  />
  <h1 class="mt-2 text-center text-2xl font-bold">{{ name }}</h1>
</template>

<script setup lang="ts">
const { name, photoURL } = defineProps<{
  photoURL?: string;
  name: string;
}>();
</script>
