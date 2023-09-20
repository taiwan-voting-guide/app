export const useShowEditorSubmitDialog = () =>
  useState<boolean>('UI_show_editor_submit_dialog', () => false);

export const useContributePolitician = () =>
  useState<string>('contribute_politician', () => '');
export const useContributeTag = () =>
  useState<string>('contribute_tag', () => '');
export const useContributeEditor = () =>
  useState<string>('contribute_editor', () => '');
export const useContributePreview = () =>
  useState<string>('contribute_preview', () => '');
