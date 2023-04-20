<template>
  <div class="m-4 flex-none rounded-lg bg-slate-100 px-8 py-4">
    <img
      :src="candidate.imageURL"
      class="h-32 w-32 rounded-full border-2 border-primary object-scale-down object-center"
      :alt="candidate.name"
    />
    <h1 class="mt-4 text-center text-2xl font-bold">{{ candidate.name }}</h1>
    <section v-for="content in contents" :key="content.body.title">
      <h2 class="mt-4 font-bold text-primary">{{ content.title }}</h2>
      <ContentRenderer :value="content">
        <ContentRendererMarkdown :value="content" />
      </ContentRenderer>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content/dist/runtime/types";

const { candidate } = defineProps<{
  candidate: {
    name: string;
    imageURL: string;
  };
}>();

const { data } = await useAsyncData(`content-${candidate.name}`, () =>
  queryContent<ParsedContent>().where({ title: candidate.name }).findOne()
);

console.log(data.value?.body);

const contents: Ref<Array<ParsedContent>> = ref([]);
let newContent: ParsedContent | undefined;

data.value?.body.children.forEach((child: any, i: number, arr: Array<any>) => {
  if (child.tag === "h2") {
    if (newContent) {
      contents.value.push(newContent);
    }

    newContent = {
      _id: "",
      title: child.children[0].value,
      body: {
        type: "root",
        children: [],
      },
    };
  } else if (newContent) {
    newContent.body.children.push(child);
  }

  if (i === arr.length - 1 && newContent) {
    contents.value.push(newContent);
  }
});
</script>
