export default defineNuxtPlugin(async (nuxtApp) => {
  const res = await useFetch("http://localhost:8080/auth/user", {
    headers: useRequestHeaders(["cookie"]) as HeadersInit,
  });

  console.log(res.data.value);
  useState("user", () => res.data);
});
