import { parse } from '@/utils/content';

export default defineEventHandler(async (event) => {
  const { name } = getQuery<{ name: string }>(event);
  if (!name) {
    throw createError({
      statusCode: 400,
      message: 'Missing doc name',
    });
  }

  let doc: string | null = null;
  const contentStorage = getContentStorage();
  try {
    doc = await contentStorage.getItem(`docs/${name}.md`);
  } catch (error) {
    throw createError({
      statusCode: 500,
    });
  }

  if (!doc) {
    throw createError({
      statusCode: 404,
    });
  }

  const html = await parse(
    '',
    '',
    doc,
    [
      'remark-parse',
      'remark-rehype',
      'rehype-anchor-links',
      'rehype-minify',
      'rehype-stringify',
    ],
    {
      'remark-rehype': {
        allowDangerousHtml: true,
      },
      'rehype-stringify': {
        allowDangerousHtml: true,
      },
    },
  ).then(({ value }) => {
    return value.toString();
  });

  return html;
});
