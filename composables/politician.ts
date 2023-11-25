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

  function append(names: Array<string>) {
    if (names.length === 0) {
      return;
    }

    const nameSet = new Set(names);
    const remainNames = politicians.value.filter((name) => {
      return !nameSet.has(name);
    });

    politicians.value = [...remainNames, ...names];
  }

  return {
    politicians,
    set,
    append,
    remove,
    removeAll,
  };
}
