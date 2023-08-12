<template>
  <div
    @click="onClick"
    class="m-2 cursor-pointer rounded px-1 hover:bg-slate-200"
  >
    <Bars3Icon class="h-8 w-8 text-slate-500" />
  </div>
</template>

<script setup lang="ts">
import { Bars3Icon } from "@heroicons/vue/24/solid";

const { onClick } = defineProps<{
  onClick: () => void;
}>();
</script>
