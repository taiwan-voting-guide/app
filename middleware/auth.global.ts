export default defineNuxtRouteMiddleware((to, from) => {
  const user = useState("user");

  if (to.path.startsWith("/workspace") && !user) {
    return navigateTo("/login");
  }
});
