<template>
  <ClientOnly>
    <HeadlessDialog :open="isOpen" @close="onClose">
      <div class="fixed inset-0 z-40 bg-black/50" aria-hidden="true" />
      <div class="fixed inset-0 z-50 flex items-center justify-center">
        <HeadlessDialogPanel class="m-4 w-full max-w-md rounded bg-white p-2">
          <div class="flex items-center">
            <MagnifyingGlassIcon class="ml-2 h-6 w-6 text-slate-500" />
            <input
              v-model="searchText"
              placeholder="e.g. '2024_總統', '第八選區', '侯友宜'"
              type="search"
              class="ml-2 box-border h-10 w-full rounded border-primary bg-white px-2 placeholder:text-slate-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <ul class="mt-4 w-full rounded">
            <template v-if="results.length === 0">
              <li
                class="flex h-24 items-center justify-center p-2 font-bold text-slate-500"
              >
                沒有結果
              </li>
            </template>
            <template v-else>
              <li
                v-for="[group, ...politicians] in results"
                class="cursor-pointer rounded p-2 hover:bg-slate-100"
                @click="() => onClick(politicians)"
              >
                <span class="font-bold text-slate-500">
                  {{ group }}
                </span>
                <ol class="flex">
                  <li
                    class="mx-1 my-2 rounded bg-slate-200 px-2 text-slate-500"
                    v-for="politician in politicians"
                  >
                    {{ politician }}
                  </li>
                </ol>
              </li>
            </template>
          </ul>
        </HeadlessDialogPanel>
      </div>
    </HeadlessDialog>
  </ClientOnly>
</template>

<script setup lang="ts">
const { searchText, results } = useSearchPolitician();
const { set } = useSelectPolitician();
const isOpen = useShowPoliticianSearchDialog();
import { MagnifyingGlassIcon } from "@heroicons/vue/24/solid";

const onClose = () => {
  isOpen.value = false;
};

const onClick = async (politicians: Array<string>) => {
  set(politicians);
  searchText.value = "";
  isOpen.value = false;
};
</script>
