<template>
  <div class="flex">
    <template v-for="n in arrLen * 2 + 1" :key="n">
      <div v-if="n % 2 === 0" class="w-80" />
      <div v-else-if="n !== 1 && n !== arrLen * 2 + 1" class="w-4" />
    </template>
  </div>
</template>

<script setup lang="ts">
const { arrLen } = defineProps<{
  arrLen: number;
}>();
</script>
