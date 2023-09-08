import { kv } from '@vercel/kv';

export default defineEventHandler(async (event) => {
  switch (getRequestURL(event).pathname) {
    case '/login':
      const userSession = getCookie(event, 'user_session');
      if (userSession) {
        const exist = await kvExist(userSession);
        if (exist) {
          return sendRedirect(event, '/', 302);
        }
      }

      break;
    case '/logout': {
      const userSession = getCookie(event, 'user_session');
      if (userSession) {
        await kv.del(userSession);
      }

      return sendRedirect(event, '/', 302);
    }
    case '/api/get-content':
    case '/contribute': {
      const userSession = getCookie(event, 'user_session');
      if (!userSession) {
        return sendRedirect(event, '/login', 302);
      }

      const exist = await kvExist(userSession);
      if (!exist) {
        deleteCookie(event, 'user_session');
        return sendRedirect(event, '/login', 302);
      }
    }
  }
});

async function kvExist(userSession: string): Promise<boolean> {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  const exist = await kv.exists(userSession);
  return exist === 1;
}
