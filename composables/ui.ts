export const useShowTagSideBar = () =>
  useState<boolean>("UI_show_tag_side_bar", () => true);

export const useShowPoliticianSearchDialog = () =>
  useState<boolean>("UI_show_politician_search_dialog", () => false);
