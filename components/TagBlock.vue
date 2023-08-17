<template>
  <th scope="row" class="min-h-20 sticky left-0 z-10 h-24 bg-slate-50 p-2">
    <div
      class="group flex h-full w-full cursor-grab select-none items-center justify-center rounded hover:bg-slate-100 hover:shadow"
    >
      <span class="relative">
        {{ tag }}
        <span
          @click="() => toggle(tag)"
          class="absolute top-0 ml-1 cursor-pointer rounded px-1 opacity-0 hover:bg-primary/20 group-hover:opacity-100"
        >
          🗑️
        </span>
      </span>
    </div>
  </th>
</template>

<script setup lang="ts">
const { tag } = defineProps<{
  tag: string;
}>();

const { toggle } = useSelectTag();
</script>
