export default defineNuxtRouteMiddleware((to, from) => {
  console.log("middleware");
  const user = useState("user");
  console.log(user);
  console.log(user);
});
