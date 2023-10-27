<template>
  <button
    :type="submit ? 'submit' : 'button'"
    class="box-content flex h-4 items-center justify-center gap-1 rounded-md bg-primary px-3 py-2 text-sm text-white drop-shadow hover:bg-primary/80"
    @click="onClick"
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
const { submit, onClick, disabled } = defineProps<{
  onClick?: () => void;
  disabled?: boolean;
  submit?: boolean;
}>();
</script>
