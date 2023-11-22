<template>
  <Card>
    <div class="relative p-4">
      <div class="absolute right-4 top-5 flex gap-2">
        <span v-if="collapsedTags.has(tag)" title="展開">
          <ChevronDoubleDownIcon
            @click="collapsedTags.delete(tag)"
            class="h-5 w-5 cursor-pointer stroke-2 text-slate-400"
          />
        </span>
        <span v-if="!collapsedTags.has(tag)" title="縮小">
          <ChevronDoubleUpIcon
            @click="collapsedTags.add(tag)"
            class="h-5 w-5 cursor-pointer stroke-2 text-slate-400"
          />
        </span>
        <span title="移除">
          <XMarkIcon
            @click="remove(tag)"
            class="h-5 w-5 cursor-pointer stroke-2 text-slate-400"
          />
        </span>
      </div>

      <div
        class="prose prose-slate"
        :class="{
          'hide-source': !showSource,
          'hide-author': !showAuthor,
          'h-7 overflow-hidden': collapsedTags.has(tag),
        }"
        v-if="data"
        v-html="data"
      ></div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import {
  XMarkIcon,
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
} from '@heroicons/vue/24/outline';

const { tag, politician } = defineProps<{
  tag: string;
  politician: string;
  showSource: boolean;
  showAuthor: boolean;
}>();

const { data } = await useFetch('/api/get-content?politician', {
  params: { politician: politician, tag: tag },
});

const { remove } = useSelectTag();
const collapsedTags = useTagCollapse();
</script>
