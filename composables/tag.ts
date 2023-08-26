const useTags = () => useState<Array<string>>('selected_tags', () => []);
const useTagSet = () => computed(() => new Set(useTags().value));

export function useSelectTag() {
  const tags = useTags();
  const tagSet = useTagSet();

  const toggle = (tag: string) => {
    if (tagSet.value.has(tag)) {
      tags.value = removeTag(tags.value, tag);
    } else {
      tags.value = appendTag(tags.value, tag);
    }
  };

  const set = (newTags: Array<string>) => {
    tags.value = newTags;
  };

  return { tags, tagSet, toggle, set };
}
