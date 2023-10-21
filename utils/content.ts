import { Element } from 'hast';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeClassNames, { Options } from 'rehype-class-names';
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
import { Node } from 'unist';
import { visit } from 'unist-util-visit';
import { matter } from 'vfile-matter';

export const classNames: Options = {
  h2: 'pb-3 text-xl font-extrabold text-slate-700 underline decoration-primary decoration-4 underline-offset-4',
  h3: 'pb-3 font-extrabold text-slate-700 underline decoration-primary decoration-2  underline-offset-4',
  h4: 'pb-3 font-extrabold text-slate-700 underline decoration-primary decoration-2  underline-offset-4',

  p: 'text-slate-700',
  a: 'text-blue-500 underline',
  ul: 'group-ul list-disc pl-4',
  ol: 'group-ol list-decimal pl-4',
  li: 'text-slate-700 marker:text-primary',

  img: 'h-auto max-w-full rounded border',
  blockquote: 'rounded-md border-l-4 bg-slate-100 p-4 italic text-slate-500',
  hr: 'my-4 border-slate-100',

  pre: 'overflow-x-auto rounded bg-slate-700 p-4 text-white',
  code: 'px-1 rounded bg-slate-100 text-sm',

  table: 'w-full border border-slate-100',
  thead: 'bg-slate-100',
  td: 'border border-slate-100 p-2',
};

export const parse = async (
  politician: string,
  tag: string,
  content: string,
  pluginNames: string[],
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
