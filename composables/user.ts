export const useUserEmail = () => {
  const sessionkey = useCookie<string>('user_session');
  if (!sessionkey.value) {
    return '';
  }
  return getEmailFromSessionKey(sessionkey.value);
};

export const useUserName = () => useCookie<string>('user_name');
