<template>
  <Header />
  <div
    v-for="politician in politicians"
    :key="politician.name + politician.birthdate"
  >
    <h1>{{ politician.name }}</h1>
  </div>
</template>

<script setup lang="ts">
const politicians = await useSearchPoliticians();
</script>
