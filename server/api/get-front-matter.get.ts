import { parseMarkdown } from '@/utils/content';

export default defineEventHandler(async (event) => {
  const { politician } = getQuery<{ politician: string }>(event);
  if (!politician) {
    throw createError({
      statusCode: 400,
      message: 'Missing politician',
    });
  }

  let md: string | null = null;
  try {
    const contentStorage = getContentStorage();
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

  const { data } = await parseMarkdown('', frontMatter);

  return data;
});

function getFrontMatter(md: string): string {
  if (!md.startsWith('---\n')) {
    return '';
  }

  const i = md.indexOf('\n---');
  if (i === -1) {
    return '';
  }

  return md.substring(0, i + 4);
}
