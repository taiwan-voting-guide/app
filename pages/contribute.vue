<template>
  <div class="flex h-screen flex-col">
    <header class="sticky z-10 flex h-12 items-center justify-between pr-2">
      <Logo />
      <div class="flex flex-none gap-x-2">
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
      <ButtonPrimary :onClick="openSubmitDialog">
        <PencilSquareIcon class="h-4 w-4" />
        完成編輯</ButtonPrimary
      >
    </header>
    <main
      v-if="userSession && route.query.politician && route.query.tag"
      class="flex h-[calc(100vh-4rem)] w-full flex-1 gap-2 px-2 pb-2"
    >
      <div class="flex-1 overflow-y-scroll rounded">
        <Codemirror
          v-model="editor"
          :style="{ flex: '1 1 0%', height: '100%' }"
          :extensions="[markdown({ base: markdownLanguage }), oneDark]"
        ></Codemirror>
      </div>

      <div class="flex flex-1 flex-col">
        <Card>
          <div v-if="loading">loading...</div>
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

const route = useRoute();

const editor = useContributeEditor();
const preview = useContributePreview();
const loading = ref<boolean>(false);

console.log(route.query.politician, route.query.tag);

watch(
  () => `${route.query.politician}_${route.query.tag}`,
  async () => {
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
  },
  { immediate: true },
);

watch(
  editor,
  async () => {
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
  },
  { immediate: true },
);

const isSubmitDialogOpen = useContributeSubmitDialog();
const openSubmitDialog = () => (isSubmitDialogOpen.value = true);
//       <div class="flex-none p-2">
//         使用<a
//           class="text-blue-500 underline"
//           href="https://markdown.tw"
//           target="_blank"
//           rel="noopener noreferrer"
//           >Markdown</a
//         >語法來編輯這份內容。
//         <a href="https://markdown.tw" class="text-blue-500 underline"
//           >查看範例</a
//         >
//       </div>
</script>
