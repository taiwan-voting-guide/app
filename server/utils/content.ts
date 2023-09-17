import { createStorage } from 'unstorage';
import fsDriver from 'unstorage/drivers/fs';
import githubDriver from 'unstorage/drivers/github';

const contentStorage = createStorage({
  driver:
    process.env.NODE_ENV === 'production'
      ? githubDriver({
          repo: 'taiwan-voting-guide/content',
          branch: 'main',
          token: process.env.GITHUB_TOKEN,
          dir: 'content',
        })
      : fsDriver({
          base: './content/content',
        }),
});

export const getContentStorage = () => contentStorage;

export const replaceTagSection = (
  content: string,
  tag: string,
  section: string
): string => {
  const substr = `\n## ${tag}\n`;
  const i = content.indexOf(substr);
  if (i === -1) {
    return `${content}\n\n## ${tag}\n\n${section}`;
  }

  const sectionStart = i + substr.length;
  const sectionEnd = content.indexOf('\n## ', sectionStart);
  if (sectionEnd === -1) {
    return `${content.substring(0, sectionStart)}\n${section}`;
  }

  return `${content.substring(
    0,
    sectionStart
  )}\n${section}\n${content.substring(sectionEnd)}`;
};
