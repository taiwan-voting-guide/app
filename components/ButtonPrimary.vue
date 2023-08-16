<template>
  <button
    class="flex rounded bg-primary px-3 py-2 text-white drop-shadow drop-shadow hover:bg-primary/80"
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
