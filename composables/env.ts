export function useEnv(): {
  env: string;
  isDev: boolean;
  isProd: boolean;
} {
  const config = useRuntimeConfig();
  return {
    env: config.public.env,
    isDev: config.public.env === 'development',
    isProd: config.public.env === 'production',
  };
}
