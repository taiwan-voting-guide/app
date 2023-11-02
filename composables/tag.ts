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

  const toggle = (tag: string) => {
    if (tagSet.value.has(tag)) {
      tags.value = tags.value.filter((t) => t !== tag);
    } else {
      tags.value = [...tags.value, tag];
    }
  };

  const set = (newTags: Array<string>) => {
    tags.value = newTags;
  };

  const inject = (injectedTags: Array<string>, position: number) => {
    const left = injectedTags
      .slice(0, position)
      .filter((t) => !tagSet.value.has(t));
    const right = injectedTags
      .slice(position)
      .filter((t) => !tagSet.value.has(t));
    tags.value = [...left, ...tags.value, ...right];
  };

  return { tags, tagSet, toggle, set, inject };
};
