import { parseMarkdown as parseMarkdownMDC } from '@nuxtjs/mdc/dist/runtime';
import { Element } from 'hast';
import { Node } from 'unist';
import { visit } from 'unist-util-visit';

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
    return content.substring(sectionStart).trim();
  }

  return content.substring(sectionStart, sectionEnd).trim();
};

export const parseMarkdown = async (id: string = '', md: string) => {
  const clobberPrefix = `${id}-`;
  return {
    _id: id,
    ...(await parseMarkdownMDC(md, {
      rehype: {
        options: {
          clobberPrefix,
          footnoteLabel: '參考資料',
          footnoteLabelTagName: 'h2',
          footnoteBackLabel: '返回',
        },
        plugins: {
          footnoteTooltip: {
            instance: footnoteTooltip,
            options: {
              clobberPrefix,
            },
          },
        },
      },
    })),
  };
};
export const footnoteTooltip = ({
  clobberPrefix,
}: {
  clobberPrefix: string;
}) => {
  return (tree: Node) => {
    const refsMap = new Map<string, Element>();

    const keyPrefix = `${clobberPrefix}fn-`;
    visit(tree, 'element', (element: Element) => {
      const id = (element.properties?.id as string) || '';
      if (!(element.tagName === 'li' && id.startsWith(keyPrefix))) {
        return;
      }

      const e = element.children[1];
      if (!(e.type === 'element' && e.tagName === 'p')) {
        return;
      }

      refsMap.set(id.substring(keyPrefix.length), {
        ...e,
        tagName: 'div',
        properties: {
          className: [
            'left-1/2 bottom-4 absolute bg-slate-200 hidden group-hover:block',
          ],
        },
        children: e.children.filter(
          (e) =>
            (e.type === 'element' && !e.properties.dataFootnoteBackref) ||
            e.type !== 'element'
        ),
      });
    });

    visit(tree, 'element', (element: Element) => {
      if (!element.properties?.dataFootnoteRef) {
        return;
      }

      const id = (element.properties?.id as string) || '';
      const keyRefPrefix = `${clobberPrefix}fnref-`;
      let key = id.substring(keyRefPrefix.length);
      const dashIndex = key.indexOf('-');
      if (dashIndex !== -1) {
        key = key.substring(0, dashIndex);
      }

      const e = refsMap.get(key);
      element.properties.className = ['relative group'];
      if (e) {
        element.children.push(e);
      }
    });
  };
};
