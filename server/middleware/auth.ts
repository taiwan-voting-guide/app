export default defineEventHandler((event) => {
  const userSession = getCookie(event, 'user_session');
  if (getRequestURL(event).pathname === '/login' && userSession) {
    return sendRedirect(event, '/', 302);
  }
});
