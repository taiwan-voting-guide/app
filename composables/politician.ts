import type { ParsedContent } from "@nuxt/content/dist/runtime/types";

type Politician = {
  name: string;
  photoURL: string;
  contents: Map<string, ParsedContent>;
};

export function useSelectPolitician() {
  const politicianNames = useState<Array<string>>(
    "selected_politician_names",
    () => []
  );
  const politicians = computed<Array<Politician>>(() => {
    return politicianNames.value.map((name) => {
      const data = contentMap.value.get(name);
      return {
        name,
        photoURL: data?.photoURL || "",
        contents: data ? createContent(data) : new Map(),
      };
    });
  });
  const contentMap = useState<Map<string, ParsedContent>>(
    "politician_content_map",
    () => new Map<string, ParsedContent>()
  );
  const loading = useState<boolean>("loading_politician_content", () => true);

  const getUncachedNames = (names: Array<string>) =>
    names.filter((name) => !contentMap.value.has(name));

  const updateContent = async (names: Array<string>) => {
    return Promise.all(
      names.map((name) =>
        queryContent("politician").where({ title: name }).findOne()
      )
    ).then((contentList) => {
      contentList.forEach((content) => {
        if (!content.title) {
          return;
        }

        contentMap.value.set(content.title, content);
      });
    });
  };

  const remove = (name: string) => {
    politicianNames.value = politicianNames.value.filter((selected) => {
      return selected !== name;
    });
  };

  const removeAll = (): void => {
    politicianNames.value = [];
  };

  async function set(names: Array<string>) {
    if (
      names.length === politicianNames.value.length &&
      names.every((name, i) => name === politicianNames.value[i])
    ) {
      return;
    }

    if (names.length === 0) {
      politicianNames.value = [];
    }

    const uncachedNames = getUncachedNames(names);
    let promise = Promise.resolve();
    if (uncachedNames.length !== 0) {
      loading.value = true;
      promise = updateContent(uncachedNames);
    }

    promise.then(() => {
      politicianNames.value = names;
      loading.value = false;
    });
  }

  return {
    politicians,
    politicianNames,
    loading,
    set,
    remove,
    removeAll,
  };
}

export const useSearchPolitician = () => {
  const searchText = useState<string>("search_politician_text", () => "");
  const results = computed(() => {
    const keywords = searchText.value.trim().replace(/\s+/g, " ").split(" ");

    const { $allSearchPoliticianResults } = useNuxtApp();
    const results: Array<Array<string>> = [];
    $allSearchPoliticianResults.forEach((value, key) => {
      for (const keyword of keywords) {
        if (key.includes(keyword)) {
          results.push(value);
          break;
        }
      }
    });

    return results;
  });

  return { searchText, results };
};
