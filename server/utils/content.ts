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

type ExtractContentResult = {
  startingLine: number;
  endingLine: number;
  content: string;
};

export function extractContent(md: string, tag: string): ExtractContentResult {
  const title = `## ${tag}\n`;
  const start = md.indexOf(title);
  if (start === -1) {
    return { startingLine: -1, endingLine: -1, content: '' };
  }

  const lines = md.substring(0, start).split('\n');
  const startingLine = lines.length;

  const contentStart = start + title.length;
  const contentEnd = md.indexOf('\n## ', contentStart);

  if (contentEnd === -1) {
    return {
      startingLine,
      endingLine: startingLine,
      content: md.substring(start).trim(),
    };
  }

  const content = md.substring(start, contentEnd).trim();
  const endingLine = startingLine + content.split('\n').length - 1;

  return {
    startingLine,
    endingLine,
    content,
  };
}
