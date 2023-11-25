import { type Element, type ElementContent, type Text } from 'hast';
import rehypeMinifyAttributeWhitespace from 'rehype-minify-attribute-whitespace';
import rehypeMinifyWhitespace from 'rehype-minify-whitespace';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';
import { type Node } from 'unist';
import { visit } from 'unist-util-visit';

export type Blame = {
  line: number;
  hash: string;
  email: string;
  timestamp: number;
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
      case 'remark-rehype':
        parser.use(remarkRehype, {
          clobberPrefix: `${key}-`,
          footnoteLabel: '資料來源',
          footnoteLabelTagName: 'h3',
          footnoteBackLabel: '返回',
          footnoteLabelProperties: {
            className: 'text-slate-600 mt-0',
          },
        });

        // remove p in li in footnotes
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
      case 'rehype-add-anchor-class':
        parser.use(() => {
          return (tree: Node) => {
            visit(tree, 'element', (element: Element) => {
              const { id } = element.properties;
              const idStr = (id as string) || '';
              if (!idStr.startsWith(`${key}-`)) {
                return;
              }

              const className = ['anchor'];

              if (idStr.startsWith(`${key}-fn-`)) {
                className.push('fn');
              }

              if (idStr.startsWith(`${key}-fnref-`)) {
                className.push('fnref');
              }

              element.properties = {
                ...element.properties,
                className,
              };
            });
          };
        });
        break;
      case 'rehype-remove-id':
        parser.use(() => {
          return (tree: Node) => {
            visit(tree, 'element', (element: Element) => {
              element.properties = {
                ...element.properties,
                id: undefined,
              };
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
                case 'h5':
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
                      'span',
                      'block author p-3 m-0 w-full text-md text-slate-600 font-normal rounded-md bg-primary/20',
                      [
                        Elem('span', '', [
                          Elem('span', 'font-bold', [Txt('貢獻者')]),
                          ...blames.map(({ email }) => {
                            const contributor = contributorMap.get(email);

                            return Elem('span', 'flex gap-2', [
                              Elem('span', 'flex-none flex items-center', [
                                Img(
                                  `contributor/${email}.webp`,
                                  contributor.name || '',
                                  'm-0 p-0 w-8 h-8 gap-1 rounded-full bg-primary/50 ',
                                  `this.onerror=null;this.src='/placeholder.svg'`,
                                ),
                              ]),
                              Elem('span', 'flex-none flex flex-col text-sm', [
                                Elem('span', '', [
                                  Txt(contributor.name || ''),
                                  Txt(' '),
                                  contributor.isVerified
                                    ? Elem(
                                        'span',
                                        'text-lime-600',
                                        [Txt('✓')],
                                        { title: '已驗證' },
                                      )
                                    : Txt(''),
                                ]),
                                Elem('span', '', [Txt(email || '')]),
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
        break;
      case 'rehype-stringify':
        parser.use(rehypeStringify);
        break;
      case 'rehype-anchor-links':
        parser.use(rehypeSlug);
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

function Elem(
  tagName: string,
  classProp: string,
  children: Array<ElementContent>,
  properties?: { [key: string]: string | number | boolean },
): Element {
  return {
    type: 'element',
    tagName,
    properties: {
      class: classProp || undefined,
      ...properties,
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
