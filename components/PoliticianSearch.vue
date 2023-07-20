<template>
  <div class="z-30 w-full bg-slate-100 p-2">
    <div class="relative">
      <input
        v-model="searchText"
        placeholder="搜尋"
        type="search"
        class="box-border h-8 w-full rounded border-primary bg-white px-2 text-sm placeholder:text-slate-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <ul
        v-if="searchText"
        class="absolute mt-2 w-full rounded bg-white shadow-md"
      >
        <template v-if="groups.length === 0">
          <li class="p-2">沒有結果</li>
        </template>
        <template v-else>
          <li
            v-for="[group, ...politicians] in groups"
            class="my-2 cursor-pointer px-2 hover:bg-slate-100"
            :onClick="() => onClick(politicians)"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const { searchGroups } = await useGroups();
const { setPoliticians } = await usePolitician();

const searchText = ref();

const groups = computed(() => {
  if (!searchText.value) {
    return [];
  }

  return searchGroups(searchText.value.trim().replace(/\s+/g, " ").split(" "));
});

const onClick = async (politicians: Array<string>) => {
  await setPoliticians(politicians);
  searchText.value = "";
};
</script>
