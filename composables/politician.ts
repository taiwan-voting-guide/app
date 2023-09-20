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
    if (politicians.value.includes(name)) {
      return;
    }

    politicians.value.push(name);
  }

  return {
    politicians,
    set,
    append,
    remove,
    removeAll,
  };
}
