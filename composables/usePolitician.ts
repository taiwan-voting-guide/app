import { ref } from "vue";
// TODO create Politician object type

const tagsClicked = ref<Array<string>>([]);

export function usePolitician() {
  function togglePolitician() {
    console.log("togglePolitician");
  }

  function appendPoliticians() {
    console.log("appendPolitician");
  }
}
