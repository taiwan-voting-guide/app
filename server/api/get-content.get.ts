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

  let politicianFile: string | null;
  let blameFile: string | null;
  let contributorFile: string | null;

  const contentStorage = getContentStorage();
  try {
    const results = await Promise.all([
      contentStorage.getItem<string>(`politician/${politician}.md`),
      contentStorage.getItem<string>(`blame/${politician}.txt`),
      contentStorage.getItem<string>('contributor.yaml'),
    ]);

    politicianFile = results[0];
    blameFile = results[1];
    contributorFile = results[2];
  } catch (error) {
    throw createError({
      statusCode: 500,
    });
  }

  if (!politicianFile || !blameFile || !contributorFile) {
    throw createError({
      statusCode: 404,
    });
  }

  const { content, startingLine, endingLine } = extractContent(
    politicianFile,
    tag,
  );
  const blameMap = generateBlameMap(blameFile, startingLine, endingLine);
  const contributorMap = generateContributorMap(contributorFile);

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
      'rehype-anchor-links',
      'rehype-class-names',
      'rehype-add-anchor-class',

      'rehype-minify',
      'rehype-stringify',
    ],
    {
      'remark-lines': {
        startingLine,
      },
      'rehype-blames': {
        blameMap,
        contributorMap,
      },
    },
  );

  return file.value;
});
