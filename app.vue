<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const ogImageOptions = {
  component: 'Og',
  title: '選前大補帖',
  description: '快速檢索候選人的各項事實',
};
defineOgImage(ogImageOptions);
</script>
