import mixpanel from 'mixpanel-browser';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  mixpanel.init(config.public.mixpanelProjectToken, {
    debug: config.public.env === 'development',
  });
});
