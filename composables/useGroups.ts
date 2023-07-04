import { ParsedContent } from "@nuxt/content/dist/runtime/types";

const groups = ref<Map<string, Array<string>>>(new Map());

export async function useGroups() {
  if (groups.value.size === 0) {
    const content = await queryContent<ParsedContent>(
      "group",
      "groups"
    ).findOne();

    for (const [group, politicians] of Object.entries(content)) {
      if (group === "title" || group.startsWith("_")) {
        continue;
      }

      const key = `${group}_${politicians.join("_")}`;
      const value = [group, ...politicians];

      groups.value.set(key, value);
    }
  }

  function searchGroups(keywords: Array<string>): Array<Array<string>> {
    const results: Array<Array<string>> = [];

    groups.value.forEach((value, key) => {
      for (const keyword of keywords) {
        if (key.includes(keyword)) {
          results.push(value);
          break;
        }
      }
    });

    return results;
  }

  return {
    searchGroups,
  };
}
