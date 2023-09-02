<template>
  <MonacoEditor
    :options="option"
    class="w-full h-screen bg-slate-100"
    v-model="value"
    lang="markdown"
  />
</template>

<script setup lang="ts">
const value = ref('abc');
const option = {
  theme: 'vs-dark',
};
</script>
