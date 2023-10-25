<template>
  <ClientOnly>
    <HeadlessDialog :open="isOpen" @close="closeDialog">
      <div class="fixed inset-0 z-20 bg-black/40" aria-hidden="true" />
      <div class="fixed inset-0 z-20 flex items-center justify-center">
        <HeadlessDialogPanel
          class="min-w-70 mx-auto w-72 rounded-md bg-white p-5 drop-shadow"
        >
          <form class="flex flex-col gap-4">
            <label>
              <span class="pl-2 text-sm after:text-red-500 after:content-['*']"
                >Email</span
              >
              <input
                disabled
                class="w-full rounded-md border-0 bg-slate-200 text-slate-400"
                type="email"
                :value="email"
              />
            </label>
            <label>
              <span class="pl-2 text-sm after:text-red-500 after:content-['*']"
                >貢獻者</span
              >

              <input
                class="w-full rounded-md border-0 bg-slate-200 focus:bg-white"
                :class="{ 'border border-red-500': error }"
                type="text"
                v-model="name"
              />
              <span class="pl-2 text-sm text-red-500" v-if="error">{{
                error
              }}</span>
            </label>

            <div class="flex justify-end gap-4">
              <ButtonInvisible :onClick="closeDialog">
                <XMarkIcon class="h-4 w-4" />
                取消
              </ButtonInvisible>
              <ButtonPrimary :disabled="loading" :onClick="submit">
                <ArrowPathIcon class="h-4 w-4 animate-spin" v-if="loading" />
                <PencilSquareIcon class="h-4 w-4" v-else />
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
  XMarkIcon,
} from '@heroicons/vue/24/outline';

const route = useRoute();
const isOpen = useContributeSubmitDialog();
const editor = useContributeEditor();
const loading = ref(false);

function closeDialog() {
  isOpen.value = false;
}

const error = ref('');

const email = useUserEmail();
const name = useUserName();

async function submit() {
  const editorTrimed = editor.value.trim();
  const nameTrimed = name.value.trim();

  loading.value = true;
  if (!nameTrimed) {
    error.value = '請輸入貢獻者名稱';
    return;
  }

  const { url } = await $fetch<{ url: string }>('/api/submit-content', {
    method: 'POST',
    body: {
      politician: route.params.politician,
      tag: route.params.tag,
      name: nameTrimed,
      content: editorTrimed,
    },
  });

  navigateTo(url, { external: true });
}
</script>
