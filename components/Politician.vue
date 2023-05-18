<template>
  <div
    class="m-2 flex flex-1 flex-col items-center rounded-md bg-[#F9F9F9] px-2 py-2"
  >
    <img
      :src="data.imageURL"
      class="h-32 w-32 rounded-full object-scale-down object-center"
      :alt="name"
    />
    <h1 class="mt-4 text-center text-2xl font-bold">{{ name }}</h1>
  </div>
</template>

<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content/dist/runtime/types";

const { name, data } = defineProps<{
  data?: ParsedContent;
  name: string;
}>();

const { getTags } = useTag();

if (data === undefined) {
  throw new Error("data is undefined");
}

const contents: Ref<Map<string, ParsedContent>> = ref(createContent(data));
</script>
