export default defineNuxtRouteMiddleware((to) => {
  const userSession = useCookie('user_session');
  switch (to.path) {
    case '/login':
      if (userSession.value) {
        return navigateTo('/contribute');
      }
      return;
    case '/contribute':
      if (!userSession.value) {
        return navigateTo('/login');
      }
      return;
  }
});
