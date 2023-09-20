import { Octokit } from 'octokit';

const githubToken = process.env.GITHUB_TOKEN || '';
const owner = 'taiwan-voting-guide';
const repo = 'content';

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    politician: string;
    tag: string;
    name: string;
    content: string;
  }>(event);
  const octokit = new Octokit({ auth: githubToken });

  // Get the latest commit SHA
  const {
    data: {
      object: { sha: commitSHA },
    },
  } = await octokit.rest.git.getRef({
    owner: 'taiwan-voting-guide',
    repo: 'content',
    ref: 'heads/main',
  });

  // get the latest content and its SHA
  const { data } = await octokit.rest.repos.getContent({
    owner,
    repo,
    path: `content/politician/${body.politician}.md`,
  });

  const { sha: contentSHA, content: contentBase64 } = data as {
    sha: string;
    content: string;
  };

  const content = Buffer.from(contentBase64, 'base64').toString('utf-8');
  const newContent = replaceTagSection(content, body.tag, body.content);
  const newContentBase64 = Buffer.from(newContent, 'utf-8').toString('base64');
  const branch = `${event.context.email}-${Math.floor(Date.now() / 1000)}`;

  // create a new branch
  await octokit.rest.git.createRef({
    owner,
    repo,
    ref: `refs/heads/${branch}`,
    sha: commitSHA,
  });

  // create a new commit
  await octokit.rest.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: `content/politician/${body.politician}.md`,
    message: `[${event.context.email}][${body.politician}][${body.tag}]`,
    content: newContentBase64,
    sha: contentSHA,
    branch,

    committer: {
      name: body.name,
      email: event.context.email,
    },
  });

  // create a new pull request
  const res = await octokit.rest.pulls.create({
    owner,
    repo,
    title: `[${event.context.email}][${body.politician}][${body.tag}]`,
    head: branch,
    base: 'main',
  });

  return {
    url: res.data.html_url,
  };
});

const replaceTagSection = (
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
