<template>
  <div class="flex w-full h-full flex-col bg-slate-100 p-4">
    <main class="flex-1 flex justify-stretch w-full gap-4 overflow-auto">
      <div
        class="border-primary border flex flex-col flex-1 w-1/2 overflow-auto"
      >
        <div class="h-8">123</div>
        <div ref="editorElRef" class="h-full"></div>
      </div>
      <div class="flex gap-2 flex-col flex-1 w-1/2 h-full overflow-scroll">
        <header
          class="flex-none w-full px-2 justify-end flex items-end flex-col gap-2"
        >
          <ButtonPrimary :onClick="openSubmitDialog">
            <PencilSquareIcon class="w-4 h-4" />
            完成編輯</ButtonPrimary
          >
        </header>
        <Card>
          <div v-if="loading">loading...</div>
          <ContentRenderer v-else :value="preview">
            <template #empty> </template>
          </ContentRenderer>
        </Card>
      </div>
    </main>
  </div>
  <ContributeSubmitDialog />
</template>

<script setup lang="ts">
import { PencilSquareIcon } from '@heroicons/vue/24/outline';

/* @ts-ignore */
import markdown from '@nuxt/content/transformers/markdown';

const userSession = useCookie('user_session');
if (!userSession.value) {
  navigateTo('/login');
}

const monaco = useMonaco()!;
const editorElRef = ref();

const politician = useContributePolitician();
const tag = useContributeTag();
const editor = useContributeEditor();
const preview = useContributePreview();
const loading = ref<boolean>(false);

const route = useRoute();

watchEffect(async () => {
  if (!userSession.value) {
    return;
  }

  if (!politician.value || !tag.value) {
    return;
  }

  loading.value = true;
  const { data } = await useFetch<{ content: string }>(
    `/api/get-content?politician=${politician.value}`
  );

  if (!data.value) {
    return;
  }

  editor.value = getTagSection(data.value.content, tag.value);
  monaco.editor.getEditors()[0].setValue(editor.value);
  loading.value = false;
});

watchEffect(async () => {
  if (!userSession.value) {
    return;
  }

  preview.value = await markdown.parse(politician.value, editor.value, {});
});

onUpdated(() => {
  politician.value = route.query.politician as string;
  tag.value = route.query.tag as string;
});

onMounted(() => {
  const e = monaco.editor.create(editorElRef.value, {
    language: 'markdown',
    theme: 'vs-dark',
    automaticLayout: true,
    minimap: {
      enabled: false,
    },
  });

  e.onDidChangeModelContent(() => {
    editor.value = e.getValue();
  });

  politician.value = route.query.politician as string;
  tag.value = route.query.tag as string;
});

onUnmounted(() => {
  editor.value = '';
  preview.value = {
    body: [],
    _id: '',
  };
  monaco.editor.getEditors().forEach((e) => e.dispose());
});

const isSubmitDialogOpen = useShowEditorSubmitDialog();

function openSubmitDialog() {
  isSubmitDialogOpen.value = true;
}
</script>