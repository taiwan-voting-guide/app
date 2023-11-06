<template>
  <Header>
    <Logo />
    <div class="ml-auto mr-3 h-6 lg:hidden">
      <HeadlessMenu v-slot="{ close }">
        <HeadlessMenuButton>
          <Bars3Icon class="h-6 w-6 text-slate-600" />
        </HeadlessMenuButton>
        <HeadlessMenuItems
          @click="close"
          class="absolute right-0 z-40 mr-2 w-fit rounded-md drop-shadow"
        >
          <HeadlessMenuItem>
            <NuxtLink
              class="flex items-center gap-1 px-3 py-2"
              to="/docs/introduction"
            >
              <QuestionMarkCircleIcon class="h-5 w-5 stroke-2" />
              如何使用
            </NuxtLink>
          </HeadlessMenuItem>

          <HeadlessMenuItem>
            <NuxtLink
              class="flex items-center gap-1 px-3 py-2"
              to="/docs/contribute"
            >
              <PencilSquareIcon class="h-5 w-5 stroke-2" />
              貢獻
            </NuxtLink>
          </HeadlessMenuItem>

          <HeadlessMenuItem>
            <NuxtLink
              class="flex items-center gap-1 px-3 py-2"
              to="/data/tag_clicks_last_7_days"
            >
              <ChartBarIcon class="h-5 w-5 stroke-2" />
              數據
            </NuxtLink>
          </HeadlessMenuItem>

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

    <NuxtLink
      to="/docs/introduction"
      class="ease hidden min-w-max items-center gap-1 rounded-md px-3 py-1 font-bold text-slate-500 lg:flex"
    >
      <QuestionMarkCircleIcon class="h-5 w-5 stroke-2" />
      如何使用
    </NuxtLink>
    <NuxtLink
      to="/contribute"
      class="ease hidden min-w-max items-center gap-1 rounded-md px-3 py-1 font-bold text-slate-500 lg:flex"
    >
      <PencilSquareIcon class="h-5 w-5 stroke-2" />
      <span class="flex-none">參與貢獻</span>
    </NuxtLink>
    <NuxtLink
      to="/data/tag_clicks_last_7_days"
      class="ease hidden min-w-max items-center gap-1 rounded-md px-3 py-1 font-bold text-slate-500 lg:flex"
    >
      <ChartBarIcon class="h-5 w-5 stroke-2" /> 數據
    </NuxtLink>
    <div class="ml-auto hidden lg:flex">
      <NuxtLink
        class="ease flex min-w-max items-center gap-1 rounded-md px-3 py-1 font-bold text-slate-500"
        to="https://github.com/taiwan-voting-guide/app"
        ><div class="flex items-center gap-1">
          <img class="h-5 w-5 stroke-2" src="/github-mark.svg" />GitHub
        </div></NuxtLink
      >
      <NuxtLink
        class="ease flex min-w-max items-center gap-1 rounded-md px-3 py-1 font-bold text-slate-500"
        to="https://join.slack.com/t/taiwanvotingguide/shared_invite/zt-1stmgptpf-~D6X8ETZyaNR7uUHrIk~sA"
        ><div class="flex items-center gap-1">
          <img class="h-5 w-5 stroke-2" src="/slack.webp" />Slack
        </div></NuxtLink
      >
      <NuxtLink
        class="ease flex min-w-max items-center gap-1 rounded-md px-3 py-1 font-bold text-slate-500"
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
