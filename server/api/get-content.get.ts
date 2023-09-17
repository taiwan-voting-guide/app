import { parseMarkdown } from '@nuxtjs/mdc/dist/runtime';
import { createStorage } from 'unstorage';
import fsDriver from 'unstorage/drivers/fs';
import githubDriver from 'unstorage/drivers/github';
import { footnoteTooltip } from '@/utils/contribute';

export default defineEventHandler(async (event) => {
  const query = getQuery<{ politician: string, tag: string }>(event);
  if (!query.politician) {
    throw createError({
      statusCode: 400,
      message: 'Missing politician',
    });
  }

  const contentStorage = createStorage({
    driver:
      process.env.NODE_ENV === 'production'
        ? githubDriver({
            repo: 'taiwan-voting-guide/content',
            branch: 'main',
            token: process.env.GITHUB_TOKEN,
            dir: 'content',
          })
        : fsDriver({
            base: './content/content',
          }),
  });


  let content: string | null = null;
  try {
    content = await contentStorage.getItem(`politician/${query.politician}.md`);
  } catch (error) {
    throw createError({
      statusCode: 500,
    });
  }

  if (!content) {
    throw createError({
      statusCode: 404,
    });
  }

  // console.log(await parseMarkdown(content, {
  //     rehype: {
  //       plugins: {
  //         footnoteTooltip: {
  //           instance: footnoteTooltip,
  //         },
  //       },
  //     },
  //   }));

  return { content };
});
