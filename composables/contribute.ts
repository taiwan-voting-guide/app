export const useContributeSubmitDialog = () =>
  useState<boolean>('UI_contribute_submit_dialog', () => false);

export const useContributeEditor = () =>
  useState<string>('contribute_editor', () => '');
export const useContributePreview = () =>
  useState<string>('contribute_preview', () => '');
