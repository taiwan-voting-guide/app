<template>
  立委個人頁
  <!-- Basic info -->
  <div>
    <img class="h-20 w-20 rounded-full" :src="data.imageUrl" :alt="data.alt" />
    請在以下十個議題中選出您在當選後希望重點關注的三個領域。
    <div v-for="(item, index) in policyCategory" :key="index">
      <input
        type="checkbox"
        :id="'checkbox-' + index"
        v-model="selectedCats"
        :value="item"
        :disabled="selectedCats.length >= 3 && !selectedCats.includes(item)"
        :@click="clickHandler(item)"
      />
      <label :for="'checkbox-' + index">{{ item }}</label>
    </div>
    <p>Selected items: {{ selectedCats }}</p>
    <div v-for="(item, index) in answers">
      <textarea
        id="message"
        v-model="item.message"
        rows="4"
        class="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        placeholder="Write your thoughts here..."
      ></textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
interface User {
  imageUrl: string;
  alt: string;
}
const data: User = {
  imageUrl: `https://www.ly.gov.tw/Images/Legislators/100014.jpg`,
  alt: "吳思瑤",
};
const message = ref("");
const policyCategory = [
  "防疫政策",
  "憲法改革",
  "國家安全",
  "外交事務",
  "社會福利",
  "育兒支持",
  "教育文化",
  "環境能源",
  "司法法制",
];
const selectedCats = ref([]);
// initialize
policyCategory.forEach((item, i) => {
  selectedCats[i] = false;
});
const answers = [{ category: "", message: "" }];
const clickHandler = (item) => (e) => {
  console.log("check", item);
};
</script>
