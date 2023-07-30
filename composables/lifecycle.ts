// This is the reference implementation of the lifecycle API.

export const useMounted = () =>
  useState<boolean>("lifecycle_mounted", () => false);
