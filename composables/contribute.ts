export const useContributeSubmitDialog = () =>
  useState<boolean>('UI_contribute_submit_dialog', () => false);

export const useContributePolitician = (politician?: string) =>
  useState<string>('contribute_politician', () => politician || '');
export const useContributeTag = (tag?: string) =>
  useState<string>('contribute_tag', () => tag || '');
export const useContributeEditor = () =>
  useState<string>('contribute_editor', () => '');
export const useContributePreview = () =>
  useState<string>('contribute_preview', () => '');
