<template>
  <header
    class="flex h-12 w-full flex-none items-center border-b border-primary bg-white"
  >
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
            class="absolute right-0 z-40 mr-2 w-fit rounded-md bg-white drop-shadow"
          >
            <HeadlessMenuItem>
              <NuxtLink
                class="flex items-center gap-1 px-3 py-2"
                to="/docs/contribute?politician=侯友宜&tag=生日"
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
      <ButtonInvisible to="/contribute?politician=侯友宜&tag=生日">
        <PencilSquareIcon class="h-4 w-4" />
        <span class="flex-none">貢獻</span>
      </ButtonInvisible>
      <ButtonInvisible to="/docs/introduction">
        <DocumentTextIcon class="h-4 w-4" /> 文件</ButtonInvisible
      >
      <ButtonInvisible to="/data/tag_clicks_last_7_days">
        <ChartBarIcon class="h-4 w-4" /> 數據</ButtonInvisible
      >
      <div class="ml-auto mr-4 flex">
        <ButtonInvisible to="https://github.com/taiwan-voting-guide/app"
          ><div class="flex items-center gap-1">
            <img class="h-4 w-4" src="/github-mark.svg" />GitHub
          </div></ButtonInvisible
        >
        <ButtonInvisible
          to="https://join.slack.com/t/taiwanvotingguide/shared_invite/zt-1stmgptpf-~D6X8ETZyaNR7uUHrIk~sA"
          ><div class="flex items-center gap-1">
            <img class="h-4 w-4" src="/slack.webp" />Slack
          </div></ButtonInvisible
        >
        <ButtonInvisible to="https://forms.gle/nAxdNjAqpAb3GEMz8">
          <ChatBubbleLeftEllipsisIcon class="h-4 w-4" />
          意見回饋</ButtonInvisible
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
