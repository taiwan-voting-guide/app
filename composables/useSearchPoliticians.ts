type Politician = {
  id: number;
}

export default async function useSearchPoliticians(
  name?: string,
  birthdate?: string
) {
  const queryStrs = [];
  if (name) {
    queryStrs.push(`name=${name}`);
  }
  if (birthdate) {
    queryStrs.push(`birthdate=${birthdate}`);
  }
  const queryStr = queryStrs.join("&");
  const config = useRuntimeConfig()
  return useFetch<Array<Politician>>(`${config.public.backendEndpoint}/politician?${queryStr}`);
}
