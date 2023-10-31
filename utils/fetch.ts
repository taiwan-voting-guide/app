export type AppData = {
  group: { [key: string]: Array<string> };
  tags: Array<string>;
};

export type PoliticianSearchOption = {
  key: string;
  name: string;
  value: Array<string> | string;
};

export const getAppData = () => useFetch<AppData>('/api/get-app-data');
export const getAllPoliticians = () =>
  useFetch<Array<string>>('/api/get-all-politicians');
export const getAllTags = () => useFetch<Array<string>>('/api/get-all-tags');
export const getPoliticianSearchOptions = () =>
  useFetch<Array<PoliticianSearchOption>>('/api/get-politician-search-options');
