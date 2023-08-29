<template>
  <button
    class="flex items-center gap-1 rounded-md bg-primary px-3 py-2 text-white drop-shadow hover:bg-primary/80"
    @click="onClickHandler"
    :disabled="disabled"
    :class="{
      'cursor-not-allowed': disabled,
      'bg-primary/80': disabled,
    }"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const { onClick, disabled } = defineProps<{
  onClick?: () => void;
  disabled?: boolean;
}>();

function onClickHandler() {
  if (disabled) {
    return;
  }

  if (onClick) {
    onClick();
  }
}
</script>
