<template>
  <div class="mx-auto h-fit w-full max-w-3xl p-4">
    <ul class="mb-8 flex w-fit gap-2 rounded bg-primary/20 p-2">
      <li v-for="doc in docs" :key="doc.title">
        <NuxtLink :to="doc._path">
          <Button>
            {{ doc.title }}
          </Button>
        </NuxtLink>
      </li>
    </ul>
    <ClientOnly>
      <ContentDoc tag="main">
        <template #not-found>
          <h1>404</h1>
        </template>
      </ContentDoc>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const { data } = await queryDocsNav();
if (!data.value) {
  throw createError({ statusCode: 500, statusMessage: 'No docs found' });
}

const docs = data.value[0].children || [];
</script>
