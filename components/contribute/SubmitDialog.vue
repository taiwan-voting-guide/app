<template>
  <ClientOnly>
    <HeadlessDialog :open="isOpen" @close="closeDialog">
      <div
        class="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur"
        aria-hidden="true"
      />
      <div class="fixed inset-0 z-40 flex items-center justify-center">
        <HeadlessDialogPanel
          v-if="!contentChanged"
          class="flex w-80 flex-col gap-2 rounded-md bg-white p-4 text-center font-bold shadow"
        >
          <div class="flex items-center justify-center">
            <ExclamationTriangleIcon class="h-5 w-5 stroke-2 text-yellow-600" />
            <p>內容並未更新</p>
          </div>
        </HeadlessDialogPanel>
        <HeadlessDialogPanel
          v-else-if="prUrl"
          class="flex w-80 flex-col gap-2 rounded-md bg-white p-4 text-center font-bold shadow"
        >
          <div class="flex items-center justify-center">
            <p>已成功送出審核！</p>
            <CheckCircleIcon class="h-5 w-5 stroke-2 text-lime-600" />
          </div>
          <div class="flex items-center justify-center">
            <p>有任何問題我們將透過email聯絡你</p>
          </div>

          <a
            :href="prUrl"
            target="_blank"
            class="flex h-10 items-center justify-center gap-1 rounded-md bg-primary/30 px-3 py-2 font-bold hover:bg-primary/40"
          >
            <LinkIcon class="h-5 w-5 stroke-2" /> 查看審查狀態
          </a>
        </HeadlessDialogPanel>
        <HeadlessDialogPanel v-else class="w-80 rounded-md bg-white p-4 shadow">
          <form class="flex flex-col gap-4">
            <label>
              <span>Email</span>
              <input
                disabled
                class="w-full rounded-md border-0 bg-slate-100 text-slate-400"
                type="email"
                :value="email"
              />
            </label>
            <label>
              <span class="after:text-red-500 after:content-['*']">貢獻者</span>

              <input
                class="w-full rounded-md border-0 bg-slate-100"
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
  LinkIcon,
} from '@heroicons/vue/24/outline';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/vue/24/solid';

const route = useRoute();
const isOpen = useContributeSubmitDialog();
const editor = useContributeEditor();
const unedited = useContributeUnedited();
const loading = ref(false);
const prUrl = ref('');

const contentChanged = computed(
  () => editor.value.trim() !== unedited.value.trim(),
);

function closeDialog() {
  isOpen.value = false;
}

const error = ref('');

const email = useUserEmail();
const name = useUserName();

async function submit() {
  const editorTrimed = editor.value.trim();
  const nameTrimed = name.value.trim();

  if (!nameTrimed) {
    error.value = '請輸入貢獻者名稱';
    return;
  }

  loading.value = true;

  const { url } = await $fetch<{ url: string }>('/api/submit-content', {
    method: 'POST',
    body: {
      politician: route.query.politician,
      tag: route.query.tag,
      name: nameTrimed,
      content: editorTrimed,
    },
  });

  prUrl.value = url;
}
</script>
