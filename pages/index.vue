<template>
  <Html class="scroll-smooth" />
  <AppHeader />
  <div class="mx-auto flex w-fit flex-col gap-3 px-6 pb-4 pt-16">
    <div
      @click="isSelectingPoliticians = !isSelectingPoliticians"
      v-if="title"
      class="sticky left-4 flex w-fit cursor-pointer items-center gap-2 overflow-x-auto text-2xl font-bold"
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
        <span v-if="isSelectingPoliticians"> 返回 </span>
        <span class="rounded-lg bg-secondary/20 px-2">{{
          title.replaceAll('_', ' ')
        }}</span>
      </h1>
    </div>
    <div
      v-if="!isSelectingPoliticians && selectedPoliticians.length !== 0"
      class="flex w-fit gap-4"
    >
      <aside
        v-if="selectedPoliticians.length > 0 && !showDraftTags"
        class="ml-auto flex w-48 flex-col gap-2 rounded-lg px-2"
      >
        <button
          @click="showDraftTags = true"
          class="flex items-center justify-center rounded-lg bg-primary/40 p-2 font-bold text-slate-600 hover:bg-primary/50"
        >
          <HashtagIcon class="h-4 w-4 flex-none stroke-2" />
          重新選擇標籤
        </button>
        <hr />
        <div class="flex flex-col gap-2">
          <Draggable
            v-if="selectedPoliticians.length > 0"
            v-model="selectedTags"
            tag="ul"
            class="flex w-full flex-col gap-2"
            :itemKey="(item: string) => item"
            dragClass="opacity-0"
            handle=".handle"
            :animation="150"
            @start="drag = true"
            @end="drag = false"
          >
            <template #item="{ element: tag }">
              <li class="flex items-center">
                <span class="flex gap-2 font-bold">
                  <span class="handle cursor-grab py-1">⠿</span>
                  <a
                    class="rounded-lg bg-primary/20 px-2 py-1 hover:bg-primary/30"
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
        <hr />
        <div class="flex flex-col gap-2">
          <ul class="flex w-full flex-col gap-2">
            <li
              v-for="tag in unselectedTags"
              :key="tag"
              @click="onAddTag(tag)"
              class="group flex cursor-pointer gap-2"
            >
              <span class="py-1">+</span>
              <span
                class="rounded-lg bg-slate-200 px-2 py-1 font-bold group-hover:bg-slate-300"
                >{{ tag }}</span
              >
            </li>
          </ul>
        </div>
        <hr />
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
            <li class="w-80 flex-none overflow-x-auto rounded-lg shadow-md">
              <AppContentHeader :politician="politician">
                <span
                  class="handle ml-auto cursor-grab pr-2 text-2xl font-bold text-slate-400"
                  >⠿</span
                >
              </AppContentHeader>
            </li>
          </template>
        </Draggable>
        <div
          v-if="showDraftTags"
          class="sticky left-6 right-6 flex w-[calc(100vw-3rem)] max-w-screen-sm flex-col gap-4 p-4"
        >
          <h2 class="px-6 text-center text-xl font-bold sm:max-w-screen-sm">
            選擇標籤與順序
          </h2>
          <ul
            class="left-6 flex w-fit flex-col gap-3 sm:max-w-screen-sm sm:flex-row sm:flex-wrap sm:justify-evenly"
          >
            <li
              class="flex cursor-pointer gap-3"
              v-for="tag in allTags"
              :key="tag"
              @click="onToggleDraftTag(tag)"
            >
              <span
                class="inline-block flex w-8 items-center justify-center rounded-lg bg-white font-bold text-slate-400"
              >
                {{ draftTagsMap.get(tag) }}
              </span>
              <span
                class="rounded-lg px-2 py-1 text-xl font-bold"
                :class="{
                  'bg-primary/20 hover:bg-primary/30': draftTagsMap.has(tag),
                  'bg-slate-200 hover:bg-slate-300': !draftTagsMap.has(tag),
                }"
              >
                {{ tag }}
              </span>
            </li>
          </ul>
          <button
            @click="draftTags = ''"
            class="flex cursor-pointer items-center justify-center rounded-lg bg-secondary/30 p-2 font-bold text-slate-600 hover:bg-secondary/40 sm:max-w-screen-sm"
          >
            <XMarkIcon class="h-4 w-4 flex-none stroke-2" />
            全部取消
          </button>
          <button
            @click="onSetDraftTags()"
            class="flex cursor-pointer items-center justify-center rounded-lg bg-primary/40 p-2 font-bold text-slate-600 hover:bg-primary/50 sm:max-w-screen-sm"
          >
            <HashtagIcon class="h-4 w-4 flex-none stroke-2" />
            確認
          </button>
        </div>

        <template v-else-if="selectedPoliticians.length > 0">
          <ul
            v-for="tag in selectedTags"
            :key="tag"
            class="mr-auto flex gap-2 overflow-visible"
          >
            <li
              v-for="politician in selectedPoliticians"
              :key="`${politician}-${tag}`"
              class="anchor w-80 scroll-ml-4 scroll-mt-[9.5rem] rounded-lg shadow-md"
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
      </main>
    </div>

    <HeadlessTabGroup v-if="isSelectingPoliticians">
      <HeadlessTabList class="flex max-w-screen-sm gap-2 overflow-x-auto px-3">
      </HeadlessTabList>
      <HeadlessTabPanels as="template">
        <HeadlessTabPanel
          class="flex w-[calc(100vw-3rem)] max-w-screen-sm flex-col gap-2"
        >
          <div
            class="sticky top-16 z-10 mt-6 rounded-lg border-2 border-primary/40 bg-white p-3"
          >
            <input
              type="search"
              v-model="groupSearchText"
              placeholder="總統, 內湖, 翁文方, 第8選舉, ..."
              class="w-full border-0 py-0 pl-8 pr-0 placeholder-slate-400 focus:ring-0"
            />
            <MagnifyingGlassIcon
              class="absolute inset-y-0 left-4 h-full w-5 stroke-2"
            />
          </div>
          <div class="w-full px-4 text-lg font-bold text-primary/60">
            搜尋你想認識的候選人
          </div>
          <ul class="flex flex-col gap-4 pt-10">
            <li
              v-for="option in groupOptions"
              :key="option.key"
              @click="onSelectPoliticians(option.name)"
              class="cursor-pointer rounded-lg p-3 hover:bg-slate-200"
            >
              <div class="no-scrollbar flex flex-col gap-3 overflow-x-auto">
                <div class="sticky left-0 flex gap-2">
                  <span
                    class="inline-block flex-none rounded-lg bg-secondary/20 px-2 font-bold"
                  >
                    {{ option.name.replaceAll('_', ' ') }}
                  </span>
                </div>
                <ul class="flex w-fit gap-2">
                  <li
                    class="flex flex-none items-center gap-2 rounded-lg bg-primary/20 p-2 font-normal"
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
              </div>
            </li>
          </ul>
        </HeadlessTabPanel>
        <HeadlessTabPanel class="flex flex-col gap-2">
          <div class="sticky top-16 z-10 rounded-lg bg-white p-3">
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
  ArrowsRightLeftIcon,
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  HashtagIcon,
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
      isSelectingPoliticians.value = true;
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

const showDraftTags = ref<boolean>(!route.query.tags);
const draftTags = useCookie('draft_tags');
const draftTagsMap = ref<Map<string, number>>(new Map());

watch(
  draftTags,
  (tagsStr) => {
    const newDraftTagsMap = new Map<string, number>();
    if (!tagsStr) {
      draftTagsMap.value = newDraftTagsMap;
      return;
    }

    tagsStr.split(',').forEach((tag, i) => {
      newDraftTagsMap.set(tag, i + 1);
    });

    draftTagsMap.value = newDraftTagsMap;
  },
  { immediate: true },
);

function onToggleDraftTag(tag: string) {
  if (!draftTags.value) {
    draftTags.value = tag;
    return;
  }

  if (draftTags.value.includes(tag)) {
    draftTags.value = draftTags.value
      .split(',')
      .filter((t) => t !== tag)
      .join(',');
    return;
  }

  draftTags.value = draftTags.value ? `${draftTags.value},${tag}` : tag;
}

function onAddTag(tag: string) {
  mixpanel.track('Tag Added', { tag });
  const query = {
    tags: route.query.tags ? `${route.query.tags},${tag}` : tag,
    politicians: route.query.politicians,
  };
  navigateTo({ query, hash: '' });
}

function onSetDraftTags() {
  const query = {
    tags: draftTags.value,
    politicians: route.query.politicians,
  };
  showDraftTags.value = false;
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
