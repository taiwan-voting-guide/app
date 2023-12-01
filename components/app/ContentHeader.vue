<template>
  <Card>
    <div class="flex items-center gap-4 p-4">
      <NuxtImg
        :src="`/politician/${politician}.webp`"
        :alt="politician"
        width="48"
        height="48"
        class="h-12 w-12 flex-none rounded-full bg-primary/20"
      />
      <h1
        class="overflow-x-auto whitespace-nowrap text-2xl font-bold text-slate-700"
      >
        {{ politician }}
      </h1>
      <slot></slot>
    </div>
  </Card>
</template>

<script setup lang="ts">
const { politician } = defineProps<{
  politician: string;
}>();
</script>
