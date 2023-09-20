import { load } from 'js-yaml';

export default defineEventHandler(async () => {
  const contentStorage = getContentStorage();
  let yaml: string | null;
  try {
    yaml = await contentStorage.getItem('app.yaml');
  } catch (error) {
    throw createError({
      statusCode: 500,
    });
  }

  if (!yaml) {
    throw createError({
      statusCode: 404,
    });
  }

  try {
    const data = load(yaml);
    return data;
  } catch (error) {
    throw createError({
      statusCode: 500,
    });
  }
});
