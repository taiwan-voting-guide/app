import { parse } from '@/utils/content';

type GetBlameRes = {
  repository: {
    object: {
      blame: {
        ranges: Array<{
          commit: {
            author: {
              email: string;
              date: string;
            };
          };
          startingLine: number;
          endingLine: number;
        }>;
      };
    };
  };
};

export default defineEventHandler(async (event) => {
  const { politician, tag } = getQuery<{ politician: string; tag: string }>(
    event,
  );
  console.time(`${politician} ${tag}`);
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
    console.timeLog(`${politician} ${tag}`, 'get md');
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

  let blameFile: string | null;
  try {
    blameFile = await contentStorage.getItem(`blame/${politician}.txt`);
    console.timeLog(`${politician} ${tag}`, 'get blame');
  } catch (error) {
    throw createError({
      statusCode: 500,
    });
  }

  const { content, startingLine, endingLine } = extractContent(md, tag);
  const blames = generateBlames(blameFile, startingLine, endingLine);
  console.timeLog(`${politician} ${tag}`, 'get blame');

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
  console.timeLog(`${politician} ${tag}`, 'parse');

  console.timeEnd(`${politician} ${tag}`);
  return file.value;
});
