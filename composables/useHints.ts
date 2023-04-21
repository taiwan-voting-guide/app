import { ref } from "vue";

const hintsClicked = ref<Set<string>>(new Set());

export function useHints() {
  function toggleHint(hint: string): void {
    if (hintsClicked.value.has(hint)) {
      hintsClicked.value.delete(hint);
    } else {
      hintsClicked.value.add(hint);
    }
  }

  function isHintClicked(hint: string | undefined): boolean {
    if (!hint) {
      return false;
    }
    return hintsClicked.value.has(hint);
  }

  function getHints(): Array<string> {
    let arr: Array<string> = [];
    hintsClicked.value.forEach((v) => {
      arr = [...arr, v];
    });
    return arr;
  }

  return {
    toggleHint,
    isHintClicked,
    getHints,
  };
}
