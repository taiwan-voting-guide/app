export const useMounted = () =>
  useState<boolean>("lifecycle_mounted", () => false);
