<template>
  <AppHeader />
  <main class="mx-auto flex max-w-[720px] flex-col gap-2 px-2 pb-4 pt-16">
    <AnalysisTabs />
    <template v-if="data">
      <p class="px-2 text-sm font-bold">
        計算方式為當下平台貢獻行數減去空白。
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
          <div class="flex items-center gap-2">
            <NuxtImg
              :src="`/contributor/${contributor.email}.webp`"
              :alt="contributor.email"
              :placeholder="`/placeholder.svg`"
              width="48"
              height="48"
              class="h-12 w-12 rounded-full bg-primary/20"
            />
            <div class="flex flex-col">
              <span>
                {{ contributor.name }}
                <span title="已驗證" class="text-sm text-lime-600">
                  ✓ 已驗證</span
                >
              </span>
              <span>
                {{ contributor.email }}
              </span>
            </div>
          </div>
          <span> 貢獻 {{ count.toLocaleString() }} 行 </span>
        </li>
      </ul>
    </template>
  </main>
</template>

<script setup lang="ts">
const { data } = await getContribution();
</script>
