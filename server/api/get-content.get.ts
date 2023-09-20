import rehypeClassNames from 'rehype-class-names';
import rehypePresetMinify from 'rehype-preset-minify';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import { unified } from 'unified';

export default defineEventHandler(async (event) => {
  const { politician, tag } = getQuery<{ politician: string; tag: string }>(
    event
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

  const contentMd = extractContent(md, tag);

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remark2rehype)
    // @ts-ignore
    .use(rehypeClassNames, {})
    .use(rehypeStringify)
    .use(rehypePresetMinify)
    .process(contentMd);

  return file.value;
});
