export const removeTag = (tags: Array<string>, tag: string) => {
  return tags.filter((t) => t !== tag);
};

export const appendTag = (tags: Array<string>, tag: string) => {
  return [...tags, tag];
};
