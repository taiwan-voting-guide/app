<template>
  <header
    class="fixed inset-x-0 top-0 z-30 flex h-16 flex-wrap items-center justify-between gap-2 bg-slate-100/80 py-2 backdrop-blur md:flex-nowrap"
  >
    <div class="flex">
      <Logo />
      <NuxtLink
        title="如何使用"
        to="/docs/how-to-contribute"
        class="flex flex-none items-center gap-1 rounded-md px-2 text-slate-400 hover:text-slate-600"
      >
        <QuestionMarkCircleIcon class="h-5 w-5 stroke-2" />
        <span class="hidden flex-none xs:inline"> 如何使用 </span>
      </NuxtLink>
    </div>
    <div
      class="relative order-last flex basis-full justify-stretch gap-x-2 px-2 md:order-none md:basis-auto"
    >
      <ContributePoliticianSelect
        :onSelectPolitician="
          (politician) =>
            $router.push({ query: { ...$route.query, politician } })
        "
        :politician="route.query.politician?.toString()"
      />
      <ContributeTagSelect
        :onSelectTag="
          (tag) => $router.push({ query: { ...$route.query, tag } })
        "
        :tag="route.query.tag?.toString()"
      />
      <div
        v-if="!route.query.politician || !route.query.tag"
        class="absolute flex w-full items-center justify-center gap-1 pt-16 text-slate-400"
      >
        <InformationCircleIcon class="h-5 w-5 stroke-2" />
        請先選擇 '政治人物' 及 '標籤'
      </div>
    </div>
    <div class="flex gap-2 px-2">
      <ButtonPrimary
        :disabled="!route.query.politician || !route.query.tag"
        class="sm:hidden"
        :onClick="
          () => {
            toggleSection = toggleSection === 'editor' ? 'preview' : 'editor';
          }
        "
      >
        <ArrowsRightLeftIcon class="h-5 w-5 stroke-2" />
        <span> {{ toggleSection === 'editor' ? '預覽' : '編輯' }} </span>
      </ButtonPrimary>
      <ButtonPrimary
        :disabled="!route.query.politician || !route.query.tag"
        :onClick="() => setIsSubmitDialogOpen(true)"
      >
        <PaperAirplaneIcon class="h-5 w-5 stroke-2" />
        <span class="hidden sm:inline"> 完成編輯 </span>
      </ButtonPrimary>
    </div>
  </header>
  <main
    v-if="route.query.politician && route.query.tag"
    class="flex h-screen flex-1 gap-2 px-2 pb-2 pt-32 md:pt-16"
  >
    <div
      class="h-full flex-1 overflow-hidden rounded-md sm:block"
      :class="{
        hidden: toggleSection === 'preview',
      }"
    >
      <Codemirror
        v-model="editor"
        :style="{ height: '100%', fontSize: '1rem' }"
        :extensions="[markdown({ base: markdownLanguage }), oneDark]"
      ></Codemirror>
    </div>

    <div
      class="flex max-h-full flex-1 flex-col gap-2 overflow-y-auto pb-20 sm:flex"
      :class="{
        hidden: toggleSection === 'editor',
      }"
    >
      <div class="sticky top-0 z-10 mx-auto h-20 w-80 rounded-md shadow-md">
        <AppContentHeader :politician="route.query.politician as string" />
      </div>
      <div class="mx-auto h-min w-80 max-w-[20rem] shadow-md">
        <Card>
          <div class="w-rull flex h-full flex-col gap-4 p-4">
            <div
              class="space-between sticky top-20 z-10 flex rounded-md backdrop-blur"
            >
              <h2
                :id="`${route.query.politician}-${route.query.tag}`"
                class="anchor flex w-fit rounded-md bg-primary/20 px-2 py-1 text-xl font-bold"
              >
                {{ route.query.tag }}
              </h2>
              <div class="ml-auto flex gap-2 rounded-md p-2"></div>
            </div>
            <div
              class="prose-h4:text-md prose prose-slate prose-h2:text-base prose-h3:text-lg prose-a:text-blue-600"
              v-html="preview"
            ></div>
          </div>
        </Card>
      </div>
    </div>
  </main>
  <ContributeSubmitDialog />
</template>

<script setup lang="ts">
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';
import {
  PaperAirplaneIcon,
  QuestionMarkCircleIcon,
  InformationCircleIcon,
  ArrowsRightLeftIcon,
} from '@heroicons/vue/24/outline';
import { Codemirror } from 'vue-codemirror';

const toggleSection = ref<'editor' | 'preview'>('editor');

const editor = useContributeEditor();
const preview = useContributePreview();
const unedited = useContributeUnedited();

const route = useRoute();

watch(
  () => ({
    politician: route.query.politician,
    tag: route.query.tag,
  }),
  async (newQuery, oldQuery) => {
    if (!route.query.politician || !route.query.tag) {
      return;
    }

    const data = await $fetch<string>(`/api/get-content-md`, {
      params: {
        politician: route.query.politician,
        tag: route.query.tag,
      },
    });
    unedited.value = data;
    editor.value = data;
    if (oldQuery && oldQuery.tag !== newQuery.tag) {
      updatePreview();
    }
  },
  { immediate: true },
);

watch(editor, updatePreview);

async function updatePreview() {
  const file = await parse(
    route.query.politician as string,
    route.query.tag as string,
    editor.value,
    [
      'remark-parse',
      'remark-gfm',
      'remark-rehype',
      'rehype-add-anchor-class',
      'rehype-remove-id',
      'rehype-stringify',
    ],
  );

  preview.value = file.value.toString();
}

const isSubmitDialogOpen = useContributeSubmitDialog();
const setIsSubmitDialogOpen = (open: boolean) => {
  isSubmitDialogOpen.value = open;
};

definePageMeta({
  middleware: ['auth'],
});
</script>
