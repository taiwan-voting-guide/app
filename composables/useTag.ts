import { ref } from "vue";
import mixpanel from "mixpanel-browser";

const tags = ref<Set<string> | null>(null);
const activeTags = computed<Array<string>>(() =>
  tags.value !== null ? Array.from(tags.value) : []
);

export async function useTag(): Promise<{
  tags: typeof activeTags;
  toggleTag: (tag: string) => void;
  isTagActive: (tag: string) => boolean;
}> {
  const { setTagParams, navigate } = useSearchParams();
  if (tags.value === null) {
    const { $initialTags } = useNuxtApp();
    tags.value = new Set($initialTags());
  }

  function toggleTag(tag: string): void {
    if (tags.value === null) {
      return;
    }

    if (tags.value.has(tag)) {
      tags.value.delete(tag);
    } else {
      mixpanel.track("Tag", { tag });
      tags.value.add(tag);
    }

    setTagParams(activeTags.value.join(","));
    navigate();
  }

  function isTagActive(tag: string): boolean {
    if (tags.value === null) {
      return false;
    }

    return tags.value.has(tag);
  }

  return {
    tags: activeTags,
    toggleTag,
    isTagActive,
  };
}
