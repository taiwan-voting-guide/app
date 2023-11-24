<template>
  <header
    class="fixed inset-x-0 top-0 z-30 flex flex-wrap items-center justify-between gap-2 bg-slate-100/80 py-2 backdrop-blur md:flex-nowrap"
  >
    <div class="flex">
      <Logo />
      <NuxtLink
        title="如何使用"
        to="/docs/introduction"
        class="flex flex-none items-center gap-1 rounded-md px-2 text-slate-400 hover:text-slate-600"
      >
        <QuestionMarkCircleIcon class="h-5 w-5 stroke-2" />
        <span class="hidden flex-none lg:inline"> 如何使用 </span>
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
        class="absolute flex w-full items-center justify-center gap-1 pt-16 font-bold text-slate-400"
      >
        <InformationCircleIcon class="h-5 w-5 stroke-2" />
        選擇 '政治人物' 及 '資料標籤'
      </div>
    </div>
    <div class="flex gap-2 pr-2">
      <ButtonPrimary
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
    class="flex h-screen flex-1 gap-3 px-3 pb-3 pt-28 md:pt-16"
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
      class="flex max-h-full flex-1 flex-col gap-4 overflow-y-auto pb-20 sm:flex"
      :class="{
        hidden: toggleSection === 'editor',
      }"
    >
      <div class="sticky top-0 z-10 mx-auto h-20 w-80">
        <AppContentHeader :politician="route.query.politician as string" />
      </div>
      <div class="mx-auto h-min w-80 max-w-[20rem]">
        <Card>
          <div
            class="prose prose-slate p-4 prose-h2:text-base prose-h3:text-lg prose-a:text-blue-600"
            v-html="preview"
          ></div>
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

    editor.value = data.substring(`## ${route.query.tag}\n\n`.length);
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
    `## ${route.query.tag}\n\n${editor.value}`,
    ['remark-parse', 'remark-gfm', 'remark-rehype', 'rehype-stringify'],
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
