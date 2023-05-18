import type { ParsedContent } from "@nuxt/content/dist/runtime/types";

interface Politician {
  name: string;
  photoURL: string;
  contents: Contents;
}

type Contents = Map<string, ParsedContent>;

export { Politician, Contents };
