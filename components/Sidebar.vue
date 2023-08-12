<template>
  <aside
    class="sticky left-0 top-0 z-40 h-full flex-none overflow-y-scroll bg-white transition-all"
    :class="{ 'w-0 p-0': !show, 'w-60 px-4': show }"
  >
    <slot></slot>
  </aside>
</template>

<script setup lang="ts">
const { show } = defineProps<{
  show?: boolean;
}>();
</script>
