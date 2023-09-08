export const generateSessionKey = (email: string, token: string): string =>
  `user_session_${email}_${token}`;
