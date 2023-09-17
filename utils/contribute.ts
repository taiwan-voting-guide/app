import { Element } from 'hast';
import { Node } from 'unist';
import { visit } from 'unist-util-visit';

export const footnoteTooltip = () => {
  return (tree: Node) => {
    console.log(tree)
    const footnotesMap = new Map<string, Element>();
    visit(tree, 'element', (element: Element) => {
      const id = element.properties?.id as string || '';
      if (element.tagName === 'li' && id.startsWith('user-content-fn-')) {
        const e = element.children[1];
        if (e.type === 'element') {
          footnotesMap.set(id.substring(16), {
            ...e,
            children: e.children.filter(
              (e) =>
                (e.type === 'element' && !e.properties.dataFootnoteBackref) ||
                e.type !== 'element'
            ),
          });
        }
      }
    });

    visit(tree, 'element', (element: Element) => {
      if (element.properties?.dataFootnoteRef) {
        const id = element.properties?.id as string;
        const key = id.substring(19);
        console.log(key);
        console.log(footnotesMap);
        const e = footnotesMap.get(key);
        console.log(e);
        element.properties.className = ['relative group'];
        const children = [];
        if (e) {
          children.push(e);
        }
        element.children.push({
          type: 'element',
          tagName: 'div',
          properties: {
            className: [
              'left-1/2 bottom-4 absolute bg-slate-200 hidden group-hover:block',
            ],
          },
          children,
        });
      }
    });
  };
};
