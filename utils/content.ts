type ContentApp = {
  group: Array<Array<string>>;
  tags: Array<string>;
};

export const queryAppContent = () =>
  useAsyncData(`content-/`, () => queryContent<ContentApp>('/app').findOne());

export const queryPoliticianNav = () =>
  useAsyncData('nav-/politician', () =>
    fetchContentNavigation({ where: [{ _path: '/politician' }] })
  );

export const queryDocsNav = () =>
  useAsyncData('nav-/docs', () =>
    fetchContentNavigation({ where: [{ _path: { $contains: '/docs' } }] })
  );

export const queryDataContent = () =>
  useAsyncData('content-/data', () =>
    queryContent('data').sort({ order: 1 }).find()
  );
