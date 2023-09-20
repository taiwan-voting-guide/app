type AppData = {
  group: Array<Array<string>>;
  tags: Array<string>;
};

export const getAppData = () => useFetch<AppData>('/api/get-app-data');
