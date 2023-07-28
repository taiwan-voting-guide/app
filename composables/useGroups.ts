export const useSearchPoliticianKeywords = () => useState<string[]>(() => []);

export const useSearchPoliticianResults = () =>
  computed(() => {
    const keywords = useSearchPoliticianKeywords();
    const { $allSearchPoliticianResults } = useNuxtApp();

    const results: Array<Array<string>> = [];
    $allSearchPoliticianResults().forEach((value, key) => {
      for (const keyword of keywords.value) {
        if (key.includes(keyword)) {
          results.push(value);
          break;
        }
      }
    });

    return results;
  });
