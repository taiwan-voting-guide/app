<template>
  <button
    class="ease rounded px-2 py-1 hover:bg-slate-100"
    :class="{
      'font-bold text-primary': props.activated,
      'text-slate-600': !props.activated,
    }"
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  activated?: boolean;
  onClick?: () => void;
}>();
</script>
