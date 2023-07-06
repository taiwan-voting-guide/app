import type { ParsedContent } from "@nuxt/content/dist/runtime/types";

declare module "#app" {
  interface NuxtApp {
    $allTags(): Array<string>;
    $tagsParamStr(): string;
    $politiciansParamStr(): string;
    $initialTags(): Array<string>;
    $initialPoliticians(): Array<string>;
  }
}

interface Politician {
  name: string;
  photoURL: string;
  contents: Contents;
}

type Contents = Map<string, ParsedContent>;

export { Politician, Contents };
