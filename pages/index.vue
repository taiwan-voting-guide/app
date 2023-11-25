<template>
  <Html class="touch-auto scroll-smooth" />
  <AppHeader />
  <div class="flex w-fit min-w-full gap-4 px-4 pb-4 pt-16">
    <aside
      v-if="politicians.length > 0"
      class="sticky top-16 ml-auto flex max-h-[calc(100vh-5rem)] flex-col overflow-y-scroll rounded-md"
    >
      <button
        v-if="!isTagsOpen"
        @click="isTagsOpen = true"
        class="rounded-md bg-primary/10 p-4 backdrop-blur"
      >
        <BarsArrowDownIcon class="h-5 w-5 cursor-pointer stroke-2" />
      </button>

      <nav
        v-if="isTagsOpen"
        class="flex w-60 flex-col gap-4 rounded-md bg-primary/10 p-4 backdrop-blur"
      >
        <button class="ml-auto" @click="isTagsOpen = false">
          <BarsArrowUpIcon class="h-5 w-5 cursor-pointer stroke-2" />
        </button>
        <div class="flex flex-col gap-1">
          <div class="flex items-center">
            <span class="font-bold"> 顯示來源 </span>
            <span class="ml-auto flex items-center">
              <Switch :name="'顯示來源'" v-model:enabled="showSource" />
            </span>
          </div>
          <div class="flex items-center">
            <span class="font-bold"> 顯示貢獻者 </span>
            <span class="ml-auto flex items-center">
              <Switch :name="'顯示貢獻者'" v-model:enabled="showAuthor" />
            </span>
          </div>
        </div>

        <div>
          <header class="flex items-center pb-2 font-bold">已選取</header>
          <Draggable
            v-if="politicians.length > 0"
            v-model="tags"
            tag="ul"
            class="w-full"
            itemKey="element"
            dragClass="opacity-0"
            :animation="150"
            @start="drag = true"
            @end="drag = false"
          >
            <template #item="{ element: tag }">
              <li class="flex items-center gap-1">
                <span class="flex cursor-grab gap-1 p-1">
                  <span>⠿</span>
                  {{ tag }}
                </span>
                <XMarkIcon
                  @click="removeTag(tag)"
                  class="ml-auto h-5 w-5 cursor-pointer stroke-2 text-slate-400"
                />
                <a :href="`#${politicians[0]}-${tag}`">
                  <ArrowUturnRightIcon
                    class="h-5 w-5 cursor-pointer stroke-2 text-slate-400"
                  />
                </a>
              </li>
            </template>
          </Draggable>
        </div>

        <div>
          <header class="pb-2 font-bold">未選取</header>
          <ul>
            <li
              v-for="tag in unselectedTags"
              :key="tag"
              @click="onClickTag(tag)"
              class="flex cursor-pointer items-center gap-1 p-1 hover:font-bold"
            >
              <span class="opacity-0">⠿</span>
              {{ tag }}
            </li>
          </ul>
        </div>
      </nav>
    </aside>
    <main
      class="mr-auto flex w-fit flex-col gap-2"
      :class="{
        'ml-auto': politicians.length === 0,
      }"
    >
      <Draggable
        tag="ul"
        class="sticky top-16 z-20 flex gap-2"
        chosenClass="cursor-grabbing"
        ghostClass="opacity-0"
        v-model="politicians"
        animation="150"
        itemKey="id"
        @start="drag = true"
        @end="drag = false"
      >
        <template #item="{ element: politician }">
          <li
            class="h-20 w-80 flex-none cursor-grab overflow-visible rounded-md shadow-md"
          >
            <AppContentHeader :politician="politician">
              <div class="ml-auto" title="移除">
                <XMarkIcon
                  @click="remove(politician)"
                  class="h-5 w-5 cursor-pointer stroke-2 text-slate-400"
                />
              </div>
            </AppContentHeader>
          </li>
        </template>
        <template #footer>
          <button
            title="新增政治人物"
            @click="onAddPoliticianClicked(politicians.length)"
            class="flex-none"
          >
            <div
              class="group flex h-20 w-80 items-center gap-2 rounded-md border-2 border-dashed border-slate-200 bg-white p-4 group-hover:border-slate-400 group-hover:shadow"
            >
              <div
                class="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100"
              >
                <PlusIcon
                  class="h-5 w-5 cursor-pointer stroke-2 text-slate-400"
                />
              </div>
              <h1
                class="text-2xl font-extrabold text-slate-400 group-hover:text-slate-600"
              >
                新增政治人物
              </h1>
            </div>
          </button>
        </template>
      </Draggable>

      <template v-if="politicians.length > 0">
        <ul
          v-for="tag in tags"
          :key="tag"
          class="mr-auto flex gap-2 overflow-visible"
        >
          <li
            v-for="politician in politicians"
            :key="`${politician}-${tag}`"
            class="anchor w-80 scroll-ml-4 scroll-mt-[9.5rem] rounded-md shadow-md"
          >
            <AppContent
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

  <AppPoliticianSearch
    :open="isPoliticianSelectDialogOpen"
    :onClose="() => (isPoliticianSelectDialogOpen = false)"
    :onSelect="onPoliticiansSelect"
  />
</template>

<script setup lang="ts">
import {
  XMarkIcon,
  PlusIcon,
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  ArrowUturnRightIcon,
} from '@heroicons/vue/24/outline';
import mixpanel from 'mixpanel-browser';
import Draggable from 'vuedraggable';

const { data } = await getAllTags();

const {
  politicians,
  append: appendPoliticians,
  remove,
} = useSelectPolitician();
const { tags, tagSet, append: appendTag, remove: removeTag } = useSelectTag();

const isPoliticianSelectDialogOpen = ref<boolean>(false);
const addPoliticianPosition = ref<number>(0);
const drag = ref<boolean>(false);
const showSource = ref<boolean>(true);
const showAuthor = ref<boolean>(false);
const isTagsOpen = ref<boolean>(true);
const visited = useCookie('visited');
const searchText = ref<string>('');

const unselectedTags = computed(() => {
  if (!data.value) {
    return [];
  }

  return data.value.filter((tag) => !tagSet.value.has(tag));
});

watch(showAuthor, () => {
  mixpanel.track('Show Author', { showAuthor: showAuthor.value });
});

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

onMounted(() => {
  console.log(visited.value);
  if (
    !visited.value &&
    politicians.value.length === 0 &&
    tags.value.length === 0
  ) {
    visited.value = 'visited';
    appendPoliticians(['侯友宜', '柯文哲', '賴清德']);
    appendTag('2024政見');
  }
});

function onClickTag(tag: string) {
  mixpanel.track('Tag Added', { tag });
  appendTag(tag);
}

function onAddPoliticianClicked(position: number) {
  addPoliticianPosition.value = position;
  isPoliticianSelectDialogOpen.value = true;
}

function onPoliticiansSelect(politicians: Array<string>) {
  appendPoliticians(politicians);
  searchText.value = '';
  isPoliticianSelectDialogOpen.value = false;
}
</script>
