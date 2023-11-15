<template>
  <AppHeader />
  <div class="flex w-fit min-w-full px-10 pt-16">
    <aside class="ml-auto" />
    <main class="mr-auto flex w-fit flex-col gap-3">
      <ul class="sticky top-16 z-20 flex gap-3 pt-3 backdrop-blur">
        <li
          v-for="politician in politicians"
          :key="politician"
          class="h-20 w-80 flex-none overflow-visible"
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

        <button
          title="新增政治人物"
          @click="onAddPoliticianClicked(politicians.length)"
          class="group mr-auto flex-none"
          :class="{
            'ml-auto': politicians.length === 0,
          }"
        >
          <div
            class="group flex h-20 w-80 items-center gap-3 rounded-md border-2 border-dashed border-slate-400 bg-white p-4 hover:border-slate-600 group-hover:border-transparent group-hover:shadow"
          >
            <div
              class="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-slate-400 bg-slate-100"
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
      </ul>

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
  <AppTagSearch
    :open="isTagSelectDialogOpen"
    :onClose="() => (isTagSelectDialogOpen = false)"
    :onSelect="onTagsSelect"
  />
</template>

<script setup lang="ts">
import { XMarkIcon, PlusIcon } from '@heroicons/vue/24/outline';

const {
  politicians,
  inject: injectPoliticians,
  remove,
} = useSelectPolitician();
const { tags, tagSet, remove: removeTag, inject: injectTags } = useSelectTag();

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
  if (tagSet.value.has(tag)) {
    const i = removeTag(tag);
    if (i < addTagPosition.value) {
      addTagPosition.value -= 1;
    }
    return;
  }

  const shift = injectTags(tag, addTagPosition.value);
  addTagPosition.value += shift;
}
</script>
