interface Res {
  stagings: Array<Staging>;
}

export default async function useStagingData(table: string) {
  const config = useRuntimeConfig();
  const { data } = await useFetch<Res>(
    `${config.public.backendEndpoint}/workspace/staging/${table}`
  );
  return data.value?.stagings;
}
