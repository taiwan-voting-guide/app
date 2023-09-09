<template>
  <NuxtLink
    v-if="to"
    :to="to"
    class="flex justify-center items-center gap-1 rounded-md bg-primary px-3 py-2 text-white drop-shadow hover:bg-primary/80"
  >
    <slot></slot>
  </NuxtLink>
  <button
    v-else
    :type="submit ? 'submit' : 'button'"
    class="flex justify-center items-center gap-1 rounded-md bg-primary px-3 py-2 text-white drop-shadow hover:bg-primary/80"
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
  to?: string;
  onClick?: () => void;
  disabled?: boolean;
  submit?: boolean;
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
