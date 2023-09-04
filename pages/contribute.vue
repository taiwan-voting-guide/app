<template>
  <div class="flex w-full h-full flex-col bg-slate-100 p-4">
    <header class="flex-none w-full h-36">123</header>
    <main class="flex-1 flex justify-stretch w-full gap-4 overflow-auto">
      <div
        class="border-primary border flex flex-col flex-1 w-1/2 overflow-auto"
      >
        <div class="h-8">123</div>
        <div ref="editorElRef" class="h-full"></div>
      </div>
      <div class="flex flex-1 w-1/2 h-full overflow-scroll p-2">
        <Card>
          <ContentRenderer :value="preview">
            <template #empty>
              <p>No content found.</p>
            </template>
          </ContentRenderer>
        </Card>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types';

/* @ts-ignore */
import markdown from '@nuxt/content/transformers/markdown';

const monaco = useMonaco()!;
const editorElRef = ref();

const politician = useState<string>('contribute_politician', () => '');
const tag = useState<string>('contribute_tag', () => '');
const editor = useState<string>('contribute_editor', () => '');
const preview = useState<ParsedContent>('contribute_preview', () => ({
  body: [],
  _id: '',
}));

const route = useRoute();

watchEffect(async () => {
  if (!politician.value || !tag.value) {
    return;
  }

  const { data } = await useFetch<{ content: string }>(
    `/api/get-content?politician=${politician.value}`
  );

  if (!data.value) {
    return;
  }

  editor.value = getTagSection(data.value.content, tag.value);
  monaco.editor.getEditors()[0].setValue(editor.value);
});

watchEffect(async () => {
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
  monaco.editor.getEditors().forEach((e) => e.dispose());
});
</script>
