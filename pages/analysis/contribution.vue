<template>
  <AppHeader />
  <main class="mx-auto flex max-w-[720px] flex-col gap-2 px-2 pb-4 pt-16">
    <AnalysisTabs />
    <template v-if="data">
      <p class="px-2 text-sm font-bold">
        計算方式為7天內各項標籤點擊次數。 於
        <ClientOnly>
          {{ new Date(data.timestamp).toLocaleString() }}
          更新。
        </ClientOnly>
      </p>
      <ul class="flex w-full flex-col gap-1 pt-2">
        <li
          v-for="{ contributor, count } in data.lineCounts"
          :key="contributor.email"
          class="flex items-center justify-between rounded-md bg-primary/10 px-3 py-4 font-bold"
        >
          <span class="flex items-center gap-2">
            <NuxtImg
              :src="`/contributor/${contributor.email}.webp`"
              :alt="contributor.email"
              width="48"
              height="48"
              class="h-12 w-12 rounded-full bg-primary/20"
            />
            {{ contributor.name }}
          </span>
          <span> 搜尋 {{ count.toLocaleString() }} 次 </span>
        </li>
      </ul>
    </template>
  </main>
</template>

<script setup lang="ts">
const { data } = await getContribution();
</script>
