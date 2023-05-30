import mixpanel from "mixpanel-browser";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const { isDev } = useEnv();
  mixpanel.init(config.public.mixpanelProjectToken, {
    debug: isDev,
  });
});
