<template>
  <aside
    class="sticky left-0 top-0 z-40 h-full flex-none overflow-y-scroll bg-white transition-all"
    :class="{ 'w-0': hidden, 'w-60': !hidden }"
  >
    <slot></slot>
  </aside>
</template>

<script setup lang="ts">
const { hidden } = defineProps<{
  hidden?: boolean;
}>();
</script>
