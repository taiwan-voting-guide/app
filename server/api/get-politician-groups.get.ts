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
    return Object.entries<AppDataPoliticianGroup>(data.politician_groups).map(
      ([name, politicians]) => ({
        key: `${name}_${politicians.value.join('_')}_${politicians.keys.join(
          '_',
        )}`,
        name,
        value: politicians.value,
      }),
    );
  } catch (error) {
    throw createError({
      statusCode: 500,
    });
  }
});
