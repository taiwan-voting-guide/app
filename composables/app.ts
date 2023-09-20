export const useTagDialog = () =>
  useState<boolean>('UI_tag_dialog', () => false);

export const usePoliticianDialog = () =>
  useState<boolean>('UI_politician_dialog', () => false);
