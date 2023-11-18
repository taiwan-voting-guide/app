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

  const groupOptions: Array<PoliticianSearchOption> = [];
  const allPoliticians = new Map<string, null>();

  for (const [groupName, politicians] of Object.entries(data.group)) {
    if (groupName === 'title' || groupName.startsWith('_')) {
      continue;
    }

    const key = `${groupName}_${politicians.join('_')}`;
    const value = politicians;

    groupOptions.push({ key, name: groupName, value });

    for (const politician of politicians) {
      allPoliticians.set(politician, null);
    }
  }

  const politicianOptions: Array<PoliticianSearchOption> = [];
  for (const politician of allPoliticians.keys()) {
    politicianOptions.push({
      key: politician,
      name: politician,
      value: politician,
    });
  }

  return [
    { name: '2024總統立委', options: groupOptions },
    { name: '2024總統立委', options: groupOptions },
    { name: '所有政治人物', options: politicianOptions },
  ];
});
