export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:mounted", () => {
    const mounted = useMounted();
    mounted.value = true;
  });
});
