<template>
  <ClientOnly>
    <HeadlessDialog :open="isOpen" @close="closeDialog">
      <div class="fixed inset-0 z-10 bg-black/50" aria-hidden="true" />
      <div class="fixed inset-0 z-10 flex items-center justify-center">
        <HeadlessDialogPanel class="w-80 rounded-md bg-white p-4 drop-shadow">
          <form class="flex flex-col gap-4">
            <label>
              <span>Email</span>
              <input
                disabled
                class="w-full rounded-md border-0 bg-slate-100 text-sm text-slate-400"
                type="email"
                :value="email"
              />
            </label>
            <label>
              <span class="after:text-red-500 after:content-['*']">貢獻者</span>

              <input
                class="w-full rounded-md border-0 bg-slate-100 text-sm"
                :class="{ 'border border-red-500': error }"
                type="text"
                v-model="name"
              />
              <div
                v-if="error"
                class="flex items-center gap-1 pt-1 text-red-500"
              >
                <ExclamationTriangleIcon class="h-4 w-4" v-if="error" />
                {{ error }}
              </div>
            </label>

            <div class="flex justify-end gap-4">
              <ButtonInvisible :onClick="closeDialog"> 取消 </ButtonInvisible>
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
  ExclamationTriangleIcon,
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
      politician: route.query.politician,
      tag: route.query.tag,
      name: nameTrimed,
      content: editorTrimed,
    },
  });

  navigateTo(url, { external: true });
}
</script>
