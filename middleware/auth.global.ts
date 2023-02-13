export default defineNuxtRouteMiddleware((to) => {
  const user = useState("user");

  if (to.path.startsWith("/workspace") && !user.value) {
    return navigateTo("/login");
  }
});
