<template>
  <button
    class="m-2 rounded border border-primary px-4 py-2 text-primary"
    :class="{ 'bg-blue-100 font-bold': props.clicked }"
    @click="onClick"
  >
    {{ props.text }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  clicked: boolean;
  text: string;
  onClick: () => void;
}>();
</script>
