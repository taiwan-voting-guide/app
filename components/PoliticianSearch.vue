<template>
  <div class="sticky top-0 z-20 bg-slate-100 p-2">
    <div class="relative">
      <input
        v-model="searchText"
        placeholder="搜尋 (還不能用)"
        type="search"
        class="box-border h-8 w-full rounded border-primary bg-white px-2 text-sm placeholder:text-slate-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <ul
        v-if="searchText"
        class="absolute mt-2 w-full rounded bg-white shadow-lg"
      >
        <li v-for="group in groups" class="m-2">
          {{ group }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const { groups } = await useGroups();

const searchText = ref();
</script>
