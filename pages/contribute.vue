<template>
  <div v-if="userSession" class="flex h-screen flex-col">
    <header class="flex h-14 items-center justify-between p-3">
      <Logo />
      <div class="flex gap-x-2">
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
      </div>
      <ButtonPrimary :onClick="() => setIsSubmitDialogOpen(true)">
        <PencilSquareIcon class="h-4 w-4" />
        完成編輯</ButtonPrimary
      >
    </header>
    <main
      v-if="route.query.politician && route.query.tag"
      class="flex h-[calc(100vh-4rem)] flex-1 gap-3 px-3 pb-3"
    >
      <div class="h-full flex-1 overflow-hidden rounded-md">
        <Codemirror
          v-model="editor"
          :style="{ height: '100%' }"
          :extensions="[markdown({ base: markdownLanguage }), oneDark]"
        ></Codemirror>
      </div>

      <div class="flex flex-1 flex-col">
        <Card>
          <div v-html="preview"></div>
        </Card>
      </div>
    </main>
  </div>
  <ContributeSubmitDialog />
</template>

<script setup lang="ts">
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';
import { PencilSquareIcon } from '@heroicons/vue/24/outline';
import { Codemirror } from 'vue-codemirror';

const userSession = useCookie('user_session');
if (!userSession.value) {
  navigateTo('/login');
}

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
</script>
