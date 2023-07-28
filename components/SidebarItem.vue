<template>
  <button
    class="ease w-full rounded px-2 py-2 text-left text-sm hover:bg-slate-100"
    :class="{
      'font-medium text-primary': props.activated,
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
