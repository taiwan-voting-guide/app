export default async function useStagingDelete(id: number) {
  const config = useRuntimeConfig();
  const { data: res } = await useFetch(
    `${config.public.backendEndpoint}/workspace/staging/${id}`,
    {
      method: "DELETE",
    }
  );
  return res;
}
