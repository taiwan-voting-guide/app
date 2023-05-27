import { ref } from "vue";

const tags = ref<Set<string>>(new Set([]));
const activeTags = computed(() => Array.from(tags.value));
const allTags = ref<Array<string>>([]);

export async function useTag(): Promise<{
  allTags: typeof allTags;
  activeTags: typeof activeTags;
  toggleTag: (tag: string) => void;
  isTagActive: (tag: string | undefined) => boolean;
}> {
  const tagsContent = await queryContent("tag").findOne();

  allTags.value = tagsContent.body.children[1].children.map(
    (tag: any) => tag.children[0].value
  );

  function toggleTag(tag: string): void {
    if (tags.value.has(tag)) {
      tags.value.delete(tag);
    } else {
      tags.value.add(tag);
    }
  }

  function isTagActive(tag: string | undefined): boolean {
    if (!tag) {
      return false;
    }
    return tags.value.has(tag);
  }

  return {
    allTags,
    activeTags,
    toggleTag,
    isTagActive,
  };
}
