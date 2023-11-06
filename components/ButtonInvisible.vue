<template>
  <button
    :type="submit ? 'submit' : 'button'"
    class="flex h-10 items-center justify-center gap-1 rounded-md px-3 py-2 hover:bg-primary/20"
    @click="onClick"
    :disabled="disabled"
    :class="{
      'cursor-not-allowed': disabled,
      'text-slate-400': disabled,
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
