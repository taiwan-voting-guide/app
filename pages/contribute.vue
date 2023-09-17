<template>
  <div class="flex h-full w-full flex-col bg-slate-200">
    <main class="flex w-full flex-1 justify-stretch overflow-auto">
      <div class="flex w-1/2 flex-1 flex-col gap-2 overflow-hidden">
        <div class="h-12">tool bar</div>
        <div ref="editorElRef" class="flex-1 overflow-hidden"></div>
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
            <AppPoliticianHeader photoURL="/asdf.png" :name="politician" />
          </div>
          <Card>
            <div v-if="loading">loading...</div>
            <ContentRenderer v-else :value="preview">
              <template #empty> </template>
            </ContentRenderer>
          </Card>
        </div>
      </div>
    </main>
  </div>
  <ContributeSubmitDialog />
</template>

<script setup lang="ts">
import { PencilSquareIcon } from '@heroicons/vue/24/outline';
import { parseMarkdown } from '@nuxtjs/mdc/dist/runtime';

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

  preview.value = {
    _id: '',
    ...(await parseMarkdown(editor.value, {
      rehype: {
        plugins: {
          footnoteTooltip: {
            instance: footnoteTooltip,
          },
        },
      },
    })),
  };
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
