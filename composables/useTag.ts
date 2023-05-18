import { ref } from "vue";

const tags = ref<Set<string>>(new Set([]));
const allTags = ref<Array<string>>([]);

export function useTag() {
  queryContent("tag")
    .findOne()
    .then((tagsContent) => {
      allTags.value = tagsContent.body.children[1].children.map(
        (tag: any) => tag.children[0].value
      );
    });

  function toggleTag(tag: string): void {
    if (tags.value.has(tag)) {
      tags.value.delete(tag);
    } else {
      tags.value.add(tag);
    }
  }

  function isTagActive(tag: string | undefined): boolean {
    if (!tag) {
      return false;
    }
    return tags.value.has(tag);
  }

  function getTags(): Array<string> {
    let arr: Array<string> = [];
    tags.value.forEach((v) => {
      arr = [...arr, v];
    });
    return arr;
  }

  return {
    allTags,
    getTags,
    toggleTag,
    isTagActive,
  };
}
