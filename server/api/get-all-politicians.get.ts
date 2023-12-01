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
    const politiciansSet = new Set<string>();
    Object.values<AppDataPoliticianGroup>(data.politician_groups).forEach(
      (politicians: { value: Array<string> }) => {
        politicians.value.forEach((politician) => {
          politiciansSet.add(politician);
        });
      },
    );
    return Array.from(politiciansSet).sort();
  } catch (error) {
    throw createError({
      statusCode: 500,
    });
  }
});
