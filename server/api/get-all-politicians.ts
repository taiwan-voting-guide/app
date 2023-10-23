import { AppData } from '@/utils/fetch';
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

  let data: AppData;
  try {
    data = load(yaml) as AppData;
  } catch (error) {
    throw createError({
      statusCode: 500,
    });
  }

  const group = data.group;
  const politicianSet = new Set<string>();
  for (const key in group) {
    for (const politician of group[key]) {
      politicianSet.add(politician);
    }
  }

  return Array.from(politicianSet);
});
