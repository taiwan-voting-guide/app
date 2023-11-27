type Contribution = {
  timestamp: number;
  lineCounts: Array<{
    email: string;
    count: number;
  }>;
};
export default defineEventHandler(async () => {
  let contribution: Contribution | null;
  let contributorFile: string | null;

  const contentStorage = getContentStorage();
  try {
    const results = await Promise.all([
      contentStorage.getItem<Contribution>(`contribution.json`),
      contentStorage.getItem<string>('contributor.yaml'),
    ]);

    contribution = results[0];
    contributorFile = results[1];
  } catch (error) {
    throw createError({
      statusCode: 500,
    });
  }

  if (!contribution || !contributorFile) {
    throw createError({
      statusCode: 404,
    });
  }

  const contributorMap = generateContributorMap(contributorFile);

  const lineCounts = contribution.lineCounts.map((lineCount) => {
    const contributor = contributorMap.get(lineCount.email);
    return {
      contributor,
      count: lineCount.count,
    };
  });

  return {
    timestamp: contribution.timestamp,
    lineCounts,
  };
});
