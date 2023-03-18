<template>
  <button
    class="p-4 bg-gray-100 hover:bg-gray-200"
    @click="changeTable('parties')"
  >
    parties
  </button>
  <button
    class="p-4 bg-gray-100 hover:bg-gray-200"
    @click="changeTable('politicians')"
  >
    politicians
  </button>
  <div class="m-3" v-for="staging in stagings" :key="staging.id">
    <div>
      {{ staging.id }}
      <button
        href="#"
        class="font-medium text-blue-600 hover:underline dark:text-blue-500"
        @click="submit"
      >
        {{ staging.action }}
      </button>
    </div>
    <table
      v-if="staging.action === 'update'"
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
          :class="{ 'bg-gray-100': !field.changed }"
          v-for="(field, key) in staging.fields"
          :key="key"
        >
          <td>{{ key }}</td>
          <td :class="{ 'bg-green-100': field.changed }">{{ field.new }}</td>
          <td>{{ field.old }}</td>
        </tr>
      </tbody>
    </table>
    <table v-else class="shadow-md w-full text-left text-sm text-gray-500">
      <thead class="bg-gray-100 text-gray-700">
        <tr class="p-4">
          <th scope="col">field</th>
          <th scope="col">new</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="border-b bg-white dark:border-gray-700"
          v-for="(field, key) in staging.fields"
          :key="key"
        >
          <td>{{ key }}</td>
          <td class="bg-green-100">{{ field }}</td>
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

const params = useRoute().params;
const { page } = params;

const changeTable = async (tableName) => {
  table.value = tableName;
  stagings.value = await useStagingData(tableName);
};
</script>
