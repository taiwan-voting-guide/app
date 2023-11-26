<template>
  <AppHeader />
  <ClientOnly>
    <HeadlessTabGroup
      as="main"
      class="mx-auto flex max-w-[720px] flex-col gap-2 px-2 pb-4 pt-16"
    >
      <HeadlessTabList
        class="sticky top-16 flex w-fit gap-4 rounded-md bg-primary/10 p-2 backdrop-blur"
      >
        <HeadlessTab v-for="tab in tabs" as="template" v-slot="{ selected }">
          <button
            class="rounded-md outline-none focus:outline-none"
            :class="{
              'font-bold text-slate-600': selected,
              'text-slate-400 hover:font-bold hover:text-slate-600': !selected,
            }"
          >
            {{ tab }}
          </button>
        </HeadlessTab>
      </HeadlessTabList>

      <HeadlessTabPanels>
        <HeadlessTabPanel>
          <template v-if="popularTags">
            <p class="px-2 text-sm font-bold">
              計算方式為7天內各項標籤點擊次數。 於
              {{ new Date(popularTags.timestamp).toLocaleString() }} 更新
            </p>
            <ul class="flex w-full flex-col gap-1 pt-2">
              <li
                v-for="{ tag, count } in popularTags.tagCounts"
                :key="tag"
                class="flex items-center justify-between rounded-md bg-primary/10 px-2 py-3 font-bold"
              >
                <span> {{ tag }} </span>
                <span> 點擊 {{ count }} 次 </span>
              </li>
            </ul>
          </template>
        </HeadlessTabPanel>
      </HeadlessTabPanels>
    </HeadlessTabGroup>
  </ClientOnly>
</template>

<script setup lang="ts">
const tabs = ['熱門標籤', '熱門政治人物', '貢獻者排行'];

const { data: popularTags } = await getTagAddedLast7Days();
</script>
