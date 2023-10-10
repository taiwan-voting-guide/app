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

export const extractContent = (md: string, tag: string): string => {
  const title = `## ${tag}\n`;
  const start = md.indexOf(title);
  if (start === -1) {
    return '';
  }

  const contentStart = start + title.length;
  const contentEnd = md.indexOf('\n## ', contentStart);
  if (contentEnd === -1) {
    return md.substring(start).trim();
  }

  return md.substring(start, contentEnd).trim();
};
