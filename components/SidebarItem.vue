<template>
  <button
    class="ease w-full rounded px-4 py-2 text-left hover:bg-slate-100"
    :class="{
      'text-primary': props.activated,
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
