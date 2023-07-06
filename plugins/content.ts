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

  return {
    provide: {
      allTags: () => allTags,
      tagsParamStr: () => tagsParamStr,
      politiciansParamStr: () => politiciansParamStr,
      initialTags: () => initialTags,
      initialPoliticians: () => initialPoliticians,
    },
  };
});
