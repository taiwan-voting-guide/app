<template>
  <button
    class="my-1 w-full rounded px-2 py-1 text-left hover:bg-slate-100"
    :class="{
      'font-bold text-primary': props.activated,
      'text-gray-500': !props.activated,
    }"
    :onClick="onClick"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  activated: boolean;
  onClick: () => void;
}>();
</script>
