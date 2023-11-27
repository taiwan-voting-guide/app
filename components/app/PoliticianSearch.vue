<template>
  <Dialog :open="open" :onClose="onClose">
    <HeadlessTabGroup
      :selectedIndex="selectedTab"
      @change="changeTab"
      as="div"
      class="relative flex h-full flex-col gap-2"
    >
      <ArrowLeftIcon
        @click="onClose"
        class="absolute left-4 top-5 h-5 w-5 cursor-pointer"
      />
      <HeadlessTabList class="flex gap-3 pl-12 pt-3">
        <HeadlessTab
          v-for="group in data"
          class="rounded-md px-3 py-2 ui-selected:bg-primary/30 ui-selected:font-bold ui-not-selected:bg-primary/10"
          >{{ group.name }}</HeadlessTab
        >
      </HeadlessTabList>
      <HeadlessTabPanels class="h-full overflow-y-auto">
        <HeadlessTabPanel>
          <div
            class="relative sticky top-0 border-y border-slate-100 bg-white p-3"
          >
            <input
              type="text"
              v-model="searchText"
              placeholder="2024, 總統, 翁文方, 第八選舉區, ..."
              class="w-full border-0 py-0 pl-10 placeholder-slate-400 focus:ring-0"
            />
            <MagnifyingGlassIcon
              class="absolute inset-y-0 left-4 h-5 h-full w-5"
            />
          </div>
          <ul
            :class="{
              'pb-[60vh]': isMobile,
            }"
          >
            <li
              v-for="result in results"
              :key="result.key"
              @click="onSelect(result.value)"
              class="flex cursor-pointer flex-col gap-2 px-4 py-2 font-bold hover:bg-slate-100"
            >
              {{ result.name }}
              <ul class="flex items-center gap-2 overflow-x-auto">
                <li
                  class="flex flex-none items-center gap-2 font-normal"
                  v-for="val in result.value"
                >
                  <NuxtImg
                    :src="`/politician/${val}.webp`"
                    :alt="val"
                    placeholder="/placeholder.svg"
                    width="48"
                    height="48"
                    class="h-12 w-12 rounded-full bg-primary/20"
                  />
                  {{ val }}
                </li>
              </ul>
            </li>
          </ul>
        </HeadlessTabPanel>
        <HeadlessTabPanel>
          <div
            class="relative sticky top-0 border-y border-slate-100 bg-white p-3"
          >
            <input
              type="text"
              v-model="searchText"
              placeholder="林月真, 趙昌澤, ..."
              class="w-full border-0 py-0 pl-10 placeholder-slate-400 focus:ring-0"
            />
            <MagnifyingGlassIcon
              class="absolute inset-y-0 left-4 h-5 h-full w-5"
            />
          </div>
          <ul
            :class="{
              'pb-[60vh]': isMobile,
            }"
          >
            <li
              v-for="result in results"
              :key="result.key"
              @click="onSelect(result.value)"
              class="flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-primary/20"
            >
              <NuxtImg
                :src="`/politician/${result.value[0]}.webp`"
                :alt="result.value[0]"
                placeholder="/placeholder.svg"
                width="48"
                height="48"
                class="h-12 w-12 rounded-full bg-slate-100"
              />
              {{ result.value[0] }}
            </li>
          </ul>
        </HeadlessTabPanel>
      </HeadlessTabPanels>
    </HeadlessTabGroup>
  </Dialog>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline';

const {
  open,
  onClose,
  onSelect = () => {},
} = defineProps<{
  open: boolean;
  onClose: () => void;
  onSelect?: (politicians: Array<string>) => void;
}>();

const { isMobile } = useDevice();

const searchText = ref<string>('');

const { data } = await getPoliticianSearchOptions();

const selectedTab = ref(0);

const results = computed(() => {
  if (!data?.value) {
    return [];
  }

  const { options } = data.value[selectedTab.value];

  const keywords = searchText.value.trim().replace(/\s+/g, ' ').split(' ');
  const results: Array<PoliticianSearchOption> = [];
  for (const option of options) {
    for (const keyword of keywords) {
      if (option.key.includes(keyword)) {
        results.push(option);
        break;
      }
    }
  }

  return results;
});

function changeTab(index: number) {
  selectedTab.value = index;
}
</script>
