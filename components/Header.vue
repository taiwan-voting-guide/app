<template>
  <header
    class="flex h-12 w-full flex-none items-center border-b border-primary bg-white"
  >
    <NuxtLink class="flex h-full flex-none items-center" to="/">
      <img class="mx-4 my-2 h-6" src="/logo.svg" />
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
                to="/docs/introduction"
              >
                📄 文件
              </NuxtLink>
            </HeadlessMenuItem>

            <HeadlessMenuItem>
              <NuxtLink
                class="flex items-center gap-1 px-3 py-2"
                to="/data/tag_clicks_last_7_days"
              >
                📊 數據
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
                💬 意見回饋</NuxtLink
              >
            </HeadlessMenuItem>
          </HeadlessMenuItems>
        </HeadlessMenu>
      </div>
    </template>

    <template v-else>
      <NuxtLink to="/docs/introduction"> <Button> 📄 文件</Button></NuxtLink>
      <NuxtLink to="/data/tag_clicks_last_7_days">
        <Button> 📊 數據</Button></NuxtLink
      >
      <div class="ml-auto mr-4 flex">
        <NuxtLink to="https://github.com/taiwan-voting-guide/app">
          <Button
            ><div class="flex items-center gap-1">
              <img class="inline h-4 w-4" src="/github-mark.svg" />GitHub
            </div></Button
          ></NuxtLink
        >
        <NuxtLink
          to="https://join.slack.com/t/taiwanvotingguide/shared_invite/zt-1stmgptpf-~D6X8ETZyaNR7uUHrIk~sA"
        >
          <Button
            ><div class="flex items-center gap-1">
              <img class="inline h-4 w-4" src="/slack.webp" />Slack
            </div></Button
          ></NuxtLink
        >
        <NuxtLink to="https://forms.gle/nAxdNjAqpAb3GEMz8">
          <Button> 💬 意見回饋</Button></NuxtLink
        >
      </div>
    </template>
  </header>
</template>

<script setup lang="ts">
const { isMobile } = useDevice();
import {
  Bars3Icon,
  DocumentIcon,
  ChartBarIcon,
} from '@heroicons/vue/24/outline';
</script>
