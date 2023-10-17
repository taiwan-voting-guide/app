import mixpanel from 'mixpanel-browser';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  mixpanel.init(config.public.mixpanelProjectToken as string, {
    debug: config.public.env === 'development',
  });
});
