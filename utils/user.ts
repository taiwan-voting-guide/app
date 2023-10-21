export const getEmailFromSessionKey = (
  sessionKey: string | null | undefined,
): string => {
  if (!sessionKey) {
    return '';
  }

  sessionKey = sessionKey.replace('user_session_', '');
  const lastIndex = sessionKey.lastIndexOf('_');
  return sessionKey.substring(0, lastIndex);
};
