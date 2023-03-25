export enum StagingStatus {
  CREATE = "create",
  UPDATE = "update",
  CONFLICT = "conflict",
  DUPLICATE = "duplicate",
}

export enum StagingFieldType {
  VALUE = "value",
  COMPARE = "compare",
}

declare global {
  interface User {
    id: number;
    name: string;
    birthdate?: string;
    avatarUrl?: string;
  }

  type Staging = {
    id: number;
    table: string;
    createdAt: string;
    updatedAt: string;
  } & StagingStatusFields;

  type StagingStatusFields =
    | {
        status: StagingStatus.CREATE;
        fields: Array<StagingFieldValue>;
      }
    | {
        status: StagingStatus.UPDATE;
        fields: Array<StagingFieldCompare>;
      }
    | {
        status: StagingStatus.CONFLICT;
        fields: Array<StagingFieldCompare>;
      }
    | {
        status: StagingStatus.DUPLICATE;
        fields: Array<StagingFieldCompare>;
      };

  type Value = number | string | boolean;

  export type StagingFieldValue = {
    type: StagingFieldType.VALUE;
    name: string;
    value: Value;
  };

  type StagingFieldCompare = {
    type: StagingFieldType.COMPARE;
    name: string;
    value: Compare;
  };

  interface Compare {
    changed: boolean;
    old: Value;
    new: Value;
  }
}
