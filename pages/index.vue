<template>
  <Html class="scroll-smooth" />
  <AppHeader />
  <div class="mx-auto flex w-fit flex-col gap-2 px-4 pb-16 pt-16">
    <div
      @click="isSelectingPoliticians = !isSelectingPoliticians"
      v-if="title"
      class="sticky left-4 flex w-fit cursor-pointer items-center gap-2 overflow-x-auto text-xl font-bold"
    >
      <ArrowsRightLeftIcon
        v-if="!isSelectingPoliticians"
        class="h-5 w-5 flex-none stroke-2"
      />
      <ArrowLeftIcon
        v-if="isSelectingPoliticians"
        class="h-5 w-5 flex-none stroke-2"
      />
      <h1>
        {{ title }}
      </h1>
    </div>
    <div
      v-if="!isSelectingPoliticians && selectedPoliticians.length !== 0"
      class="flex w-fit gap-4"
    >
      <aside
        v-if="selectedPoliticians.length > 0"
        class="sticky top-16 ml-auto flex max-h-[calc(100vh-5rem)] flex-col overflow-y-scroll rounded-md"
      >
        <nav class="flex w-60 flex-col gap-2 rounded-md bg-primary/10 p-4">
          <div class="flex items-center">
            <span class="font-bold"> 顯示來源 </span>
            <span class="ml-auto flex items-center">
              <Switch name="顯示來源" v-model:enabled="showSource" />
            </span>
          </div>
          <div class="flex items-center">
            <span class="font-bold"> 顯示貢獻者 </span>
            <span class="ml-auto flex items-center">
              <Switch name="顯示貢獻者" v-model:enabled="showAuthor" />
            </span>
          </div>

          <div class="flex flex-col gap-2">
            <header class="font-bold">已選取</header>
            <Draggable
              v-if="selectedPoliticians.length > 0"
              v-model="selectedTags"
              tag="ul"
              class="flex w-full flex-col"
              :itemKey="(item: string) => item"
              dragClass="opacity-0"
              handle=".handle"
              :animation="150"
              @start="drag = true"
              @end="drag = false"
            >
              <template #item="{ element: tag }">
                <li class="flex items-center">
                  <span class="flex gap-1">
                    <span class="handle cursor-grab py-1">⠿</span>
                    <a
                      class="py-1 hover:font-bold"
                      :href="`#${selectedPoliticians[0]}-${tag}`"
                    >
                      {{ tag }}
                    </a>
                  </span>
                  <XMarkIcon
                    @click="onRemoveTag(tag)"
                    class="ml-auto h-5 w-5 cursor-pointer stroke-2 text-slate-400"
                  />
                </li>
              </template>
            </Draggable>
          </div>

          <div class="flex flex-col gap-2">
            <header class="font-bold">未選取</header>
            <ul class="flex w-full flex-col">
              <li
                v-for="tag in unselectedTags"
                :key="tag"
                @click="onAddTag(tag)"
                class="cursor-pointer items-center py-1 pl-4 hover:font-bold"
              >
                {{ tag }}
              </li>
            </ul>
          </div>
        </nav>
      </aside>
      <main
        class="flex w-fit flex-col gap-2"
        :class="{
          'ml-auto': selectedPoliticians.length === 0,
        }"
      >
        <Draggable
          tag="ul"
          class="sticky top-16 z-20 flex gap-2"
          chosenClass="cursor-grabbing"
          ghostClass="opacity-0"
          v-model="selectedPoliticians"
          animation="150"
          :itemKey="(item: string) => item"
          handle=".handle"
          @start="drag = true"
          @end="drag = false"
        >
          <template #item="{ element: politician }">
            <li
              class="h-20 w-80 flex-none overflow-x-scroll rounded-md shadow-md"
            >
              <AppContentHeader :politician="politician">
                <span
                  class="handle ml-auto cursor-grab pr-2 text-2xl font-bold text-slate-400"
                  >⠿</span
                >
              </AppContentHeader>
            </li>
          </template>
        </Draggable>

        <template v-if="selectedPoliticians.length > 0">
          <ul
            v-for="tag in selectedTags"
            :key="tag"
            class="mr-auto flex gap-2 overflow-visible"
          >
            <li
              v-for="politician in selectedPoliticians"
              :key="`${politician}-${tag}`"
              class="anchor w-80 scroll-ml-4 scroll-mt-[9.5rem] rounded-md shadow-md"
            >
              <AppContent
                :onRemoveTag="onRemoveTag"
                :showSource="showSource"
                :showAuthor="showAuthor"
                :politician="politician"
                :tag="tag"
              />
            </li>
          </ul>
        </template>
        <div
          v-if="selectedTags.length === 0 && selectedPoliticians.length !== 0"
          class="flex items-center justify-center gap-1 py-4"
        >
          <InformationCircleIcon class="h-5 w-5 stroke-2 text-slate-400" />
          <span class="sticky left-4 text-slate-400"
            >點擊左側的標籤來新增內容</span
          >
        </div>
      </main>
    </div>
    <HeadlessTabGroup v-if="isSelectingPoliticians">
      <HeadlessTabList
        class="flex w-[calc(100vw-2rem)] max-w-screen-sm gap-2 overflow-x-auto"
      >
        <HeadlessTab
          class="flex-none rounded-md px-3 py-2 outline-none ui-selected:bg-primary/20 ui-selected:font-bold ui-not-selected:bg-slate-200"
          >2024總統立委選舉</HeadlessTab
        >
        <HeadlessTab
          class="flex-none rounded-md px-3 py-2 outline-none ui-selected:bg-primary/20 ui-selected:font-bold ui-not-selected:bg-slate-200"
          >自訂組合</HeadlessTab
        >
      </HeadlessTabList>
      <HeadlessTabPanels as="template">
        <HeadlessTabPanel
          class="flex w-[calc(100vw-2rem)] max-w-screen-sm flex-col gap-2"
        >
          <div class="sticky top-16 z-10 rounded-md bg-white p-3">
            <input
              type="search"
              v-model="groupSearchText"
              placeholder="總統, 翁文方, 第八選舉區, ..."
              class="w-full border-0 py-0 pl-8 pr-0 placeholder-slate-400 focus:ring-0"
            />
            <MagnifyingGlassIcon
              class="absolute inset-y-0 left-4 h-full w-5 stroke-2"
            />
          </div>
          <ul class="flex flex-col gap-2">
            <li
              v-for="option in groupOptions"
              :key="option.key"
              @click="onSelectPoliticians(option.name)"
              class="flex cursor-pointer flex-col gap-1 overflow-x-auto rounded-md p-2 font-bold hover:bg-slate-200"
            >
              <div class="sticky left-0">{{ option.name }}</div>
              <ul class="flex items-center gap-2">
                <li
                  class="flex flex-none items-center gap-2 rounded-xl bg-primary/10 p-2 font-normal"
                  v-for="val in option.value"
                >
                  <NuxtImg
                    :src="`/politician/${val}.webp`"
                    :alt="val"
                    placeholder="/placeholder.svg"
                    width="32"
                    height="32"
                    class="h-8 w-8 rounded-full bg-primary/20"
                  />
                  {{ val }}
                </li>
              </ul>
            </li>
          </ul>
        </HeadlessTabPanel>
        <HeadlessTabPanel class="flex flex-col gap-2">
          <div class="sticky top-16 z-10 rounded-md bg-white p-3">
            <input
              type="search"
              v-model="groupSearchText"
              placeholder="翁文方, 趙昌澤, 林月真, ..."
              class="w-full border-0 py-0 pl-8 pr-0 placeholder-slate-400 focus:ring-0"
            />
            <MagnifyingGlassIcon
              class="absolute inset-y-0 left-4 h-full w-5 stroke-2"
            />
          </div>
          <ul class="flex flex-col gap-2">
            <li
              class="flex flex-none items-center gap-2 rounded-xl bg-primary/10 p-2 font-normal font-normal"
              v-for="politician in allPoliticians"
              :key="politician"
            >
              <NuxtImg
                :src="`/politician/${politician}.webp`"
                :alt="politician"
                placeholder="/placeholder.svg"
                width="32"
                height="32"
                class="h-8 w-8 rounded-full bg-primary/20"
              />
              {{ politician }}
            </li>
          </ul>
        </HeadlessTabPanel>
      </HeadlessTabPanels>
    </HeadlessTabGroup>
  </div>
</template>

<script setup lang="ts">
import {
  XMarkIcon,
  InformationCircleIcon,
  ArrowsRightLeftIcon,
  ArrowLeftIcon,
  MagnifyingGlassIcon,
} from '@heroicons/vue/24/outline';
import mixpanel from 'mixpanel-browser';
import Draggable from 'vuedraggable';

const route = useRoute();
const { data: allPoliticians } = await getAllPoliticians();
const { data: politicianGroups } = await getPoliticianGroups();
const politicianGroupNamesMap = computed<Map<string, PoliticianGroup>>(() =>
  politicianGroups.value
    ? new Map(politicianGroups.value.map((group) => [group.name, group]))
    : new Map(),
);
const allPoliticiansSet = computed(() => new Set(allPoliticians.value));
const selectedPoliticians = ref<Array<string>>([]);
const selectedPoliticiansQuery = useSelectedPoliticiansQuery();

const title = ref<string>('');

const isSelectingPoliticians = ref<boolean>(
  route.query.politicians === undefined,
);

watch(
  () => route.query.politicians as string,
  (newPoliticians, oldPoliticians) => {
    if (newPoliticians === oldPoliticians) {
      return;
    }

    if (!newPoliticians) {
      selectedPoliticians.value = [];
      title.value = '';
      selectedPoliticiansQuery.value = '';
      return;
    }

    if (politicianGroupNamesMap.value.has(newPoliticians)) {
      selectedPoliticians.value =
        politicianGroupNamesMap.value.get(newPoliticians)?.value || [];
      title.value = newPoliticians;
      selectedPoliticiansQuery.value = newPoliticians;
      return;
    }

    selectedPoliticians.value = newPoliticians
      .split(',')
      .filter((politician) => allPoliticiansSet.value.has(politician));
    title.value = '自定組合';
    selectedPoliticiansQuery.value = newPoliticians;
  },
  { immediate: true },
);

const { data: allTags } = await getAllTags();
const allTagsSet = computed(() => new Set(allTags.value));
const selectedTags = ref<Array<string>>([]);
const selectedTagsSet = computed(() => new Set(selectedTags.value));
const unselectedTags = computed(() => {
  if (!allTags.value) {
    return [];
  }

  return allTags.value.filter((tag) => !selectedTagsSet.value.has(tag));
});
const selectedTagsQuery = useSelectedTagsQuery();

watch(
  () => route.query.tags as string,
  (newTags, oldTags) => {
    if (newTags === oldTags) {
      return;
    }

    if (!newTags) {
      selectedTags.value = [];
      selectedTagsQuery.value = '';
      return;
    }

    selectedTags.value = newTags
      .split(',')
      .filter((tag) => allTagsSet.value.has(tag));
    selectedTagsQuery.value = newTags;
  },
  { immediate: true },
);

const drag = ref<boolean>(false);
const showSource = ref<boolean>(true);
const showAuthor = ref<boolean>(false);

watch(showAuthor, () => {
  mixpanel.track('Show Author', { showAuthor: showAuthor.value });
});

function onSelectPoliticians(politicians: string) {
  const query = {
    tags: route.query.tags,
    politicians,
  };

  const groupVal = politicianGroupNamesMap.value.get(politicians);
  if (groupVal) {
    mixpanel.track('Politician Added', { politicians: groupVal.value });
  } else {
    mixpanel.track('Politician Added', { politicians: politicians.split(',') });
  }

  groupSearchText.value = '';
  isSelectingPoliticians.value = false;

  navigateTo({ query, hash: '' });
}

function onAddTag(tag: string) {
  mixpanel.track('Tag Added', { tag });
  const query = {
    tags: route.query.tags ? `${route.query.tags},${tag}` : tag,
    politicians: route.query.politicians,
  };
  navigateTo({ query, hash: '' });
}

function onRemoveTag(t: string) {
  const query: { tags?: string; politicians?: string } = {};
  const currentTags = (route.query.tags as string)
    .split(',')
    .filter((tag) => allTagsSet.value.has(tag))
    .filter((tag) => tag !== t);

  if (currentTags.length !== 0) {
    query.tags = currentTags.join(',');
  }

  query.politicians = route.query.politicians as string;
  navigateTo({ query, hash: '' });
}

const groupSearchText = ref<string>('');
const groupOptions = computed(() => {
  if (!politicianGroups?.value) {
    return [];
  }

  const keywords = groupSearchText.value.trim().replace(/\s+/g, ' ').split(' ');
  const options: Array<PoliticianGroup> = [];

  for (const option of politicianGroups.value) {
    let shouldKeep = true;
    for (const keyword of keywords) {
      if (!option.key.includes(keyword)) {
        shouldKeep = false;
        break;
      }
    }

    if (shouldKeep) {
      options.push(option);
    }
  }

  return options;
});
</script>
