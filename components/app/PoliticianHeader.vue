<template>
  <Card>
    <div class="flex items-center gap-4">
      <NuxtImg
        v-if="frontMatter?.photoURL"
        :src="frontMatter?.photoURL"
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

const frontMatter = ref<FrontMatter>({});

watch(
  () => props.politician,
  async () => {
    if (!props.politician) {
      return;
    }

    const { data } = await useFetch<FrontMatter>(
      () => `/api/get-front-matter`,
      { params: { politician: props.politician } }
    );

    if (!data.value) {
      return;
    }
    frontMatter.value = data.value;
  },
  { immediate: true }
);
</script>
