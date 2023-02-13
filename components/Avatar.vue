<template>
  <img
    @click="handleClick"
    :src="src"
    class="h-10 w-10 cursor-pointer rounded-full border-2 border-primary shadow-lg"
  />
</template>

<script setup lang="ts">
const { src, handleClick } = defineProps<{
  src: string;
  handleClick: () => void;
}>();
</script>
