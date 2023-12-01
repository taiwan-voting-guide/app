export const useSelectedTagsQuery = () =>
  useState<string>('app_selected_tags_query', () => '');
export const useSelectedPoliticiansQuery = () =>
  useState<string>('app_selected_politicians_query', () => '');
