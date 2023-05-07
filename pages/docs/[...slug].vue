<template>
  <div class="flex">
    <nav class="h-full w-24 bg-blue-100">
      <ContentNavigation v-slot="{ navigation }" :query="docsQuery">
        <TreeNav :navigation="navigation.children" />
      </ContentNavigation>
    </nav>
    <main>
      <ContentDoc>
        <template #not-found>
          <h1>404</h1>
        </template>
      </ContentDoc>
    </main>
  </div>
</template>

<script setup lang="ts">
const docsQuery = queryContent("docs");
console.log(docsQuery);
</script>
