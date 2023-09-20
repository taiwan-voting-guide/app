<template>
  <nav class="py-2">
    <ul>
      <li v-for="datum in data" :key="datum.title">
        <NuxtLink :to="datum._path">
          <div :activated="url.pathname === datum._path">
            {{ datum.name }}
          </div>
        </NuxtLink>
      </li>
    </ul>
  </nav>
  <main class="flex-1 bg-slate-100 p-2">
    <section v-if="chartData" class="max-w-3xl">
      <Bar :data="chartData" :options="chartOptions"> </Bar>
    </section>
    <h1 class="text-slate-500" v-else>目前沒有資料</h1>
  </main>
</template>

<script lang="ts" setup>
import type { ParsedContent } from '@nuxt/content/dist/runtime/types';
import { ChartOptions } from 'chart.js';
import { Bar } from 'vue-chartjs';

const url = useRequestURL();

const { data, error } = await queryDataContent();
if (error.value) {
  throw createError({ statusCode: 500, statusMessage: error.value.message });
}

const route = useRoute();
const currentData = data.value?.find(
  (datum: ParsedContent) => datum.title === route.params.type
);

const toChartData = (data: ParsedContent) => {
  switch (route.params.type) {
    case 'tag_clicks_last_7_days':
      return {
        labels: data.data.tags.map((t: { key: string }) => t.key),
        datasets: [
          {
            label: data.name,
            data: data.data.tags.map((t: { value: number }) => t.value),
          },
        ],
      };
  }
};

const chartData = currentData && toChartData(currentData);
const chartOptions: ChartOptions = {
  indexAxis: 'y',
};
</script>
