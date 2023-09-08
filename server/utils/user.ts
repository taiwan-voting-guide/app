const kvPrefix = 'user_session';
export const generateSessionKey = (email: string, token: string): string =>
  `${kvPrefix}_${email}_${token}`;

export const getEmailFromSessionKey = (sessionKey: string): string => {
  sessionKey = sessionKey.replace(kvPrefix, '');
  const lastIndex = sessionKey.lastIndexOf('_');
  return sessionKey.substring(0, lastIndex);
};
