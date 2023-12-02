<template>
  <Header>
    <Logo />
    <NuxtLink
      title="簡介"
      to="/docs/introduction"
      class="flex flex-none items-center gap-1 rounded-md px-2 text-slate-400 hover:text-slate-600"
    >
      <QuestionMarkCircleIcon class="h-5 w-5 stroke-2" />
      <span class="hidden flex-none sm:inline">
        <span class="flex-none">簡介</span>
      </span>
    </NuxtLink>
    <NuxtLink
      title="如何使用"
      to="/docs/how-to-use"
      class="flex flex-none items-center gap-1 rounded-md px-2 text-slate-400 hover:text-slate-600"
    >
      <WrenchIcon class="h-5 w-5 stroke-2" />
      <span class="hidden flex-none sm:inline"> 如何使用 </span>
    </NuxtLink>
    <NuxtLink
      title="數據分析"
      to="/analysis/popular-tags"
      class="flex flex-none items-center gap-1 rounded-md px-2 text-slate-400 hover:text-slate-600"
    >
      <ChartBarIcon class="h-5 w-5 stroke-2" />
      <span class="hidden flex-none sm:inline"> 數據分析 </span>
    </NuxtLink>
    <div class="ml-auto flex">
      <NuxtLink
        title="如何貢獻"
        to="/docs/how-to-contribute"
        class="flex flex-none items-center gap-1 rounded-md px-2 text-slate-400 hover:text-slate-600"
      >
        <PencilSquareIcon class="h-5 w-5 stroke-2" />
        <span class="hidden flex-none md:inline">
          <span class="flex-none">如何貢獻</span>
        </span>
      </NuxtLink>
      <NuxtLink
        title=""
        to="/contribute"
        class="flex flex-none items-center gap-1 rounded-md px-2 text-slate-400 hover:text-slate-600"
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
  WrenchIcon,
  DocumentPlusIcon,
  QuestionMarkCircleIcon,
  PencilSquareIcon,
  ChartBarIcon,
} from '@heroicons/vue/24/outline';
</script>
