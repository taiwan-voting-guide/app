export default defineNuxtPlugin(async () => {
  const tagsContent = await queryContent("tag").findOne();
  const allTags = tagsContent.body.children[1].children.map(
    (tag: any) => tag.children[0].value
  );

  const url = useRequestURL();
  const tagsParamStr = url.searchParams.get("tags") || "";
  const politiciansParamStr = url.searchParams.get("politicians") || "";

  const initialTags = tagsParamStr ? tagsParamStr.split(",") : [];

  const initialPoliticians = politiciansParamStr
    ? politiciansParamStr.split(",")
    : [];

  const navigation = await fetchContentNavigation({
    where: [{ _path: "/politician" }],
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
      allTags: () => allTags,
      tagsParamStr: () => tagsParamStr,
      initialTags: () => initialTags,

      politiciansParamStr: () => politiciansParamStr,
      initialPoliticians: () => initialPoliticians,
    },
  };
});
