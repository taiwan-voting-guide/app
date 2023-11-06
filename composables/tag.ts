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

  const remove = (tag: string): number => {
    const index = tags.value.indexOf(tag);
    tags.value = tags.value.filter((t) => t !== tag);
    return index;
  };

  const inject = (tag: string, position: number): number => {
    const index = tags.value.indexOf(tag);
    const shift = position > index ? 1 : 0;
    const left = tags.value.slice(0, position).filter((t) => t !== tag);
    const right = tags.value.slice(position).filter((t) => t !== tag);
    tags.value = [...left, tag, ...right];
    return shift;
  };

  return { tags, tagSet, toggle, set, remove, inject };
};
