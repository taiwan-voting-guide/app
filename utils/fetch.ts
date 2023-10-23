export type AppData = {
  group: { [key: string]: Array<string> };
  tags: Array<string>;
};

export const getAppData = () => useFetch<AppData>('/api/get-app-data');
export const getAllPoliticians = () =>
  useFetch<Array<string>>('/api/get-all-politicians');
export const getAllTags = () => useFetch<Array<string>>('/api/get-all-tags');
