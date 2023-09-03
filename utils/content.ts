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

export const getTagSection = (content: string, tag: string): string => {
  const substr = `\n## ${tag}\n`;
  const i = content.indexOf(substr);
  if (i === -1) {
    return '';
  }

  const sectionStart = i + substr.length;
  const sectionEnd = content.indexOf('\n## ', sectionStart);
  if (sectionEnd === -1) {
    return content.substring(sectionStart);
  }

  return content.substring(sectionStart, sectionEnd);
};
