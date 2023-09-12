import { createStorage } from 'unstorage';
import githubDriver from 'unstorage/drivers/github';

export default defineEventHandler(async (event) => {
  const query = getQuery<{ politician: string }>(event);
  if (!query.politician) {
    throw createError({
      statusCode: 400,
      message: 'Missing politician',
    });
  }

  const contentStorage = createStorage({
    driver: githubDriver({
      repo: 'taiwan-voting-guide/content',
      branch: 'main',
      token: process.env.GITHUB_TOKEN,
      dir: 'content',
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

  return { content };
});