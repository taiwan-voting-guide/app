import { getEmailFromSessionKey } from '@/utils/user';
import { kv } from '@vercel/kv';

export default defineEventHandler(async (event) => {
  switch (getRequestURL(event).pathname) {
    case '/logout': {
      const userSession = getCookie(event, 'user_session');
      if (userSession) {
        await kv.del(userSession);
      }

      return sendRedirect(event, '/', 302);
    }
    case '/api/get-content-md':
    case '/api/submit-content': {
      const userSession = getCookie(event, 'user_session');
      if (!userSession) {
        return sendRedirect(event, '/login', 302);
      }

      const exist = await kvExist(userSession);
      if (!exist) {
        deleteCookie(event, 'user_session');
        return sendRedirect(event, '/login', 302);
      }

      event.context.email = getEmailFromSessionKey(userSession);
    }
  }
});

const kvExist = async (userSession: string): Promise<boolean> => {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  const exist = await kv.exists(userSession);
  return exist === 1;
};
