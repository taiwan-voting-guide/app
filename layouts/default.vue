<template>
  <div class="flex h-screen w-screen flex-col text-slate-600">
    <Header />
    <div class="relative flex flex-1 overflow-scroll">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
// TODO: rethink layout
</script>
