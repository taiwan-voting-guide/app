import { ref } from "vue";
import type { ParsedContent } from "@nuxt/content/dist/runtime/types";

const politicians = ref<Array<typeof Politician>>([]);
const politicianDataMap = ref<Map<string, ParsedContent>>(new Map());

export async function usePolitician(): Promise<{
  politicians: typeof politicians;
  removeAllPoliticians: () => void;
  removePolitician: (name: string) => void;
  appendPoliticians: (names: Array<string>) => Promise<void>;
  setPoliticians: (names: Array<string>) => Promise<void>;
}> {
  const { setPoliticianParams, navigate } = useSearchParams();

  if (politicians.value.length === 0) {
    const { $initialPoliticians } = useNuxtApp();
    await appendPoliticians($initialPoliticians());
  }

  async function appendPoliticians(names: Array<string>) {
    politicians.value.forEach((politician) => {
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

    if (updateNames.length > 0) {
      const dataList = await Promise.all(
        updateNames.map((name) =>
          queryContent<ParsedContent>("politician")
            .where({ title: name })
            .findOne()
        )
      );

      dataList.forEach((data) => {
        if (!data.title) {
          return;
        }

        politicianDataMap.value.set(data.title, data);
      });
    }

    names.forEach((name) => {
      const data = politicianDataMap.value.get(name);
      politicians.value.push({
        name,
        photoURL: data?.photoURL || "",
        contents: data ? createContent(data) : new Map(),
      });
    });
  }

  function removePolitician(name: string) {
    politicians.value = politicians.value.filter((politician) => {
      return politician.name !== name;
    });
  }

  function removeAllPoliticians(): void {
    politicians.value = [];
  }

  async function setPoliticians(names: Array<string>) {
    removeAllPoliticians();
    await appendPoliticians(names);

    setPoliticianParams(politicians.value.map((p) => p.name).join(","));
    navigate();
  }

  return {
    politicians,
    appendPoliticians,
    setPoliticians,
    removePolitician,
    removeAllPoliticians,
  };
}
