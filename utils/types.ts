declare module "#app" {
  interface NuxtApp {
    $allTags: Array<string>;
    $initialTags: Array<string>;
    $allPoliticianNames: Set<string>;
    $initialPoliticians: Array<string>;
    $allSearchPoliticianResults: Map<string, Array<string>>;
  }
}

export {};
