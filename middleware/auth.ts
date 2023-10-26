export default defineNuxtRouteMiddleware((to) => {
  const userSession = useCookie('user_session');
  console.log('userSession', userSession.value);
  switch (to.path) {
    case '/login':
      if (userSession.value) {
        return navigateTo('/contribute');
      }
    case '/contribute':
      if (!userSession.value) {
        return navigateTo('/login');
      }
    default:
      return;
  }
});
