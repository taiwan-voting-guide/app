<template>
  <div class="flex h-full w-full flex-col">
    <div class="flex">
      <NuxtLink
        class="border-b-2 p-4 hover:bg-gray-50"
        :class="{ 'border-primary text-primary': table === 'parties' }"
        to="/workspace/staging/parties"
      >
        parties
      </NuxtLink>
      <NuxtLink
        class="border-b-2 p-4 hover:bg-gray-50"
        :class="{ 'border-primary text-primary': table === 'politicians' }"
        to="/workspace/staging/politicians"
      >
        politicians
      </NuxtLink>
    </div>
    <div class="overflow-y-auto">
      <div class="m-4" v-for="staging in stagings" :key="staging.id">
        <div class="flex items-baseline">
          <h2>{{ staging.id }}</h2>
          <button
            v-if="
              staging.status === StagingStatus.CREATE ||
              staging.status === StagingStatus.UPDATE
            "
            class="m-2 ml-auto rounded bg-primary px-4 py-1 text-sm text-white"
            @click="submit(staging)"
          >
            Submit
          </button>
          <button
            v-else
            class="m-2 ml-auto rounded bg-red-400 px-4 py-1 text-sm text-white"
            @click="stagingDelete(staging.id)"
          >
            Delete
          </button>
        </div>
        <table
          v-if="staging.status === StagingStatus.CREATE"
          class="w-full text-left text-sm text-gray-500 shadow-md"
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
              <td :class="{ 'bg-green-100': field.value }">
                {{ field.value }}
              </td>
            </tr>
          </tbody>
        </table>
        <table
          v-else-if="staging.status === StagingStatus.DUPLICATE"
          class="w-full text-left text-sm text-gray-500 shadow-md"
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
              v-for="field in staging.fields"
              :key="field.name"
              class="border-b bg-white dark:border-gray-700"
              :class="{ 'bg-gray-50': !field.value.changed }"
            >
              <td>{{ field.name }}</td>
              <td :class="{ 'bg-green-100': field.value.changed }">
                {{ field.value.new }}
              </td>
              <td>{{ field.value.old }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "workspace",
});

const {
  params: { table },
} = useRoute();

if (typeof table !== "string") {
  throw new Error("Table is not a string");
}

const stagings = ref<Array<Staging>>(await useStagingData(table));

const submit = async (staging: Staging) => {
  const fields: { [key: string]: Value } = {};
  switch (staging.status) {
    case StagingStatus.CREATE:
      for (const field of staging.fields) {
        if (field.value) {
          fields[field.name] = field.value;
        }
      }
      break;
    case StagingStatus.UPDATE:
      for (const field of staging.fields) {
        if (field.value.changed) {
          fields[field.name] = field.value.new;
        }
      }
      break;
  }

  await useStagingSubmit(staging.id, fields);
  stagings.value = await useStagingData(table);
};

const stagingDelete = async (id: number) => {
  await useStagingDelete(id);
  stagings.value = await useStagingData(table);
};
</script>
