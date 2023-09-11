<template>
  <ClientOnly>
    <HeadlessDialog :open="isOpen" @close="closeDialog">
      <div class="fixed inset-0 z-20 bg-black/40" aria-hidden="true" />
      <div class="fixed inset-0 z-20 flex items-center justify-center">
        <HeadlessDialogPanel
          class="mx-auto w-72 min-w-70 rounded-md bg-white p-3 drop-shadow"
        >
          <form class="flex flex-col gap-4">
            <label>
              <span class="m-1 text-sm after:text-red-500 after:content-['*']"
                >Email</span
              >
              <input
                disabled
                class="w-full bg-slate-200 border-0 rounded-md text-slate-400"
                type="email"
                :value="email"
              />
            </label>
            <label>
              <span class="m-1 text-sm after:text-red-500 after:content-['*']"
                >貢獻者</span
              >
              <input
                class="w-full border-0 bg-slate-200 rounded-md focus:bg-white"
                type="text"
                v-model="name"
              />
            </label>

            <div class="flex justify-end gap-4">
              <Button :onClick="closeDialog">
                <XCircleIcon class="w-4 h-4" />
                取消
              </Button>
              <ButtonPrimary :disabled="loading" :onClick="submit">
                <ArrowPathIcon class="w-4 h-4 animate-spin" v-if="loading" />
                <PencilSquareIcon class="w-4 h-4" v-else />
                確認送出
              </ButtonPrimary>
            </div>
          </form>
        </HeadlessDialogPanel>
      </div>
    </HeadlessDialog>
  </ClientOnly>
</template>

<script setup lang="ts">
import {
  ArrowPathIcon,
  PencilSquareIcon,
  XCircleIcon,
} from '@heroicons/vue/24/outline';

const isOpen = useShowEditorSubmitDialog();
const politician = useContributePolitician();
const tag = useContributeTag();
const editor = useContributeEditor();
const loading = ref(false);

function closeDialog() {
  isOpen.value = false;
}

const email = useUserEmail();
const name = useUserName();

async function submit() {
  loading.value = true;
  const { url } = await $fetch<{ url: string }>('/api/submit-content', {
    method: 'POST',
    body: {
      politician: politician.value,
      tag: tag.value,
      name: name.value,
      content: editor.value,
    },
  });

  navigateTo(url, { external: true });
}
</script>
