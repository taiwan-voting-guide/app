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
  [key: string]: any;
}
