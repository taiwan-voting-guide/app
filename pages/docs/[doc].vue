<template>
  <Sidebar>
    <nav class="py-2">
      <ul>
        <li v-for="doc in docs" :key="doc.title">
          <NuxtLink :to="doc._path">
            <SidebarItem>
              {{ doc.title }}
            </SidebarItem>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </Sidebar>
  <ContentDoc tag="main" class="h-fit max-w-3xl p-4">
    <template #not-found>
      <h1>404</h1>
    </template>
  </ContentDoc>
</template>

<script setup lang="ts">
const { data: docs } = await queryDocsContent();
</script>
