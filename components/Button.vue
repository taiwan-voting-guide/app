<template>
  <button
    class="ease flex min-w-max items-center gap-1 rounded px-2 py-1 text-slate-600 hover:bg-slate-100"
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const { onClick } = defineProps<{
  onClick?: () => void;
}>();
</script>
