<template>
  <Card>
    <div class="flex items-center gap-4">
      <NuxtImg
        :src="photoURL"
        :alt="name"
        width="48"
        height="48"
        class="h-12 w-12 rounded-full object-cover object-top"
      />
      <h1 class="text-2xl font-extrabold text-slate-700">
        {{ name }}
      </h1>
    </div>
  </Card>
</template>

<script setup lang="ts">
const { name, photoURL } = defineProps<{
  photoURL?: string;
  name: string;
}>();
</script>
