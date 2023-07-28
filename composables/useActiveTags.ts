export const useActiveTags = () => {
  const { $initialTags } = useNuxtApp();
  const activeTags = useState<Array<string>>("active_tags", () =>
    $initialTags()
  );
  const activeTagSet = computed(() => new Set(activeTags.value));

  const toggleTag = (tag: string) => {
    if (activeTagSet.value.has(tag)) {
      activeTags.value = removeTag(activeTags.value, tag);
    } else {
      activeTags.value = appendTag(activeTags.value, tag);
    }
  };

  const isTagActive = (tag: string) => {
    return activeTagSet.value.has(tag);
  };

  return { activeTags, activeTagSet, toggleTag, isTagActive };
};
