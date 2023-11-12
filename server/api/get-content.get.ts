import { parse } from '@/utils/content';

export default defineEventHandler(async (event) => {
  const { politician, tag } = getQuery<{ politician: string; tag: string }>(
    event,
  );
  if (!politician || !tag) {
    throw createError({
      statusCode: 400,
      message: 'Missing politician or tag',
    });
  }

  let mdFile: string | null;
  const contentStorage = getContentStorage();
  try {
    mdFile = await contentStorage.getItem(`politician/${politician}.md`);
  } catch (error) {
    throw createError({
      statusCode: 500,
    });
  }

  if (!mdFile) {
    throw createError({
      statusCode: 404,
    });
  }

  let blameFile: string | null;
  try {
    blameFile = await contentStorage.getItem(`blame/${politician}.txt`);
  } catch (error) {
    throw createError({
      statusCode: 500,
    });
  }

  if (!blameFile) {
    throw createError({
      statusCode: 404,
    });
  }

  const { content, startingLine, endingLine } = extractContent(mdFile, tag);
  const blames = generateBlames(blameFile, startingLine, endingLine);

  const file = await parse(
    politician,
    tag,
    content,
    [
      'remark-parse',
      'remark-gfm',
      'remark-lines',
      'remark-rehype',
      'rehype-blames',
      'rehype-class-names',
      'rehype-minify',
      'rehype-stringify',
    ],
    {
      'remark-lines': {
        startingLine,
      },
      'rehype-blames': {
        blames,
      },
    },
  );

  return file.value;
});
