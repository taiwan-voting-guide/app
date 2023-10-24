<template>
  <header class="flex h-12 w-full flex-none items-center">
    <NuxtLink class="flex h-full flex-none items-center" to="/">
      <NuxtImg width="144" height="24" class="m-3 h-6" src="/logo.svg" />
    </NuxtLink>

    <template v-if="isMobile">
      <div class="ml-auto mr-3 h-6">
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
                to="/docs/contribute"
              >
                <PencilSquareIcon class="h-4 w-4" />
                貢獻
              </NuxtLink>
            </HeadlessMenuItem>

            <HeadlessMenuItem>
              <NuxtLink
                class="flex items-center gap-1 px-3 py-2"
                to="/docs/introduction"
              >
                <DocumentTextIcon class="h-4 w-4" />
                文件
              </NuxtLink>
            </HeadlessMenuItem>

            <HeadlessMenuItem>
              <NuxtLink
                class="flex items-center gap-1 px-3 py-2"
                to="/data/tag_clicks_last_7_days"
              >
                <ChartBarIcon class="h-4 w-4" />
                數據
              </NuxtLink>
            </HeadlessMenuItem>

            <HeadlessMenuItem>
              <NuxtLink
                class="flex items-center gap-1 px-3 py-2"
                to="https://github.com/taiwan-voting-guide/app"
              >
                <img class="inline h-4 w-4" src="/github-mark.svg" />GitHub
              </NuxtLink>
            </HeadlessMenuItem>
            <HeadlessMenuItem>
              <NuxtLink
                class="flex items-center gap-1 px-3 py-2"
                to="https://join.slack.com/t/taiwanvotingguide/shared_invite/zt-1stmgptpf-~D6X8ETZyaNR7uUHrIk~sA"
              >
                <img class="inline h-4 w-4" src="/slack.webp" />Slack
              </NuxtLink>
            </HeadlessMenuItem>
            <HeadlessMenuItem>
              <NuxtLink
                class="flex items-center gap-1 px-3 py-2"
                to="https://forms.gle/nAxdNjAqpAb3GEMz8"
              >
                <ChatBubbleLeftEllipsisIcon class="h-4 w-4" />
                意見回饋</NuxtLink
              >
            </HeadlessMenuItem>
          </HeadlessMenuItems>
        </HeadlessMenu>
      </div>
    </template>

    <template v-else>
      <NuxtLink
        to="/contribute"
        class="ease flex min-w-max items-center gap-1 rounded-md px-3 py-1 text-sm font-bold tracking-normal text-slate-500"
      >
        <PencilSquareIcon class="h-4 w-4" />
        <span class="flex-none">貢獻</span>
      </NuxtLink>
      <NuxtLink
        to="/docs/introduction"
        class="ease flex min-w-max items-center gap-1 rounded-md px-3 py-1 text-sm font-bold tracking-normal text-slate-500"
      >
        <DocumentTextIcon class="h-4 w-4" /> 文件
      </NuxtLink>
      <NuxtLink
        to="/data/tag_clicks_last_7_days"
        class="ease flex min-w-max items-center gap-1 rounded-md px-3 py-1 text-sm font-bold tracking-normal text-slate-500"
      >
        <ChartBarIcon class="h-4 w-4" /> 數據
      </NuxtLink>
      <div class="ml-auto mr-4 flex">
        <NuxtLink
          class="ease flex min-w-max items-center gap-1 rounded-md px-3 py-1 text-sm font-bold tracking-normal text-slate-500"
          to="https://github.com/taiwan-voting-guide/app"
          ><div class="flex items-center gap-1">
            <img class="h-4 w-4" src="/github-mark.svg" />GitHub
          </div></NuxtLink
        >
        <NuxtLink
          class="ease flex min-w-max items-center gap-1 rounded-md px-3 py-1 text-sm font-bold tracking-normal text-slate-500"
          to="https://join.slack.com/t/taiwanvotingguide/shared_invite/zt-1stmgptpf-~D6X8ETZyaNR7uUHrIk~sA"
          ><div class="flex items-center gap-1">
            <img class="h-4 w-4" src="/slack.webp" />Slack
          </div></NuxtLink
        >
        <NuxtLink
          class="ease flex min-w-max items-center gap-1 rounded-md px-3 py-1 text-sm font-bold tracking-normal text-slate-500"
          to="https://forms.gle/nAxdNjAqpAb3GEMz8"
        >
          <ChatBubbleLeftEllipsisIcon class="h-4 w-4" />
          意見回饋</NuxtLink
        >
      </div>
    </template>
  </header>
</template>

<script setup lang="ts">
import {
  Bars3Icon,
  DocumentTextIcon,
  PencilSquareIcon,
  ChartBarIcon,
  ChatBubbleLeftEllipsisIcon,
} from '@heroicons/vue/24/outline';

const { isMobile } = useDevice();
</script>
