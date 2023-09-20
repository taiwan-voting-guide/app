<template>
  <Card>
    <div class="flex items-center gap-4">
      <NuxtImg
        v-if="data?.photoURL"
        :src="data?.photoURL"
        :alt="politician"
        width="48"
        height="48"
        class="h-12 w-12 rounded-full object-cover object-top"
      />
      <div
        v-else
        class="h-12 w-12 animate-pulse rounded-full bg-slate-100"
      ></div>
      <h1 class="text-2xl font-extrabold text-slate-700">
        {{ politician }}
      </h1>
    </div>
  </Card>
</template>

<script setup lang="ts">
const props = defineProps<{
  politician: string;
}>();

type FrontMatter = {
  photoURL?: string;
};

const { data } = await useFetch<FrontMatter>('/api/get-front-matter', {
  params: { politician: props.politician },
});
</script>
