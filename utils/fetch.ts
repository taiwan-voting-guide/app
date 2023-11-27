export type AppData = {
  group: { [key: string]: Array<string> };
  tags: Array<string>;
};

export type PoliticianSearchOption = {
  key: string;
  name: string;
  value: Array<string>;
};

export type PoliticianSearchOptionGroups = Array<{
  name: string;
  options: Array<PoliticianSearchOption>;
}>;

export type PopularTags = {
  timestamp: number;
  tagCounts: Array<{ tag: string; count: number }>;
};

export type PopularPoliticians = {
  timestamp: number;
  politicianCounts: Array<{ politician: string; count: number }>;
};

export const getAllPoliticians = () =>
  useFetch<Array<string>>('/api/get-all-politicians');
export const getAllTags = () => useFetch<Array<string>>('/api/get-all-tags');
export const getPoliticianSearchOptions = () =>
  useFetch<PoliticianSearchOptionGroups>('/api/get-politician-search-options');

export const getTagAddedLast7Days = () =>
  useFetch<PopularTags>('/api/get-tag-added-last-7-days');
export const getPoliticianAddedLast7Days = () =>
  useFetch<PopularPoliticians>('/api/get-politician-added-last-7-days');
