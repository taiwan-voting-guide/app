import { type AppData, type PoliticianSearchOption } from '@/utils/fetch';
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

  const options: Array<PoliticianSearchOption> = [];
  const allPoliticians = new Map<string, null>();

  for (const [groupName, politicians] of Object.entries(data.group)) {
    if (groupName === 'title' || groupName.startsWith('_')) {
      continue;
    }

    const key = `${groupName}_${politicians.join('_')}`;
    const value = politicians;

    options.push({ key, name: groupName, value });

    for (const politician of politicians) {
      allPoliticians.set(politician, null);
    }
  }

  for (const politician of allPoliticians.keys()) {
    options.push({
      key: politician,
      name: politician,
      value: politician,
    });
  }

  return options;
});
