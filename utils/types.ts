import type { ParsedContent } from "@nuxt/content/dist/runtime/types";

declare module "#app" {
  interface NuxtApp {
    $allTags(): Array<string>;
    $initialTags(): Array<string>;
    $politiciansParamStr(): string;
    $initialPoliticians(): Array<string>;
    $allSearchPoliticianResults(): Map<string, Array<string>>;
  }
}

interface Politician {
  name: string;
  photoURL: string;
  contents: Contents;
}

type Contents = Map<string, ParsedContent>;

export { Politician, Contents };
