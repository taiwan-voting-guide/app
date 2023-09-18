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

  async function set(names: Array<string>) {
    if (names.length === 0) {
      politicians.value = [];
    }

    politicians.value = names;
  }

  return {
    politicians,
    set,
    remove,
    removeAll,
  };
}
