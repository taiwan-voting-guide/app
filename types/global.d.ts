export {};

declare global {
  interface User {
    id: number;
    name: string;
    birthdate?: string;
    avatarUrl?: string;
  }

  interface Staging {
    id: number;
    table: string;
    status: "create" | "update" | "conflict";
    fields: Array<FieldValue | FieldCompare>;

    createdAt: string;
    updatedAt: string;
  }

  interface FieldValue {
    type: "value";
    name: string;
    value: number | string | boolean;
  }

  interface FieldCompare {
    type: "compare";
    name: string;
    value: {
      changed: boolean;
      old: number | string | boolean;
      new: number | string | boolean;
    };
  }
}
