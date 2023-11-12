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
  const startingLine = lines.length;

  const contentStart = left + title.length;
  const contentEnd = md.indexOf('\n## ', contentStart);

  const content =
    contentEnd === -1 ? md.substring(left) : md.substring(left, contentEnd);
  const endingLine = startingLine + content.split('\n').length - 1;

  return {
    startingLine,
    endingLine,
    content,
  };
}

export function generateBlames(
  blame: string | null,
  startingLine: number,
  endingLine: number,
): Map<
  number,
  {
    line: number;
    hash: string;
    email: string;
    timestamp: number;
  }
> {
  if (!blame) {
    return new Map();
  }

  const blames = new Map<
    number,
    { line: number; email: string; timestamp: number; hash: string }
  >();
  blame.split('\n').forEach((row, i) => {
    const currentLine = i + 1;
    if (currentLine < startingLine || currentLine > endingLine) {
      return;
    }
    const [hash, emailStr, timeStr, lineNumContentStr] = row.split('\t');
    const email = emailStr.substring(2, emailStr.length - 1);
    const timestamp = new Date(timeStr).getTime();
    const line = lineNumContentStr.split(')')[0];
    const lineNum = parseInt(line);

    blames.set(lineNum, {
      hash,
      line: lineNum,
      email,
      timestamp,
    });
  });

  return blames;
}
