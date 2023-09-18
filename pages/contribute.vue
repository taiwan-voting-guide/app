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
  const { data } = await useFetch<{ content: string }>(
    `/api/get-content-md?politician=${politician.value}`
  );

  if (!data.value) {
    return;
  }

  editor.value = getTagSection(data.value.content, tag.value);
  loading.value = false;
});

watch([editor, loading], async () => {
  if (!userSession.value) {
    return;
  }

  if (loading.value) {
    return;
  }

  preview.value = await parseMarkdown(
    `${politician.value}-${tag.value}`,
    `## ${tag.value}\n\n${editor.value}`
  );
});

onUpdated(() => {
  politician.value = route.query.politician as string;
  tag.value = route.query.tag as string;
});

onMounted(() => {
  politician.value = route.query.politician as string;
  tag.value = route.query.tag as string;
});

const isSubmitDialogOpen = useShowEditorSubmitDialog();

function openSubmitDialog() {
  isSubmitDialogOpen.value = true;
}
</script>
