<template>
  <main class="w-full grid grid-cols-2 gap-1">
    <MonacoEditor
      :options="option"
      class="h-full bg-slate-100"
      v-model="editor"
      lang="markdown"
    />
    <ContentRenderer :value="preview">
      <template #empty>
        <p>No content found.</p>
      </template>
    </ContentRenderer>
  </main>
</template>

<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types';

/* @ts-ignore */
import markdown from '@nuxt/content/transformers/markdown';

const politician = useState<string>('contribute_politician', () => '');
const tag = useState<string>('contribute_tag', () => '');

const route = useRoute();
if (route.query.politician) {
  politician.value = route.query.politician as string;
}
if (route.query.tag) {
  tag.value = route.query.tag as string;
}

const editor = useState<string>('contribute_editor', () => '');
const preview = useState<ParsedContent>('contribute_preview', () => ({
  body: [],
  _id: '',
}));

watchEffect(async () => {
  const { data } = await useFetch<{ content: string }>(
    `/api/get-content?politician=${politician.value}`
  );
  if (!data.value) {
    return;
  }

  editor.value = data.value.content;
});

watchEffect(async () => {
  preview.value = await markdown.parse(politician.value, editor.value, {});
});

const option = {
  theme: 'vs-dark',
  automaticLayout: true,
  minimap: {
    enabled: false,
  },
};
</script>
