<template>
  <AppHeader />
  <ul class="flex w-fit min-w-full px-10 pt-20">
    <template v-for="n in politicians.length * 2 + 1" :key="n">
      <li v-if="n % 2 === 0" class="w-80 flex-none">
        <AppContentHeader :politician="politicians[(n - 2) / 2]" />
      </li>
      <li v-else class="flex-none first:ml-auto last:mr-auto">
        {{ n }}
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/24/outline';

// fetch app data
const { data } = await getAppData();
const allTags = data.value?.tags || [];

const { politicians } = useSelectPolitician();
const { tags, toggle, tagSet } = useSelectTag();

watch([tags, politicians], () => {
  const query: { tags?: string; politicians?: string } = {};

  const tagParam = tags.value.join(',');
  if (tagParam) {
    query.tags = tagParam;
  }

  const politicianParam = politicians.value.join(',');
  if (politicianParam) {
    query.politicians = politicianParam;
  }

  navigateTo({ query });
});

const searchText = ref<string>('');
const filterTags = computed(() =>
  searchText.value
    ? allTags.filter((tag) => tag.includes(searchText.value))
    : allTags,
);

const showTagDialog = useTagDialog();
const toggleTagDialog = () => {
  showTagDialog.value = !showTagDialog.value;
};

const showPoliticianDialog = usePoliticianDialog();
</script>
