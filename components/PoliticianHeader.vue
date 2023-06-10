<template>
  <div class="my-2">
    <img
      :src="photoURL"
      :alt="name"
      class="mx-auto h-32 w-32 rounded-full bg-slate-200 object-cover object-top text-slate-200"
    />

    <h1 class="mt-2 text-center text-2xl font-bold text-slate-500">
      {{ name }}
    </h1>
  </div>
</template>

<script setup lang="ts">
const { name, photoURL } = defineProps<{
  photoURL?: string;
  name: string;
}>();
</script>
