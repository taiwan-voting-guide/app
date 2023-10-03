import { Element } from 'hast';
import { Node } from 'unist';
import { visit } from 'unist-util-visit';

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