export function useSelectPolitician() {
  const politicians = useState<Array<string>>('selected_politicians', () => []);

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
