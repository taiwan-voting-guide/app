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

  return useFetch(`http://localhost:8080/politician?${queryStr}`);
}
