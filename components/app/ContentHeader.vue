<template>
  <Card>
    <div class="flex items-center gap-4 p-4">
      <NuxtImg
        :src="`/politician/${politician}.webp`"
        :alt="politician"
        width="48"
        height="48"
        :onLoad="() => (loaded = true)"
        class="handle h-12 w-12 flex-none cursor-grab rounded-full bg-primary/20"
        :class="{
          hidden: !loaded,
          block: loaded,
        }"
      />
      <div
        v-if="!loaded"
        class="handle h-12 w-12 flex-none cursor-grab rounded-full bg-primary/20"
      ></div>
      <h1
        class="no-scrollbar overflow-x-auto whitespace-nowrap text-2xl font-bold text-slate-700"
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

const loaded = ref(false);
</script>
