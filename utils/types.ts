import type { ParsedContent } from "@nuxt/content/dist/runtime/types";

declare module "#app" {
  interface NuxtApp {
    $data: Array<ParsedContent>;
    $docs: Array<ParsedContent>;
    $allTags: Array<string>;
    $allPoliticianNames: Set<string>;
    $allSearchPoliticianResults: Map<string, Array<string>>;
  }
}

export {};
