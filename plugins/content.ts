export default defineNuxtPlugin(async () => {
  // populate allTags
  const tagsContent = await queryContent("tag").findOne();
  const allTags = tagsContent.body.children[1].children.map(
    (tag: any) => tag.children[0].value
  );

  const url = useRequestURL();
  const tagParam = url.searchParams.get("tags") || "";
  const initialTags = (tagParam ? tagParam.split(",") : []).filter((tag) =>
    allTags.includes(tag)
  );

  // set initial tags
  const { set: setTags } = useSelectTag();
  setTags(initialTags);

  // populate allSearchPoliticianResults
  const allSearchPoliticianResults: Map<string, Array<string>> = new Map();
  await queryContent("group", "groups")
    .findOne()
    .then((content) => {
      for (const [group, politicians] of Object.entries(content)) {
        if (group === "title" || group.startsWith("_")) {
          continue;
        }

        const key = `${group}_${politicians.join("_")}`;
        const value = [group, ...politicians];

        allSearchPoliticianResults.set(key, value);
      }
    });

  const navigation = await fetchContentNavigation({
    where: [{ _path: "/politician" }],
  });

  // populate allPoliticianNames
  const allPoliticianNames = new Set<string>();
  navigation.forEach((nav) => {
    allPoliticianNames.add(nav.title);
  });

  const docs = await queryContent("docs").sort({ order: 1 }).find();
  const data = await queryContent("data").sort({ order: 1 }).find();

  // set initial politicians
  const politiciansParam = url.searchParams.get("politicians") || "";
  const initialPoliticianNames = (
    politiciansParam ? politiciansParam.split(",") : []
  ).filter((name) => allPoliticianNames.has(name));

  const { set: setPoliticianNames } = useSelectPolitician();
  setPoliticianNames(initialPoliticianNames);

  return {
    provide: {
      docs,
      data,
      allTags,
      allPoliticianNames,
      allSearchPoliticianResults,
    },
  };
});
