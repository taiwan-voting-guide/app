declare module "#app" {
  interface NuxtApp {
    $allTags: Array<string>;
    $allPoliticianNames: Set<string>;
    $allSearchPoliticianResults: Map<string, Array<string>>;
  }
}

export {};
