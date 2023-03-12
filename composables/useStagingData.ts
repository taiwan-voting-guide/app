interface Res {
  stagings: Staging[];
}

interface Staging {
  id: number;
  table: string;
  action: "create" | "update";
  fields: { [key: string]: Field | any };

  createdAt: string;
  updatedAt: string;
}

interface Field {
  [key: string]: FieldCompare | any;
}

interface FieldCompare {
  changed: boolean;
  old: any;
  new: any;
}

export default async function useStagingData(table: string) {
  const config = useRuntimeConfig();
  const { data } = await useFetch<Res>(
    `${config.public.backendEndpoint}/workspace/staging/${table}`
  );
  return data.value?.stagings;
}
