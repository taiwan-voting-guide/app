import type { ParsedContent } from "@nuxt/content/dist/runtime/types";

export function useActivePoliticians() {
  const { $initialPoliticians } = useNuxtApp();
  const activePoliticians = useState<Array<typeof Politician>>(
    "active_politicians",
    () => []
  );

  const politicianDataMap = useState<Map<string, ParsedContent>>(
    "politician_data_set",
    () => new Map<string, ParsedContent>()
  );
  const loading = useState<boolean>("loading_politicians", () => true);

  const getUncachedNames = (names: Array<string>) =>
    names.filter((name) => !politicianDataMap.value.has(name));

  const updatePoliticianData = async (names: Array<string>) => {
    return Promise.all(
      names.map((name) =>
        queryContent("politician").where({ title: name }).findOne()
      )
    ).then((dataList) => {
      dataList.forEach((data) => {
        if (!data.title) {
          return;
        }

        politicianDataMap.value.set(data.title, data);
      });
    });
  };

  const appendPoliticians = (names: Array<string>) => {
    activePoliticians.value.forEach((politician) => {
      if (names.includes(politician.name)) {
        names.splice(names.indexOf(politician.name), 1);
      }
    });

    const updateNames: Array<string> = [];
    names.forEach((name) => {
      if (!politicianDataMap.value.has(name)) {
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
      promise = updatePoliticianData(updateNames);
    }

    promise.then(() => {
      names.forEach((name) => {
        const data = politicianDataMap.value.get(name);
        activePoliticians.value.push({
          name,
          photoURL: data?.photoURL || "",
          contents: data ? createContent(data) : new Map(),
        });
      });
      loading.value = false;
    });
  };

  const removePolitician = (name: string) => {
    activePoliticians.value = activePoliticians.value.filter((politician) => {
      return politician.name !== name;
    });
  };

  const removeAllPoliticians = (): void => {
    activePoliticians.value = [];
  };

  async function setPoliticians(names: Array<string>) {
    const activeNames = activePoliticians.value.map(
      (politician) => politician.name
    );
    if (
      names.length === activeNames.length &&
      names.every((name, i) => name === activeNames[i])
    ) {
      return;
    }

    if (names.length === 0) {
      activePoliticians.value = [];
    }

    const uncachedNames = getUncachedNames(names);
    let promise = Promise.resolve();
    if (uncachedNames.length !== 0) {
      loading.value = true;
      promise = updatePoliticianData(uncachedNames);
    }

    promise.then(() => {
      activePoliticians.value = names.map((name) => {
        const data = politicianDataMap.value.get(name);
        return {
          name,
          photoURL: data?.photoURL || "",
          contents: data ? createContent(data) : new Map(),
        };
      });
      loading.value = false;
    });
  }

  appendPoliticians($initialPoliticians());

  return {
    activePoliticians,
    appendPoliticians,
    removePolitician,
    removeAllPoliticians,
    setPoliticians,
    loading,
  };
}
