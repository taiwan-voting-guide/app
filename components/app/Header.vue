<template>
  <Header>
    <Logo />
    <NuxtLink
      title="功能簡介"
      to="/docs/introduction"
      class="flex flex-none items-center gap-1 rounded-md px-1 text-slate-400 hover:text-slate-600"
    >
      <QuestionMarkCircleIcon class="h-5 w-5 stroke-2" />
      <span class="flex-none">
        <span class="flex-none">功能簡介</span>
      </span>
    </NuxtLink>
    <NuxtLink
      title="數據分析"
      to="/analysis/popular-tags"
      class="flex flex-none items-center gap-1 rounded-md px-1 text-slate-400 hover:text-slate-600"
    >
      <ChartBarIcon class="h-5 w-5 stroke-2" />
      <span class="hidden flex-none xs:inline"> 數據分析 </span>
    </NuxtLink>
    <div class="ml-auto flex">
      <NuxtLink
        title="如何貢獻"
        to="/docs/how-to-contribute"
        class="flex flex-none items-center gap-1 rounded-md px-1 text-slate-400 hover:text-slate-600"
      >
        <QuestionMarkCircleIcon class="h-5 w-5 stroke-2" />
        <span class="hidden flex-none md:inline">
          <span class="flex-none">如何貢獻</span>
        </span>
      </NuxtLink>
      <NuxtLink
        title=""
        to="/contribute"
        class="flex flex-none items-center gap-1 rounded-md px-1 text-slate-400 hover:text-slate-600"
      >
        <DocumentPlusIcon class="h-5 w-5 stroke-2" />
        <span class="hidden flex-none md:inline">
          <span class="flex-none">編輯內容</span>
        </span>
      </NuxtLink>
    </div>
  </Header>
</template>

<script setup lang="ts">
import {
  DocumentPlusIcon,
  QuestionMarkCircleIcon,
  ChartBarIcon,
} from '@heroicons/vue/24/outline';
</script>
