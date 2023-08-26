import type { ParsedContent } from '@nuxt/content/dist/runtime/types';

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

export const queryDocsContent = () =>
  useAsyncData('content-/docs', () =>
    queryContent('docs').sort({ order: 1 }).find()
  );

export const queryDataContent = () =>
  useAsyncData('content-/data', () =>
    queryContent('data').sort({ order: 1 }).find()
  );
