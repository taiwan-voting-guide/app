import type { ParsedContent } from "@nuxt/content/dist/runtime/types";

type Politician = {
  name: string;
  photoURL: string;
  contents: Map<string, ParsedContent>;
};

export function useSelectPolitician() {
  const { $initialPoliticians, $allPoliticianNames } = useNuxtApp();
  const politicians = useState<Politician[]>("selected_politicians", () => []);

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

  const append = (names: Array<string>) => {
    names = names.filter((name) => $allPoliticianNames.has(name));

    politicians.value.forEach((politician) => {
      if (names.includes(politician.name)) {
        names.splice(names.indexOf(politician.name), 1);
      }
    });

    const updateNames: Array<string> = [];
    names.forEach((name) => {
      if (!contentMap.value.has(name)) {
        updateNames.push(name);
      }
    });

    if (updateNames.length === 0) {
      return;
    }

    const uncachedNames = getUncachedNames(names);
    let promise = Promise.resolve();
    if (uncachedNames.length !== 0) {
      loading.value = true;
      promise = updateContent(updateNames);
    }

    promise.then(() => {
      names.forEach((name) => {
        const data = contentMap.value.get(name);
        politicians.value.push({
          name,
          photoURL: data?.photoURL || "",
          contents: data ? createContent(data) : new Map(),
        });
      });
      loading.value = false;
    });
  };

  const remove = (name: string) => {
    politicians.value = politicians.value.filter((politician) => {
      return politician.name !== name;
    });
  };

  const removeAll = (): void => {
    politicians.value = [];
  };

  async function set(names: Array<string>) {
    names = names.filter((name) => $allPoliticianNames.has(name));

    const selectedNames = politicians.value.map(
      (politician) => politician.name
    );
    if (
      names.length === selectedNames.length &&
      names.every((name, i) => name === selectedNames[i])
    ) {
      return;
    }

    if (names.length === 0) {
      politicians.value = [];
    }

    const uncachedNames = getUncachedNames(names);
    let promise = Promise.resolve();
    if (uncachedNames.length !== 0) {
      loading.value = true;
      promise = updateContent(uncachedNames);
    }

    promise.then(() => {
      politicians.value = names.map((name) => {
        const data = contentMap.value.get(name);
        return {
          name,
          photoURL: data?.photoURL || "",
          contents: data ? createContent(data) : new Map(),
        };
      });
      loading.value = false;
    });
  }

  const politicianNames = computed(() => {
    return politicians.value.map((politician) => politician.name);
  });

  set($initialPoliticians);

  return {
    politicians,
    politicianNames,
    loading,
    set,
    append,
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
