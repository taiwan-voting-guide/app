import { type Blame, type Contributor } from '@/utils/content';
import { load } from 'js-yaml';
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
  const left = md.indexOf(title);
  if (left === -1) {
    return { startingLine: -1, endingLine: -1, content: '' };
  }

  const lines = md.substring(0, left).split('\n');
  const startingLine = lines.length + 1;

  const contentStart = left + title.length;
  const contentEnd = md.indexOf('\n## ', contentStart);

  const content =
    contentEnd === -1
      ? md.substring(contentStart)
      : md.substring(contentStart, contentEnd);
  const rightLines = startingLine + content.split('\n').length - 2;
  const endingLine = contentEnd === -1 ? rightLines - 1 : rightLines;

  return {
    startingLine,
    endingLine,
    content,
  };
}

export function generateBlameMap(
  blameFile: string,
  startingLine: number,
  endingLine: number,
): Map<number, Blame> {
  if (!blameFile) {
    return new Map();
  }

  const blameMap = new Map<number, Blame>();
  blameFile.split('\n').forEach((row, i) => {
    const currentLine = i + 1;
    if (currentLine < startingLine || currentLine > endingLine) {
      return;
    }

    if (!row) {
      return;
    }

    const [hash, emailStr, timeStr, lineNumContentStr] = row.split('\t');
    const email = emailStr.substring(2, emailStr.length - 1);
    const timestamp = new Date(timeStr).getTime();
    const line = lineNumContentStr.split(')')[0];
    const lineNum = parseInt(line);

    blameMap.set(lineNum, {
      hash,
      line: lineNum,
      email,
      timestamp,
    });
  });

  return blameMap;
}

export function generateContributorMap(
  contributorFile: string,
): Map<string, Contributor> {
  const contributors = load(contributorFile) as Array<Contributor>;

  const contributorMap = new Map<string, Contributor>();
  for (const contributor of contributors) {
    contributorMap.set(contributor.email, contributor);
  }

  return contributorMap;
}
