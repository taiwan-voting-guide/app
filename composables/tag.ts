const useTags = () =>
  useState<Array<string>>('selected_tags', () => {
    const url = useRequestURL();
    const tagParam = url.searchParams.get('tags') || '';
    const initialTags = tagParam ? tagParam.split(',') : [];
    // TODO: validate tags
    return initialTags;
  });

const useTagSet = () => computed(() => new Set(useTags().value));

export const useSelectTag = () => {
  const tags = useTags();
  const tagSet = useTagSet();

  const set = (newTags: Array<string>) => {
    tags.value = newTags;
  };

  const remove = (tag: string) => {
    tags.value = tags.value.filter((t) => t !== tag);
  };

  const append = (tag: string) => {
    if (tagSet.value.has(tag)) {
      return;
    }

    tags.value = [...tags.value, tag];
  };

  return { tags, tagSet, set, remove, append };
};
