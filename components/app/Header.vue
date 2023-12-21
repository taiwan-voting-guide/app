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
        <span class="flex-none">網站簡介</span>
      </span>
    </NuxtLink>
    <NuxtLink
      title="如何貢獻"
      to="/docs/how-to-contribute"
      class="flex flex-none items-center gap-1 rounded-md px-1 text-slate-400 hover:text-slate-600"
    >
      <PencilSquareIcon class="h-5 w-5 stroke-2" />
      <span class="flex-none">
        <span class="flex-none">成為編者</span>
      </span>
    </NuxtLink>
    <NuxtLink
      title="數據分析"
      to="/analysis/popular-tags"
      class="flex flex-none items-center gap-1 rounded-md px-1 text-slate-400 hover:text-slate-600"
    >
      <ChartBarIcon class="h-5 w-5 stroke-2" />
      <span class="hidden flex-none sm:inline"> 數據分析 </span>
    </NuxtLink>
    <NuxtLink
      title=""
      to="/contribute"
      class="ml-auto flex flex-none items-center gap-1 rounded-md px-1 pr-4 text-slate-400 hover:text-slate-600"
    >
      <DocumentPlusIcon class="h-5 w-5 stroke-2" />
      <span class="hidden flex-none md:inline">
        <span class="flex-none">編輯</span>
      </span>
    </NuxtLink>
  </Header>
</template>

<script setup lang="ts">
import {
  PencilSquareIcon,
  DocumentPlusIcon,
  QuestionMarkCircleIcon,
  ChartBarIcon,
} from '@heroicons/vue/24/outline';
</script>
