<template>
  <main
    v-if="userSession"
    class="flex w-full flex-1 justify-stretch bg-slate-200"
  >
    <div class="flex w-1/2 flex-1 flex-col gap-2 overflow-hidden">
      <div class="h-12 shrink-0">tool bar</div>
      <Codemirror
        v-model="editor"
        :style="{ height: 'calc(100vh - 6.5rem)', width: '100%' }"
        :extensions="[markdown({ base: markdownLanguage }), oneDark]"
      ></Codemirror>
    </div>

    <div class="flex w-1/2 flex-1 flex-col gap-2 p-2">
      <header
        class="flex w-full flex-none items-end justify-end gap-2 pr-1 pt-1"
      >
        <ButtonPrimary :onClick="openSubmitDialog">
          <PencilSquareIcon class="h-4 w-4" />
          完成編輯</ButtonPrimary
        >
      </header>
      <div class="flex flex-1 flex-col gap-[2px]">
        <div class="flex-none">
          <AppContentHeader :politician="route.query.politician as string" />
        </div>
        <Card>
          <div v-if="loading">loading...</div>
          <div v-html="preview"></div>
        </Card>
      </div>
    </div>
  </main>
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
  { immediate: true }
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
      ]
    );

    preview.value = file.value.toString();
  },
  { immediate: true }
);

const isSubmitDialogOpen = useContributeSubmitDialog();
const openSubmitDialog = () => (isSubmitDialogOpen.value = true);
</script>
