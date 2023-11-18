export type AppData = {
  group: { [key: string]: Array<string> };
  tags: Array<string>;
};

export type PoliticianSearchOption = {
  key: string;
  name: string;
  value: Array<string> | string;
};

export type PoliticianSearchOptionGroups = Array<{
  name: string;
  options: Array<PoliticianSearchOption>;
}>;

export const getAllPoliticians = () =>
  useFetch<Array<string>>('/api/get-all-politicians');
export const getAllTags = () => useFetch<Array<string>>('/api/get-all-tags');
export const getPoliticianSearchOptions = () =>
  useFetch<PoliticianSearchOptionGroups>('/api/get-politician-search-options');
