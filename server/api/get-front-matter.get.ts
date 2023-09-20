import remarkFrontmatter from 'remark-frontmatter';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';
import { matter } from 'vfile-matter';

export default defineEventHandler(async (event) => {
  const { politician } = getQuery<{ politician: string }>(event);
  if (!politician) {
    throw createError({
      statusCode: 400,
      message: 'Missing politician',
    });
  }

  let md: string | null;
  const contentStorage = getContentStorage();
  try {
    md = await contentStorage.getItem(`politician/${politician}.md`);
  } catch (error) {
    throw createError({
      statusCode: 500,
    });
  }

  if (!md) {
    throw createError({
      statusCode: 404,
    });
  }

  const frontMatter = getFrontMatter(md);

  const file = await unified()
    .use(remarkParse)
    .use(remarkStringify)
    .use(remarkFrontmatter)
    .use(() => {
      return (_, file) => {
        matter(file);
      };
    })
    .process(frontMatter);

  return file.data.matter;
});

const getFrontMatter = (md: string): string => {
  if (!md.startsWith('---\n')) {
    return '';
  }

  const i = md.indexOf('\n---');
  if (i === -1) {
    return '';
  }

  return md.substring(0, i + 4);
};
