import { ref } from "vue";
import mixpanel from "mixpanel-browser";

const tags = ref<Set<string>>(new Set([]));
const activeTags = computed(() => Array.from(tags.value));
const allTags = ref<Array<string>>([]);

export async function useTag(initialTags: Array<string> = []): Promise<{
  allTags: typeof allTags;
  activeTags: typeof activeTags;
  toggleTag: (tag: string) => void;
  isTagActive: (tag: string | undefined) => boolean;
}> {
  const { setTagParams, navigate } = useSearchParams();
  const tagsContent = await queryContent("tag").findOne();
  tags.value = new Set(initialTags);

  allTags.value = tagsContent.body.children[1].children.map(
    (tag: any) => tag.children[0].value
  );

  function toggleTag(tag: string): void {
    if (tags.value.has(tag)) {
      tags.value.delete(tag);
    } else {
      mixpanel.track("Tag", { tag });
      tags.value.add(tag);
    }

    setTagParams(activeTags.value.join(","));
    navigate();
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
