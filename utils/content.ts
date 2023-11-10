import { type Element } from 'hast';
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

export const classNames: Options = {
  h2: 'group relative pb-3 text-xl font-bold underline decoration-primary decoration-4 underline-offset-4',
  h3: 'group relative pb-3 font-bold underline decoration-primary decoration-2 underline-offset-4',
  h4: 'group relative pb-3 font-bold underline decoration-primary decoration-2 underline-offset-4',

  p: 'group relative',
  a: 'text-blue-600 underline',
  ul: 'group-ul list-disc pl-4',
  ol: 'group-ol list-decimal pl-4',
  li: 'group relative marker:text-primary',

  img: 'group relative h-auto max-w-full rounded border',
  blockquote: 'rounded-md border-l-4 bg-slate-100 p-4 italic text-slate-500',
  hr: 'group relative my-4 border-slate-100',

  pre: 'group relative rounded bg-slate-700 p-4 text-white',
  code: 'group relative px-1 rounded bg-slate-100 text-sm',

  table: 'w-full border border-slate-100',
  thead: 'bg-slate-100',
  td: 'group relative border border-slate-100 p-2',
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
                      options['remark-lines'].startingLine,
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
          footnoteLabelProperties: {
            class:
              'pt-4 underline decoration-primary/80 underline-offset-4 decoration-4 text-lg text-slate-500 font-bold pb-2',
          },
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
                  const [startingLine, endingLine] = lineStr.split(',');
                  const blames: Array<{
                    line: number;
                    email: string;
                    timestamp: number;
                  }> = [];

                  for (
                    let i = Number(startingLine);
                    i <= Number(endingLine);
                    i++
                  ) {
                    blames.push(options['rehype-blames'].blames.get(i));
                  }

                  element.children.push({
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      class:
                        'py-20 absolute bottom-full invisible group-hover:visible  z-50 block opacity-0 group-hover:opacity-100 bg-primary transition-opacity delay-500',
                    },
                    children: blames.map((blame) => ({
                      type: 'text',
                      value: blame ? blame.email : '',
                    })),
                  });

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
