<template>
  <AppHeader />
  <ul class="flex w-fit min-w-full p-20">
    <template v-for="n in politicians.length * 2 + 1" :key="n">
      <li v-if="n % 2 === 0" class="w-80 flex-none">
        <AppContentHeader :politician="politicians[(n - 2) / 2]">
          <XMarkIcon
            @click="remove(politicians[(n - 2) / 2])"
            class="ml-auto h-6 w-6 cursor-pointer stroke-2 text-slate-400"
          />
        </AppContentHeader>
      </li>
      <li
        v-else-if="n === 1 && politicians.length === 0"
        @click="onAddPoliticianClicked(0)"
        class="group mx-auto flex flex-none cursor-pointer flex-col gap-2 pr-4 transition-all"
      >
        <div
          class="flex h-20 w-80 items-center justify-center rounded-md border-2 border-dashed border-slate-200 bg-white group-hover:border-slate-400"
        >
          <PlusIcon
            class="h-6 w-6 stroke-2 text-slate-200 group-hover:text-slate-400"
          />
        </div>
        <div class="flex w-full items-center justify-center gap-1">
          <InformationCircleIcon class="h-6 w-6 stroke-2 text-slate-400" />
          <span class="text-slate-400">新增候選人或政治人物</span>
        </div>
      </li>
      <li
        v-else-if="n === 1 && politicians.length > 0"
        @click="onAddPoliticianClicked(0)"
        class="group ml-auto flex-none cursor-pointer pr-4 transition-all"
      >
        <div
          class="flex h-full w-20 items-center justify-center rounded-md border-2 border-dashed border-slate-200 bg-white group-hover:border-slate-400"
        >
          <PlusIcon
            class="h-6 w-6 stroke-2 text-slate-200 group-hover:text-slate-400"
          />
        </div>
      </li>
      <li
        v-else-if="n === politicians.length * 2 + 1"
        @click="onAddPoliticianClicked(politicians.length)"
        class="group mr-auto flex-none cursor-pointer pl-4 transition-all"
      >
        <div
          class="flex h-full w-20 items-center justify-center rounded-md border-2 border-dashed border-slate-200 bg-white group-hover:border-slate-400"
        >
          <PlusIcon
            class="h-6 w-6 stroke-2 text-slate-200 group-hover:text-slate-400"
          />
        </div>
      </li>
      <li
        class="group flex-none cursor-pointer transition-all hover:px-4"
        :class="{
          'px-4': (n - 1) / 2 === addPosition && isPoliticianSelectDialogOpen,
        }"
        v-else
        @click="onAddPoliticianClicked((n - 1) / 2)"
      >
        <div
          class="flex h-full w-4 items-center justify-center rounded-md group-hover:w-20 group-hover:border-2 group-hover:border-dashed group-hover:border-slate-400 group-hover:bg-white"
          :class="{
            'w-20 border-2 border-dashed border-slate-400 bg-white':
              (n - 1) / 2 === addPosition && isPoliticianSelectDialogOpen,
          }"
        >
          <div class="h-full w-px border border-dashed group-hover:hidden" />
          <PlusIcon
            class="hidden h-6 w-6 stroke-2 text-transparent group-hover:block group-hover:text-slate-400"
          />
        </div>
      </li>
    </template>
  </ul>
  <AppNewPoliticianSearch
    :open="isPoliticianSelectDialogOpen"
    :onClose="() => (isPoliticianSelectDialogOpen = false)"
    :onSelect="onPoliticiansSelect"
  />
</template>

<script setup lang="ts">
import {
  XMarkIcon,
  PlusIcon,
  InformationCircleIcon,
} from '@heroicons/vue/24/outline';

// fetch app data
const { data } = await getAppData();
const allTags = data.value?.tags || [];

const { politicians, inject, remove } = useSelectPolitician();
const { tags, toggle, tagSet } = useSelectTag();

const isPoliticianSelectDialogOpen = ref<boolean>(false);
const addPosition = ref<number>(0);

watch([tags, politicians], () => {
  const query: { tags?: string; politicians?: string } = {};

  const tagParam = tags.value.join(',');
  if (tagParam) {
    query.tags = tagParam;
  }

  const politicianParam = politicians.value.join(',');
  if (politicianParam) {
    query.politicians = politicianParam;
  }

  navigateTo({ query });
});

const searchText = ref<string>('');
const filterTags = computed(() =>
  searchText.value
    ? allTags.filter((tag) => tag.includes(searchText.value))
    : allTags,
);

function onAddPoliticianClicked(position: number) {
  addPosition.value = position;
  isPoliticianSelectDialogOpen.value = true;
}

function onPoliticiansSelect(politicians: Array<string> | string) {
  if (Array.isArray(politicians)) {
    inject(politicians, addPosition.value);
  } else {
    inject([politicians], addPosition.value);
  }

  searchText.value = '';
  isPoliticianSelectDialogOpen.value = false;
}
</script>
