<template>
  <AppHeader />
  <main class="w-fit min-w-full px-10 pt-20">
    <ul class="flex">
      <template
        v-for="n in politicians.length * 2 + 1"
        :key="`${n}${politicians[(n - 2) / 2]}`"
      >
        <button
          v-if="n === 1 && politicians.length === 0"
          title="新增候選人或政治人物"
          @click="onAddPoliticianClicked(0)"
          class="group mx-auto flex flex-none flex-col gap-2"
        >
          <div
            class="flex h-20 w-80 items-center justify-center rounded-md border-2 border-dashed border-slate-200 bg-white group-hover:border-slate-400"
          >
            <PlusIcon
              class="h-5 w-5 stroke-2 text-slate-200 group-hover:text-slate-400"
            />
          </div>
          <div class="flex w-full items-center justify-center gap-1">
            <InformationCircleIcon class="h-5 w-5 stroke-2 text-slate-400" />
            <span class="text-slate-400">新增候選人或政治人物</span>
          </div>
        </button>

        <button
          v-else-if="n === 1 && politicians.length > 0"
          title="新增候選人或政治人物"
          @click="onAddPoliticianClicked(0)"
          class="group ml-auto flex-none pr-4"
        >
          <div
            class="flex h-20 w-20 items-center justify-center rounded-md border-2 border-dashed border-slate-200 bg-white group-hover:border-slate-400"
          >
            <PlusIcon
              class="h-5 w-5 stroke-2 text-slate-200 group-hover:text-slate-400"
            />
          </div>
        </button>

        <button
          v-else-if="n === politicians.length * 2 + 1"
          title="新增候選人或政治人物"
          @click="onAddPoliticianClicked(politicians.length)"
          class="group mr-auto flex-none pl-4"
        >
          <div
            class="flex h-20 w-20 items-center justify-center rounded-md border-2 border-dashed border-slate-200 bg-white group-hover:border-slate-400"
          >
            <PlusIcon
              class="h-5 w-5 stroke-2 text-slate-200 group-hover:text-slate-400"
            />
          </div>
        </button>

        <button
          v-else-if="n % 2 === 1"
          title="新增候選人或政治人物"
          class="group flex w-4 flex-none justify-center hover:w-28"
          @click="onAddPoliticianClicked((n - 1) / 2)"
        >
          <div class="h-full w-px border border-dashed group-hover:hidden" />
          <div
            class="hidden h-20 w-20 items-center justify-center rounded-md border-2 border-dashed border-slate-400 bg-white group-hover:flex"
          >
            <PlusIcon class="h-5 w-5 stroke-2 text-slate-400" />
          </div>
        </button>

        <li v-else class="w-80 flex-none">
          <AppContentHeader :politician="politicians[(n - 2) / 2]">
            <div class="ml-auto" title="移除">
              <XMarkIcon
                @click="remove(politicians[(n - 2) / 2])"
                class="h-5 w-5 cursor-pointer stroke-2 text-slate-400"
              />
            </div>
          </AppContentHeader>
        </li>
      </template>
    </ul>

    <template v-if="politicians.length > 0">
      <template v-for="(tag, i) in tags" :key="tag">
        <button
          @click="onAddTagClicked(i)"
          class="group mx-auto flex flex-none hover:py-4"
        >
          <div
            class="relative flex h-4 items-center justify-center rounded-md border-slate-200"
            :class="{
              'group-hover:h-10 group-hover:border-2 group-hover:border-dashed group-hover:border-slate-400 group-hover:bg-white group-hover:py-4': true,
            }"
          >
            <div
              class="absolute h-px w-full border border-dashed group-hover:hidden"
            />
            <PlusIcon
              class="absolute hidden h-5 w-5 stroke-2 text-slate-200 group-hover:block group-hover:text-slate-400"
            />
            <template
              v-for="n in politicians.length * 2 + 1"
              :key="`${n}_${politicians[(n - 2) / 2]}`"
            >
              <div v-if="n % 2 === 0" class="w-80" />
              <div
                v-else-if="n !== 1 && n !== politicians.length * 2 + 1"
                class="w-4"
              />
            </template>
          </div>
        </button>
        <ul class="flex gap-4">
          <AppContent
            v-for="politician in politicians"
            :key="`${politician}-${tag}`"
            :politician="politician"
            :tag="tag"
          />
        </ul>
      </template>
      <button
        @click="onAddTagClicked(tags.length)"
        class="group mx-auto block pt-4"
      >
        <div
          class="relative flex h-10 items-center justify-center rounded-md border-2 border-dashed border-slate-200 bg-white group-hover:border-slate-400"
        >
          <PlusIcon
            class="absolute h-5 w-5 stroke-2 text-slate-200 group-hover:text-slate-400"
          />
          <template
            v-for="n in politicians.length * 2 + 1"
            :key="`${n}_${politicians[(n - 2) / 2]}`"
          >
            <div v-if="n % 2 === 0" class="h-20 w-80" />
            <div
              v-else-if="n !== 1 && n !== politicians.length * 2 + 1"
              class="h-20 w-4"
            />
          </template>
        </div>
      </button>
    </template>
  </main>

  <AppPoliticianSearch
    :open="isPoliticianSelectDialogOpen"
    :onClose="() => (isPoliticianSelectDialogOpen = false)"
    :onSelect="onPoliticiansSelect"
  />
  <AppTagSearch
    :open="isTagSelectDialogOpen"
    :onClose="() => (isTagSelectDialogOpen = false)"
    :onSelect="onTagsSelect"
  />
</template>

<script setup lang="ts">
import {
  XMarkIcon,
  PlusIcon,
  InformationCircleIcon,
} from '@heroicons/vue/24/outline';

// fetch app data
const { data } = await getAllTags();
const allTags = data.value || [];

const {
  politicians,
  inject: injectPoliticians,
  remove,
} = useSelectPolitician();
const { tags, inject: injectTags } = useSelectTag();

const isPoliticianSelectDialogOpen = ref<boolean>(false);
const addPoliticianPosition = ref<number>(0);
const isTagSelectDialogOpen = ref<boolean>(false);
const addTagPosition = ref<number>(0);

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

function onAddPoliticianClicked(position: number) {
  addPoliticianPosition.value = position;
  isPoliticianSelectDialogOpen.value = true;
}

function onPoliticiansSelect(politicians: Array<string> | string) {
  if (Array.isArray(politicians)) {
    injectPoliticians(politicians, addPoliticianPosition.value);
  } else {
    injectPoliticians([politicians], addPoliticianPosition.value);
  }

  searchText.value = '';
  isPoliticianSelectDialogOpen.value = false;
}

function onAddTagClicked(position: number) {
  isTagSelectDialogOpen.value = true;
  addTagPosition.value = position;
}

function onTagsSelect(tag: string) {
  const leftRemoved = injectTags([tag], addTagPosition.value);
  addTagPosition.value += 1 - leftRemoved;
}
</script>
