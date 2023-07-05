import { ref } from "vue";

const tagStr = ref<string>("");
const politicianStr = ref<string>("");

export function useSearchParams(): {
  setTagParams: (str: string) => void;
  setPoliticianParams: (str: string) => void;
  setParams: (tagStr: string, politicianStr: string) => void;
  navigate: () => void;
} {
  function setParams(tagStr: string, politicianStr: string) {
    setTagParams(tagStr);
    setPoliticianParams(politicianStr);
  }

  function setTagParams(str: string) {
    tagStr.value = str;
  }

  function setPoliticianParams(str: string) {
    politicianStr.value = str;
  }

  function navigate() {
    const query: { tags?: string; politicians?: string } = {};
    if (tagStr.value) {
      query.tags = tagStr.value;
    }
    if (politicianStr.value) {
      query.politicians = politicianStr.value;
    }
    navigateTo({ query });
  }

  return {
    setTagParams,
    setPoliticianParams,
    setParams,
    navigate,
  };
}