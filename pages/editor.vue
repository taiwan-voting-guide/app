<template>
  <div class="h-screen w-screen">
    <MonacoEditor class="h-full" v-model="value" lang="markdown" />
  </div>
</template>

<script setup lang="ts">
// const tagsContent = await queryContent().where({ title: "標籤" }).findOne();
const value = ref('asdf');
</script>
