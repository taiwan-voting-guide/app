// politician
export type PoliticianGroup = {
  key: string;
  name: string;
  value: Array<string>;
};

export const getAllPoliticians = () =>
  useFetch<Array<string>>('/api/get-all-politicians');

export const getPoliticianGroups = () =>
  useFetch<Array<PoliticianGroup>>('/api/get-politician-groups');

// tag
export const getAllTags = () => useFetch<Array<string>>('/api/get-all-tags');

// analysis
export type PopularPoliticians = {
  timestamp: number;
  politicianCounts: Array<{ politician: string; count: number }>;
};

export const getPoliticianAddedLast7Days = () =>
  useFetch<PopularPoliticians>('/api/get-politician-added-last-7-days');

export type PopularTags = {
  timestamp: number;
  tagCounts: Array<{ tag: string; count: number }>;
};

export const getTagAddedLast7Days = () =>
  useFetch<PopularTags>('/api/get-tag-added-last-7-days');

export type Contribution = {
  timestamp: number;
  lineCounts: Array<{
    contributor: Contributor;
    count: number;
  }>;
};

export const getContribution = () =>
  useFetch<Contribution>('/api/get-contribution');
