import { ParsedContent } from "@nuxt/content/dist/runtime/types";

const groups = ref<Map<string, Array<string>>>(new Map());

export async function useGroups() {
  if (!groups.value.size) {
    const content = await queryContent<ParsedContent>(
      "group",
      "groups"
    ).findOne();

    for (const [key, value] of Object.entries(content)) {
      if (key === "title" || key.startsWith("_")) {
        continue;
      }

      groups.value.set(key, value);
    }
  }

  return {
    groups,
  };
}
