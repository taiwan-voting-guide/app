export default defineNuxtPlugin(async (_nuxtApp) => {
  const config = useRuntimeConfig();
  const res = await useFetch<User>(`${config.public.backendEndpoint}/user`, {
    headers: useRequestHeaders(["cookie"]) as HeadersInit,
  });

  const { value } = res.data;
  if (value) {
    useState<User>("user", () => value);
  }
});
