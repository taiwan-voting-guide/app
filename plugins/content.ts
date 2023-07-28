export default defineNuxtPlugin(async () => {
  const tagsContent = await queryContent("tag").findOne();
  const allTags = tagsContent.body.children[1].children.map(
    (tag: any) => tag.children[0].value
  );

  const url = useRequestURL();
  const tagParam = url.searchParams.get("tags") || "";
  const initialTags = (tagParam ? tagParam.split(",") : []).filter((tag) =>
    allTags.includes(tag)
  );

  const politiciansParam = url.searchParams.get("politicians") || "";
  const initialPoliticians = politiciansParam
    ? politiciansParam.split(",")
    : [];

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

  // all politician names
  const allPoliticianNames = new Set<string>();
  navigation.forEach((nav) => {
    allPoliticianNames.add(nav.title);
  });

  // Preload politician data while prerendering
  const runtimeConfig = useRuntimeConfig();
  if (runtimeConfig.isServer) {
    await Promise.all(
      navigation.map((nav) =>
        queryContent("politician").where({ title: nav.title }).findOne()
      )
    );
  }

  return {
    provide: {
      allTags,
      initialTags,
      allPoliticianNames,
      initialPoliticians,
      allSearchPoliticianResults,
    },
  };
});
