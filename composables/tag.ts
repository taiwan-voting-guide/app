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

  const inject = (injectedTags: Array<string>, position: number): number => {
    const left = tags.value.slice(0, position);
    const originalLeftLength = left.length;
    const newLeft = left.filter((t) => !injectedTags.includes(t));
    const right = tags.value
      .slice(position)
      .filter((t) => !injectedTags.includes(t));
    tags.value = [...newLeft, ...injectedTags, ...right];
    return originalLeftLength - newLeft.length;
  };

  return { tags, tagSet, toggle, set, inject };
};
