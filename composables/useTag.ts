import { ref } from "vue";

const tagsClicked = ref<Set<string>>(new Set([]));

export function useTag() {
  function toggleTag(tag: string): void {
    if (tagsClicked.value.has(tag)) {
      tagsClicked.value.delete(tag);
    } else {
      tagsClicked.value.add(tag);
    }
  }

  function isTagClicked(tag: string | undefined): boolean {
    if (!tag) {
      return false;
    }
    return tagsClicked.value.has(tag);
  }

  function getTags(): Array<string> {
    let arr: Array<string> = [];
    tagsClicked.value.forEach((v) => {
      arr = [...arr, v];
    });
    return arr;
  }

  return {
    toggleTag,
    isTagClicked,
    getTags,
  };
}
