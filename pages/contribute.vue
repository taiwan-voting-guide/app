<template>
  <div class="flex h-full w-full flex-col bg-slate-200">
    <main class="flex w-full flex-1 justify-stretch overflow-auto">
      <div class="flex w-1/2 flex-1 flex-col gap-2 overflow-hidden">
        <div class="h-12">tool bar</div>
        <textarea
          class="h-full w-full resize-none border-0 bg-slate-800 font-mono tracking-wide text-slate-50 focus:ring-0"
          v-model="editor"
        ></textarea>
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
            <AppPoliticianHeader :politician="politician" />
          </div>
          <Card>
            <div v-if="loading">loading...</div>
            <div v-html="preview"></div>
          </Card>
        </div>
      </div>
    </main>
  </div>
  <ContributeSubmitDialog />
</template>

<script setup lang="ts">
import { PencilSquareIcon } from '@heroicons/vue/24/outline';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

const userSession = useCookie('user_session');
if (!userSession.value) {
  navigateTo('/login');
}

const politician = useContributePolitician();
const tag = useContributeTag();

const editor = useContributeEditor();
const preview = useContributePreview();
const loading = ref<boolean>(false);

const route = useRoute();

watch([politician, tag], async () => {
  if (!userSession.value) {
    return;
  }

  loading.value = true;
  const { data } = await useFetch<string>(
    `/api/get-content-md?politician=${politician.value}&tag=${tag.value}`
  );

  if (!data.value) {
    return;
  }

  editor.value = data.value.substring(`## ${tag.value}\n\n`.length);
  loading.value = false;
});

watch([editor, loading], async () => {
  if (!userSession.value) {
    return;
  }

  if (loading.value) {
    return;
  }

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(`## ${tag.value}\n\n${editor.value}`);

  preview.value = file.value.toString();
});

onUpdated(() => {
  politician.value = route.query.politician as string;
  tag.value = route.query.tag as string;
});

onMounted(() => {
  politician.value = route.query.politician as string;
  tag.value = route.query.tag as string;
});

onUnmounted(() => {
  editor.value = '';
  preview.value = '';
});

const isSubmitDialogOpen = useShowEditorSubmitDialog();

const openSubmitDialog = () => (isSubmitDialogOpen.value = true);
</script>
