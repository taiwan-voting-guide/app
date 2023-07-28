import type { ParsedContent } from "@nuxt/content/dist/runtime/types";

function createContent(
  parsedContent: ParsedContent
): Map<string, ParsedContent> {
  const contents: Map<string, ParsedContent> = new Map();
  let newContent: ParsedContent | undefined;

  parsedContent.body.children.forEach(
    (child: any, i: number, arr: Array<any>) => {
      if (child.tag === "h2") {
        if (newContent && newContent.title) {
          contents.set(newContent.title, newContent);
        }

        newContent = {
          _id: "",
          title: child.children[0].value,
          body: {
            type: "root",
            children: [],
          },
        };
      } else if (newContent) {
        newContent.body.children.push(child);
      }

      if (i === arr.length - 1 && newContent && newContent.title) {
        contents.set(newContent.title, newContent);
      }
    }
  );

  return contents;
}

export { createContent };
