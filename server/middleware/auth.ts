import { kv } from '@vercel/kv';

export default defineEventHandler(async (event) => {
  console.log(getRequestURL(event).pathname);
  switch (getRequestURL(event).pathname) {
    case '/login':
      const userSession = getCookie(event, 'user_session');
      if (userSession) {
        const exist = await kv.exists(userSession);
        if (exist === 1) {
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

      const exist = await kv.exists(userSession);
      if (exist !== 1) {
        deleteCookie(event, 'user_session');
        return sendRedirect(event, '/login', 302);
      }
    }
  }
});
