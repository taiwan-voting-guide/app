<template>
  <div class="flex h-full flex-col items-center justify-center">
    <h1 class="text-3xl font-extrabold text-slate-500">你目前沒有選擇任何人</h1>
    <p class="my-2 text-slate-500">
      點擊下方按鈕搜尋政治人物，並加入你的資訊牆。
    </p>
    <ButtonPrimary :onClick="setOpen">
      <div class="flex items-center">
        <MagnifyingGlassIcon class="mr-2 inline h-4 w-4" />
        搜尋政治人物
      </div>
    </ButtonPrimary>
  </div>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from "@heroicons/vue/24/solid";

const open = useShowPoliticianSearchDialog();

function setOpen() {
  open.value = true;
}
</script>
