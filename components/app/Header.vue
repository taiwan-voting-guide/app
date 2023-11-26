<template>
  <Header>
    <Logo />
    <NuxtLink
      title="如何使用"
      to="/docs/introduction"
      class="flex flex-none items-center gap-1 rounded-md px-2 text-slate-400 hover:text-slate-600"
    >
      <QuestionMarkCircleIcon class="h-5 w-5 stroke-2" />
      <span class="hidden flex-none sm:inline"> 如何使用 </span>
    </NuxtLink>
    <NuxtLink
      title="參與貢獻"
      to="/contribute"
      class="flex flex-none items-center gap-1 rounded-md px-2 text-slate-400 hover:text-slate-600"
    >
      <PencilSquareIcon class="h-5 w-5 stroke-2" />
      <span class="hidden flex-none sm:inline">
        <span class="flex-none">參與貢獻</span>
      </span>
    </NuxtLink>
    <NuxtLink
      title="數據分析"
      to="/analysis"
      class="flex flex-none items-center gap-1 rounded-md px-2 text-slate-400 hover:text-slate-600"
    >
      <ChartBarIcon class="h-5 w-5 stroke-2" />
      <span class="hidden flex-none sm:inline"> 數據分析 </span>
    </NuxtLink>
    <div class="ml-auto mr-3 h-6 lg:hidden">
      <HeadlessMenu v-slot="{ close }">
        <HeadlessMenuButton>
          <Bars3Icon class="h-6 w-6 stroke-2 text-slate-400" />
        </HeadlessMenuButton>
        <HeadlessMenuItems
          @click="close"
          class="absolute right-0 mr-2 w-max rounded-md bg-white p-2 shadow"
        >
          <HeadlessMenuItem>
            <NuxtLink
              class="flex items-center gap-1 px-3 py-2"
              to="https://github.com/taiwan-voting-guide/app"
            >
              <img
                class="inline h-5 w-5 stroke-2"
                src="/github-mark.svg"
              />GitHub
            </NuxtLink>
          </HeadlessMenuItem>
          <HeadlessMenuItem>
            <NuxtLink
              class="flex items-center gap-1 px-3 py-2"
              to="https://join.slack.com/t/taiwanvotingguide/shared_invite/zt-1stmgptpf-~D6X8ETZyaNR7uUHrIk~sA"
            >
              <img class="inline h-5 w-5 stroke-2" src="/slack.webp" />Slack
            </NuxtLink>
          </HeadlessMenuItem>
          <HeadlessMenuItem>
            <NuxtLink
              class="flex items-center gap-1 px-3 py-2"
              to="https://forms.gle/nAxdNjAqpAb3GEMz8"
            >
              <ChatBubbleLeftEllipsisIcon class="h-5 w-5 stroke-2" />
              意見回饋</NuxtLink
            >
          </HeadlessMenuItem>
        </HeadlessMenuItems>
      </HeadlessMenu>
    </div>

    <div class="ml-auto hidden lg:flex">
      <NuxtLink
        class="flex-none items-center gap-1 rounded-md px-2 text-slate-400 hover:text-slate-600 lg:flex"
        to="https://github.com/taiwan-voting-guide/app"
        ><div class="flex items-center gap-1">
          <img class="h-5 w-5 stroke-2" src="/github-mark.svg" />GitHub
        </div></NuxtLink
      >
      <NuxtLink
        class="flex-none items-center gap-1 rounded-md px-2 text-slate-400 hover:text-slate-600 lg:flex"
        to="https://join.slack.com/t/taiwanvotingguide/shared_invite/zt-1stmgptpf-~D6X8ETZyaNR7uUHrIk~sA"
        ><div class="flex items-center gap-1">
          <img class="h-5 w-5 stroke-2" src="/slack.webp" />Slack
        </div></NuxtLink
      >
      <NuxtLink
        class="flex-none items-center gap-1 rounded-md px-2 text-slate-400 hover:text-slate-600 lg:flex"
        to="https://forms.gle/nAxdNjAqpAb3GEMz8"
      >
        <ChatBubbleLeftEllipsisIcon class="h-5 w-5 stroke-2" />
        意見回饋</NuxtLink
      >
    </div>
  </Header>
</template>

<script setup lang="ts">
import {
  Bars3Icon,
  QuestionMarkCircleIcon,
  PencilSquareIcon,
  ChartBarIcon,
  ChatBubbleLeftEllipsisIcon,
} from '@heroicons/vue/24/outline';
</script>
