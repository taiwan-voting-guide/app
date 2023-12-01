export type AppData = {
  politician_groups: {
    [key: string]: AppDataPoliticianGroup;
  };
  tags: Array<string>;
};

export type AppDataPoliticianGroup = {
  keys: Array<string>;
  value: Array<string>;
};
