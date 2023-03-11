<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-left text-sm text-gray-500">
      <thead class="bg-gray-50 text-xs uppercase text-gray-700">
        <tr>
          <th
            scope="col"
            class="px-6 py-3"
            v-for="header in tableHeaders"
            :key="header"
          >
            {{ header }}
          </th>
          <th scope="col" class="px-6 py-3"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="border-b bg-white dark:border-gray-700"
          v-for="post in data.stagingData"
          :key="post.id"
        >
          <td class="px-6 py-4">
            <tr v-for="record in post.records">
              <td>{{ record.table }}</td>
              <td>
                <div v-if="record.record.avatar_url">
                  {{ record.record.avatar_url }}
                </div>
                <div v-if="record.record.name">{{ record.record.name }}</div>
                <div v-if="record.record.en_name">
                  {{ record.record.en_name }}
                </div>
                <div v-if="record.record.committee">
                  (委員會){{ record.record.committee }}
                </div>
                <div v-if="record.record.onboard_date">
                  (就職日期){{ record.record.onboard_date }}
                </div>
                <div v-if="record.record.session">
                  (會期){{ record.record.session }}
                </div>
                <div v-if="record.record.term">
                  (任期){{ record.record.term }}
                </div>
                <div v-if="record.record.chairman">
                  (黨主席){{ record.record.chairman }}
                </div>
                <div v-if="record.record.established_date">
                  (成立時間){{ record.record.established_date }}
                </div>
                <div v-if="record.record.filing_date">
                  (filing_date){{ record.record.filing_date }}
                </div>
                <div v-if="record.record.mailing_address">
                  (傳真地址){{ record.record.mailing_address }}
                </div>
                <div v-if="record.record.main_office_address">
                  (總部地址){{ record.record.main_office_address }}
                </div>
                <div v-if="record.record.phone_number">
                  {{ record.record.phone_number }}
                </div>
              </td>
            </tr>
          </td>
          <td class="px-6 py-4">{{ post.createdAt }}</td>
          <td class="px-6 py-4">{{ post.createdAt }}</td>
          <td class="px-6 py-4">
            <button
              href="#"
              class="font-medium text-blue-600 hover:underline dark:text-blue-500"
              @click="submit"
            >
              Submit
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "workspace",
});
const tableHeaders = ["records", "createdAt", "updatedAt"];
const apiUrl = `http://localhost:8080`;
const { data } = await useFetch(`${apiUrl}/workspace/staging`);

const submit = () => {
  // onClick handler
  console.log("submit");
};
</script>
