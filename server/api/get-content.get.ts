import { parse } from '@/utils/content';
import { Octokit } from 'octokit';

const githubToken = process.env.GITHUB_TOKEN || '';

type GetBlameRes = {
  repository: {
    object: {
      blame: {
        ranges: Array<{
          commit: {
            author: {
              email: string;
              date: string;
            };
          };
          startingLine: number;
          endingLine: number;
        }>;
      };
    };
  };
};

export default defineEventHandler(async (event) => {
  const { politician, tag } = getQuery<{ politician: string; tag: string }>(
    event,
  );
  if (!politician || !tag) {
    throw createError({
      statusCode: 400,
      message: 'Missing politician or tag',
    });
  }

  let md: string | null;
  const contentStorage = getContentStorage();
  try {
    md = await contentStorage.getItem(`politician/${politician}.md`);
  } catch (error) {
    throw createError({
      statusCode: 500,
    });
  }

  if (!md) {
    throw createError({
      statusCode: 404,
    });
  }

  const octokit = new Octokit({ auth: githubToken });
  const {
    repository: {
      object: {
        blame: { ranges },
      },
    },
  } = await octokit.graphql<GetBlameRes>(
    `
      query blame($owner: String!, $repo: String!, $path: String!) {
        repository(owner: $owner, name: $repo) {
          object(expression: "HEAD") {
            ... on Commit {
              blame(path: $path) {
                ranges {
                  commit {
                    author {
                      name
                      email
                      date
                    }
                  }
                  startingLine
                  endingLine
                }
              }
            }
          }                  
        }
      }
  `,
    {
      owner: 'taiwan-voting-guide',
      repo: 'content',
      path: `content/politician/${politician}.md`,
    },
  );

  const blames = new Map<
    number,
    {
      line: number;
      email: string;
      timestamp: number;
    }
  >();
  const { content, startingLine, endingLine } = extractContent(md, tag);
  for (let i = startingLine + 1; i <= endingLine; i++) {
    const range = ranges.find((range) => {
      return range.startingLine <= i && range.endingLine >= i;
    });

    if (!range) {
      continue;
    }

    blames.set(i, {
      line: i,
      email: range.commit.author.email,
      timestamp: new Date(range.commit.author.date).getTime(),
    });
  }

  const file = await parse(
    politician,
    tag,
    content,
    [
      'remark-parse',
      'remark-gfm',
      'remark-lines',
      'remark-rehype',
      'rehype-blames',
      'rehype-class-names',
      'rehype-minify',
      'rehype-stringify',
    ],
    {
      'remark-lines': {
        startingLine,
      },
      'rehype-blames': {
        blames,
      },
    },
  );

  return file.value;
});
