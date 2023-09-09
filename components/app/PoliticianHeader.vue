<template>
  <Card>
    <NuxtImg
      :src="photoURL"
      width="48"
      height="48"
      :alt="name"
      class="mx-auto h-32 w-32 rounded-full object-cover object-top"
    />

    <h1 class="mt-2 text-center text-2xl font-bold">
      {{ name }}
    </h1>
  </Card>
</template>

<script setup lang="ts">
const { name, photoURL } = defineProps<{
  photoURL?: string;
  name: string;
}>();
</script>
