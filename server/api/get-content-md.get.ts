export default defineEventHandler(async (event) => {
  const query = getQuery<{ politician: string; tag: string }>(event);
  if (!query.politician) {
    throw createError({
      statusCode: 400,
      message: 'Missing politician',
    });
  }

  const contentStorage = getContentStorage();

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
