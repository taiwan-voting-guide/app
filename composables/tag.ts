export function useSelectTag() {
  const { $initialTags } = useNuxtApp();
  const tags = useState<Array<string>>("selected_tags", () => $initialTags);
  const selectedSet = computed(() => new Set(tags.value));

  const toggle = (tag: string) => {
    if (selectedSet.value.has(tag)) {
      tags.value = removeTag(tags.value, tag);
    } else {
      tags.value = appendTag(tags.value, tag);
    }
  };

  const isSelected = (tag: string) => {
    return selectedSet.value.has(tag);
  };

  return { tags, toggle, isSelected };
}
