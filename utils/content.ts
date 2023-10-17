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
  h2: 'underline decoration-primary/80 underline-offset-4 decoration-4 text-lg text-slate-500 font-bold pt-4 pb-2 first:pt-0',
  h3: 'text-slate-500 font-bold pt-1',
  a: 'underline text-primary/80 hover:text-primary',
  ol: 'list-inside list-decimal',
  ul: 'list-inside list-disc',
  table: 'w-full border-collapse border border-slate-300',
  th: 'border border-slate-300 text-slate-500 bg-slate-100 p-2',
  td: 'border border-slate-300 p-2',
};

export const parse = async (
  politician: string,
  tag: string,
  content: string,
  pluginNames: string[]
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
          footnoteBackContent: '🔙',
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

              console.log(element);

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
