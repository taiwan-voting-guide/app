<template>
  <button
    class="ease m-1 rounded px-2 py-1 text-left text-sm hover:bg-slate-100"
    :class="{
      'font-bold text-primary': props.activated,
      'text-slate-500': !props.activated,
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
