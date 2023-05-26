<template>
  <input
    v-model="searchText"
    placeholder="搜尋"
    type="search"
    class="box-border h-8 w-full rounded border-primary bg-white px-2 text-sm placeholder:text-slate-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";

const searchText = ref("");
</script>
