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
