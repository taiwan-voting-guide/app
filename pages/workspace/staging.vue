<template>
  <button
    class="p-4 hover:bg-gray-50 border-b-2"
    :class="{ 'text-primary border-primary': table === 'parties' }"
    @click="changeTable('parties')"
  >
    parties
  </button>
  <button
    class="p-4 hover:bg-gray-50 border-b-2"
    :class="{ 'text-primary border-primary': table === 'politicians' }"
    @click="changeTable('politicians')"
  >
    politicians
  </button>
  <div class="m-4" v-for="staging in stagings" :key="staging.id">
    <div class="flex items-baseline">
      <h2>{{ staging.id }}</h2>
      <button
        href="#"
        class="ml-auto m-2 text-white bg-primary rounded px-4 py-1 text-sm"
        @click="submit"
      >
        Submit
      </button>
    </div>
    <table
      v-if="staging.status === 'update'"
      class="shadow-md w-full text-left text-sm text-gray-500"
    >
      <thead class="bg-gray-100 text-gray-700">
        <tr class="p-4">
          <th scope="col">field</th>
          <th scope="col">new</th>
          <th scope="col">old</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="border-b bg-white dark:border-gray-700"
          :class="{ 'bg-gray-50': !field.value.changed }"
          v-for="field in staging.fields"
          :key="field.name"
        >
          <td>{{ field.name }}</td>
          <td :class="{ 'bg-green-100': field.value.changed }">
            {{ field.value.new }}
          </td>
          <td>{{ field.value.old }}</td>
        </tr>
      </tbody>
    </table>
    <table
      v-else-if="staging.status === 'create'"
      class="shadow-md w-full text-left text-sm text-gray-500"
    >
      <thead class="bg-gray-100 text-gray-700">
        <tr class="p-4">
          <th scope="col">field</th>
          <th scope="col">new</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="border-b bg-white dark:border-gray-700"
          :class="{ 'bg-gray-50': !field.value }"
          v-for="field in staging.fields"
          :key="field.name"
        >
          <td>{{ field.name }}</td>
          <td :class="{ 'bg-green-100': field.value }">{{ field.value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "workspace",
});

const table = ref("parties");
const stagings = ref(await useStagingData(table.value));

console.log(stagings.value);

const params = useRoute().params;
const { page } = params;

const changeTable = async (tableName) => {
  table.value = tableName;
  stagings.value = await useStagingData(tableName);
};
</script>
