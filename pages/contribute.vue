<template>
  <Header>
    <div class="flex">
      <Logo />
      <NuxtLink
        to="/docs/introduction"
        class="ease flex min-w-max items-center gap-1 rounded-md px-3 py-1 font-bold text-slate-500"
      >
        <QuestionMarkCircleIcon class="h-5 w-5 stroke-2" />
        如何使用
      </NuxtLink>
    </div>
    <div class="relative flex gap-x-2">
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
        選擇要編輯的 '政治人物' 及 '標籤'
      </div>
    </div>
    <div class="pr-2">
      <ButtonPrimary
        :disabled="!route.query.politician || !route.query.tag"
        :onClick="() => setIsSubmitDialogOpen(true)"
      >
        <PencilSquareIcon class="h-5 w-5" />
        完成編輯</ButtonPrimary
      >
    </div>
  </Header>
  <main
    v-if="route.query.politician && route.query.tag"
    class="flex h-screen flex-1 gap-3 px-3 pb-3 pt-20"
  >
    <div class="h-full flex-1 overflow-hidden rounded-md">
      <Codemirror
        v-model="editor"
        :style="{ height: '100%' }"
        :extensions="[markdown({ base: markdownLanguage }), oneDark]"
      ></Codemirror>
    </div>

    <div class="flex max-h-full flex-1 justify-center overflow-y-auto py-12">
      <div class="h-min w-80 max-w-[20rem]">
        <Card>
          <div class="p-4" v-html="preview"></div>
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
  PencilSquareIcon,
  QuestionMarkCircleIcon,
  InformationCircleIcon,
} from '@heroicons/vue/24/outline';
import { Codemirror } from 'vue-codemirror';

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
    [
      'remark-parse',
      'remark-gfm',
      'remark-rehype',
      'rehype-class-names',
      'rehype-anchor-links',
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
