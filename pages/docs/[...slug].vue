<template>
  <nav>
    <ContentNavigation v-slot="{ navigation }" :query="docsQuery">
      <TreeNav :navigation="navigation" />
    </ContentNavigation>
  </nav>
  <main>
    <ContentDoc>
      <template #not-found>
        <h1>404</h1>
      </template>
    </ContentDoc>
  </main>
</template>

<script setup lang="ts">
const docsQuery = queryContent("docs");
</script>
