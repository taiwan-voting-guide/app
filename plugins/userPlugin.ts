export default defineNuxtPlugin(async (nuxtApp) => {
  const res = await useFetch("http://localhost:8080/user", {
    headers: useRequestHeaders(["cookie"]) as HeadersInit,
  });

  useState("user", () => res.data.value);
});
