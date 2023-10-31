export function useSelectPolitician() {
  const url = useRequestURL();

  const politicians = useState<Array<string>>('selected_politicians', () => {
    const politiciansParam = url.searchParams.get('politicians') || '';
    const initialPoliticianNames = politiciansParam
      ? politiciansParam.split(',')
      : [];
    // TODO: validate politician names
    return initialPoliticianNames;
  });

  const remove = (name: string) => {
    politicians.value = politicians.value.filter((selected) => {
      return selected !== name;
    });
  };

  const removeAll = (): void => {
    politicians.value = [];
  };

  function set(names: Array<string>) {
    if (names.length === 0) {
      politicians.value = [];
      return;
    }

    politicians.value = names;
  }

  function append(name: string) {
    const names = politicians.value.filter((selected) => selected !== name);
    politicians.value = [...names, name];
  }

  function inject(names: Array<string>, position: number) {
    const left = politicians.value
      .slice(0, position)
      .filter((name) => !names.includes(name));
    const right = politicians.value
      .slice(position)
      .filter((name) => !names.includes(name));
    politicians.value = [...left, ...names, ...right];
  }

  return {
    politicians,
    set,
    append,
    inject,
    remove,
    removeAll,
  };
}
