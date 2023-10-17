import { parse } from '@/utils/content';

export default defineEventHandler(async (event) => {
  const { politician, tag } = getQuery<{ politician: string; tag: string }>(
    event
  );
  if (!politician || !tag) {
    throw createError({
      statusCode: 400,
      message: 'Missing politician or tag',
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

  const contentMd = extractContent(md, tag);

  const file = await parse(politician, tag, contentMd, [
    'remark-parse',
    'remark-gfm',
    'remark-rehype',
    'rehype-class-names',
    'rehype-anchor-links',
    'rehype-minify',
    'rehype-stringify',
  ]);

  return file.value;
});
