import { ref } from "vue";
import type { ParsedContent } from "@nuxt/content/dist/runtime/types";

const politicians = ref<Array<typeof Politician>>([]);
const politicianDataMap = ref<Map<string, ParsedContent>>(new Map());

export async function usePolitician(
  initialPoliticians: Array<string> = []
): Promise<{
  politicians: typeof politicians;
  removePolitician: (name: string) => void;
  appendPoliticians: (names: Array<string>) => Promise<void>;
}> {
  await appendPoliticians(initialPoliticians);

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
      const dataList = await queryContent<ParsedContent>()
        .where({ title: { $in: updateNames } })
        .find();

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

  return {
    politicians,
    removePolitician,
    appendPoliticians,
  };
}
