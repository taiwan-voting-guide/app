import { parse } from '@/utils/content';

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

  const file = await parse(frontMatter, [
    'remark-parse',
    'remark-stringify',
    'remark-frontmatter',
  ]);

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
