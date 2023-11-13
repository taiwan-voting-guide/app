import { type Element, type ElementContent, type Text } from 'hast';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeClassNames, { type Options } from 'rehype-class-names';
import rehypeMinifyAttributeWhitespace from 'rehype-minify-attribute-whitespace';
import rehypeMinifyWhitespace from 'rehype-minify-whitespace';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';
import { type Node } from 'unist';
import { visit } from 'unist-util-visit';
import { matter } from 'vfile-matter';

export type Blame = {
  line: number;
  hash: string;
  email: string;
  timestamp: number;
};

export const classNames: Options = {
  h2: 'group relative text-xl font-bold underline decoration-primary decoration-4 underline-offset-4',
  h3: 'group relative text-lg font-bold underline decoration-primary decoration-2 underline-offset-4',
  h4: 'group relative text-md font-bold underline decoration-primary decoration-2 underline-offset-4',

  p: 'group relative',
  a: 'text-blue-600',
  ul: '',
  ol: '',
  li: 'group relative',

  img: '',
  blockquote: '',
  hr: '',

  pre: 'relative overflow-visible',
  code: 'group relative',

  th: 'group relative',
  td: 'group relative',
};

export const parse = async (
  politician: string,
  tag: string,
  content: string,
  pluginNames: string[],
  options: { [pluginNames: string]: any } = {},
) => {
  const key = `${politician}-${tag}`;
  const parser = unified();
  for (const name of pluginNames) {
    switch (name) {
      case 'remark-parse':
        parser.use(remarkParse);
        break;
      case 'remark-gfm':
        parser.use(remarkGfm);
        break;
      case 'remark-stringify':
        parser.use(remarkStringify);
        break;
      case 'remark-lines':
        parser.use(() => {
          return (tree: Node) => {
            visit(tree, '', (node: Node) => {
              node.data = {
                hProperties: {
                  dataLines:
                    generateDataLines(
                      node.position?.start.line,
                      node.position?.end?.line,
                      options['remark-lines'].startingLine - 1,
                    ) || undefined,
                },
              };
            });
          };
        });
      case 'remark-frontmatter':
        parser.use(remarkFrontmatter);
        parser.use(() => {
          return (_, file) => {
            matter(file);
          };
        });
        break;
      case 'remark-rehype':
        parser.use(remarkRehype, {
          clobberPrefix: `${key}-`,
          footnoteLabel: '資料來源',
          footnoteLabelTagName: 'h2',
          footnoteBackLabel: '返回',
        });
        parser.use(() => {
          return (tree: Node) => {
            visit(tree, 'element', (element: Element) => {
              if (element.tagName !== 'li') {
                return;
              }

              const id = element.properties?.id as string;
              if (!id?.startsWith(`${key}-fn-`)) {
                return;
              }

              const e = element.children[1];
              if (!(e.type === 'element' && e.tagName === 'p')) {
                return;
              }

              element.children = e.children;
            });
          };
        });

        break;
      case 'rehype-blames':
        parser.use(() => {
          return (tree: Node) => {
            visit(tree, 'element', (element: Element) => {
              const dedupedBlameSet = new Set<string>();
              const blameMap = options['rehype-blames'].blameMap;
              const contributorMap = options['rehype-blames'].contributorMap;
              switch (element.tagName) {
                case 'p':
                case 'h3':
                case 'h4':
                case 'h6':
                case 'li':
                case 'code':
                case 'th':
                case 'td': {
                  if (!element.properties?.dataLines) {
                    return;
                  }

                  const lineStr = element.properties.dataLines as string;
                  const [startingLineStr, endingLineStr] = lineStr.split(',');
                  const startingLine = Number(startingLineStr);
                  const endingLine = Number(endingLineStr);
                  const blames: Array<Blame> = [];

                  for (let i = startingLine; i <= endingLine; i++) {
                    const blame = blameMap.get(i);
                    if (!blame) {
                      continue;
                    }

                    if (dedupedBlameSet.has(blame.email)) {
                      continue;
                    }

                    blames.push(blame);
                    dedupedBlameSet.add(blame.email);
                  }

                  element.children.push(
                    Elem(
                      'p-0 left-0 opacity-0 h-0 group-hover:h-fit w-0 invisible group-hover:p-3 group-hover:visible absolute bottom-full group-hover:opacity-100 group-hover:w-max overflow-hidden transition-[opacity,width] delay-500 z-50 text-md text-[16px] text-slate-600 tracking-normal font-sans font-normal rounded-lg bg-slate-50 shadow',
                      [
                        Elem('block w-max', [
                          Elem('block font-bold', [Txt('貢獻者')]),
                          ...blames.map(({ email }) => {
                            const contributor = contributorMap.get(email);

                            return Elem('block flex gap-2', [
                              Elem('block flex-none flex items-center', [
                                Img(
                                  `contributor/${email}.webp`,
                                  contributor.name || '',
                                  'm-0 p-0 w-8 h-8 gap-1 rounded-full bg-primary/50 ',
                                  `this.onerror=null;this.src='/default-contributor.svg'`,
                                ),
                              ]),
                              Elem('block flex-none flex flex-col text-sm', [
                                Elem('block', [Txt(contributor.name || '')]),
                                Elem('block', [Txt(email || '')]),
                              ]),
                            ]);
                          }),
                        ]),
                      ],
                    ),
                  );

                  break;
                }
              }
            });
          };
        });

      case 'rehype-class-names':
        // @ts-ignore
        parser.use(rehypeClassNames, classNames);
        break;
      case 'rehype-stringify':
        parser.use(rehypeStringify);
        break;
      case 'rehype-anchor-links':
        parser.use(rehypeSlug);
        parser.use(() => {
          return (tree: Node) => {
            visit(tree, 'element', (element: Element) => {
              if (
                !(
                  element.tagName === 'h2' &&
                  element.properties.id === 'footnote-label'
                )
              ) {
                return;
              }

              delete element.properties.id;
            });
          };
        });
        parser.use(rehypeAutolinkHeadings, {
          behavior: 'wrap',
        });
        break;
      case 'rehype-minify':
        parser.use(rehypeMinifyWhitespace);
        parser.use(rehypeMinifyAttributeWhitespace);
        break;
    }
  }
  return parser.process(content);
};

function generateDataLines(
  startingLine?: number,
  endingLine?: number,
  offset: number = 0,
): string {
  if (!startingLine || !endingLine) {
    return '';
  }

  return `${(startingLine + offset).toString()},${(
    endingLine + offset
  ).toString()}`;
}

function Elem(classProp: string, children: Array<ElementContent>): Element {
  return {
    type: 'element',
    tagName: 'span',
    properties: {
      class: classProp,
    },
    children,
  };
}

function Img(
  src: string,
  alt: string,
  classProp: string,
  onerror: string,
): Element {
  return {
    type: 'element',
    tagName: 'img',
    properties: {
      src,
      alt,
      onerror,
      class: classProp,
    },
    children: [],
  };
}

function Txt(value: string): Text {
  return {
    type: 'text',
    value,
  };
}
