<template>
  <button
    :type="submit ? 'submit' : 'button'"
    class="flex h-10 items-center justify-center gap-1 rounded-md bg-primary/30 px-3 py-2 font-bold hover:bg-primary/40"
    @click="onClick"
    :disabled="disabled"
    :class="{
      '': disabled,
      'cursor-not-allowed bg-primary/10 text-slate-400 hover:bg-primary/20':
        disabled,
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
