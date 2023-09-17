import { parseMarkdown } from '@/utils/content';

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

  const tagContent = getTagContent(md, tag);
  const data = parseMarkdown(`${politician}-${tag}`, tagContent);
  return data;
});

function getTagContent(content: string, tag: string): string {
  const title = `## ${tag}`;
  const start = content.indexOf(title);
  if (start === -1) {
    return '';
  }

  const contentStart = start + title.length;
  const contentEnd = content.indexOf('\n## ', contentStart);
  if (contentEnd === -1) {
    return content.substring(start).trim();
  }

  return content.substring(start, contentEnd).trim();
}
