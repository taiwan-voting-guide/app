export function useNames(): Array<string> {
  const env = useEnv();
  return env.isDev ? ["假人 A", "假人 B", "假人 C"] : ["吳崢", "張智倫"];
}
