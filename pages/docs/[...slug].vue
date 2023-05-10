<template>
  <Sidebar>
    <nav class="py-2">
      <ul>
        <li v-for="doc in docs" :key="doc.slug">
          <NuxtLink :to="doc._path">
            <SidebarItem>
              {{ doc.title }}
            </SidebarItem>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </Sidebar>
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
// current page url
</script>
