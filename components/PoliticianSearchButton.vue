<template>
  <button
    @click="onClick"
    class="flex rounded bg-primary px-4 py-2 text-white drop-shadow"
  >
    <MagnifyingGlassIcon class="mr-2 inline-block h-6 w-6" />
    搜尋政治人物
  </button>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from "@heroicons/vue/24/solid";

const open = useShowPoliticianSearchDialog();

function onClick() {
  open.value = true;
}
</script>
