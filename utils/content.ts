import rehypeClassNames from 'rehype-class-names';
import rehypeMinifyAttributeWhitespace from 'rehype-minify-attribute-whitespace';
import rehypeMinifyWhitespace from 'rehype-minify-whitespace';
import rehypeStringify from 'rehype-stringify';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';
import { matter } from 'vfile-matter';

export const parse = async (content: string, pluginNames: string[]) => {
  const plugins = [];
  for (const name of pluginNames) {
    switch (name) {
      case 'remark-parse':
        plugins.push(remarkParse);
        break;
      case 'remark-gfm':
        plugins.push(remarkGfm);
        break;
      case 'remark-stringify':
        plugins.push(remarkStringify);
        break;
      case 'remark-frontmatter':
        plugins.push(remarkFrontmatter);
        plugins.push(() => {
          // @ts-ignore
          return (_, file) => {
            // @ts-ignore
            matter(file);
          };
        });
        break;
      case 'remark-rehype':
        plugins.push(remarkRehype);
        break;
      case 'rehype-class-names':
        plugins.push(rehypeClassNames, {
          h2: 'text-xl font-bold text-slate-500 underline underline-thickness-1',
          p: 'text-lg',
        });
        break;
      case 'rehype-stringify':
        plugins.push(rehypeStringify);
        break;
      case 'rehype-minify':
        plugins.push(rehypeMinifyWhitespace);
        plugins.push(rehypeMinifyAttributeWhitespace);
        break;
    }
  }
  return unified().use(plugins).process(content);
};
