<template>
  <div class="m-4 flex-none rounded-lg bg-slate-100 px-8 py-4">
    <img
      :src="candidate.imageURL"
      class="h-32 w-32 rounded-full border-2 border-primary object-scale-down object-center"
      :alt="candidate.name"
    />
    <h1 class="mt-4 text-center text-2xl font-bold">{{ candidate.name }}</h1>
    <section v-for="hint in getHints()" :key="hint">
      <h2 class="mt-4 font-bold text-primary">{{ hint }}</h2>
      <ContentRenderer>
        <ContentRendererMarkdown
          v-if="contents.get(hint)"
          :value="contents.get(hint) || {}"
        />
      </ContentRenderer>
      <div v-if="!contents.has(hint)">目前沒有資料</div>
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

const { isHintClicked, getHints } = useHints();

const contents: Ref<Map<string, ParsedContent>> = ref(new Map());
let newContent: ParsedContent | undefined;

data.value?.body.children.forEach((child: any, i: number, arr: Array<any>) => {
  if (child.tag === "h2") {
    if (newContent && newContent.title) {
      contents.value.set(newContent.title, newContent);
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

  if (i === arr.length - 1 && newContent && newContent.title) {
    contents.value.set(newContent.title, newContent);
  }
});
</script>
