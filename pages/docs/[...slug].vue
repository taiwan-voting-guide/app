<template>
  <nav class="sticky top-0 h-full w-60 shrink-0 overflow-y-scroll px-8">
    <ul class="flex flex-col space-y-4">
      <li v-for="doc in docs" :key="doc.slug">
        <nuxt-link
          :to="`${doc._path}`"
          class="text-blue-500 hover:text-blue-600"
        >
          {{ doc.title }}
        </nuxt-link>
      </li>
    </ul>
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
const docs = await queryContent("docs").sort({ order: 1 }).find();
</script>
