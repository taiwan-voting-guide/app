<template>
  <AppHeader />
  <div class="flex w-fit min-w-full gap-2 px-4 py-16">
    <aside class="sticky left-4 left-4 top-20 z-30 ml-auto flex flex-col">
      <nav
        v-if="politicians.length > 0"
        class="sticky top-20 flex w-60 flex-col gap-4 rounded-md bg-slate-100/50 p-4 backdrop-blur"
      >
        <div>
          <header class="pb-2 font-bold">已選取</header>
          <Draggable
            v-if="politicians.length > 0"
            v-model="tags"
            tag="ul"
            class="w-full"
            itemKey="id"
            group="tags"
            :animation="150"
            @start="drag = true"
            @end="drag = false"
          >
            <template #item="{ element: tag }">
              <li class="flex items-center">
                <span class="flex cursor-grab gap-1 p-1 hover:font-bold">
                  <span>⠿</span>
                  {{ tag }}
                </span>
                <XMarkIcon
                  @click="removeTag(tag)"
                  class="ml-auto h-5 w-5 cursor-pointer stroke-2 text-slate-400"
                />
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
              @click="append(tag)"
              class="flex cursor-pointer items-center gap-1 p-1 hover:font-bold"
            >
              <span class="opacity-0">⠿</span>
              {{ tag }}
            </li>
          </ul>
        </div>
      </nav>
    </aside>
    <main class="mr-auto flex w-fit flex-col gap-3">
      <Draggable
        tag="ul"
        class="sticky top-16 z-20 flex gap-3"
        chosenClass="cursor-grabbing"
        ghostClass="opacity-0"
        v-model="politicians"
        animation="150"
        itemKey="id"
        @start="drag = true"
        @end="drag = false"
      >
        <template #item="{ element: politician }">
          <li class="h-20 w-80 flex-none cursor-grab overflow-visible">
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
            class="group mr-auto flex-none"
            :class="{
              'ml-auto': politicians.length === 0,
            }"
          >
            <div
              class="group flex h-20 w-80 items-center gap-3 rounded-md border-2 border-dashed border-slate-200 bg-white p-4 group-hover:border-slate-400 group-hover:shadow"
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
          class="mr-auto flex gap-3 overflow-visible"
        >
          <AppContent
            v-for="politician in politicians"
            :key="`${politician}-${tag}`"
            :politician="politician"
            :tag="tag"
          />
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
import { XMarkIcon, PlusIcon } from '@heroicons/vue/24/outline';
import Draggable from 'vuedraggable';

const { data } = await getAllTags();

const {
  politicians,
  inject: injectPoliticians,
  remove,
} = useSelectPolitician();
const { tags, tagSet, append, remove: removeTag } = useSelectTag();

const isPoliticianSelectDialogOpen = ref<boolean>(false);
const addPoliticianPosition = ref<number>(0);
const drag = ref<boolean>(false);

const unselectedTags = computed(() => {
  if (!data.value) {
    return [];
  }

  return data.value.filter((tag) => !tagSet.value.has(tag));
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
</script>
