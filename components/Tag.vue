<template>
  <button
    class="my-2 w-full rounded px-4 py-2 hover:bg-slate-100"
    :class="{
      'bg-slate-100 font-bold text-primary': props.clicked,
      'text-gray-500': !props.clicked,
    }"
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
