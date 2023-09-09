<template>
  <NuxtLink
    v-if="to"
    class="ease flex min-w-max items-center gap-1 rounded-md px-2 py-1 text-slate-600 hover:bg-slate-100"
    :to="to"
  >
    <slot></slot>
  </NuxtLink>
  <button
    v-else
    class="ease flex min-w-max items-center gap-1 rounded-md px-2 py-1 text-slate-600 hover:bg-slate-100"
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const { onClick, to } = defineProps<{
  to?: string;
  onClick?: () => void;
}>();
</script>
