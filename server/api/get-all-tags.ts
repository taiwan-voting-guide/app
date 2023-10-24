import { type AppData } from '@/utils/fetch';
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
    const data = load(yaml) as AppData;
    return data.tags;
  } catch (error) {
    throw createError({
      statusCode: 500,
    });
  }
});
