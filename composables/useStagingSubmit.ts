export default async function useStagingSubmit(
  id: number,
  fields: { [k: string]: boolean | string | number }
) {
  const config = useRuntimeConfig();
  const { data: res } = await useFetch(
    `${config.public.backendEndpoint}/workspace/staging/${id}`,
    {
      method: "POST",
      body: JSON.stringify(fields),
    }
  );
  return res;
}
