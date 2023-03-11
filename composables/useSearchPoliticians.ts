type Res = {
  politicians: Array<Politician>;
};

type Politician = {
  id: number;
  name: string;
  birthdate: string;
  sex: string;
  avatarUrl: string;
};

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
  const config = useRuntimeConfig();
  const { data } = await useFetch<Res>(
    `${config.public.backendEndpoint}/politician?${queryStr}`
  );
  return data.value?.politicians;
}
