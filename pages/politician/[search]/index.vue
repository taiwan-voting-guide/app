<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();

if (typeof route.params.search !== "string") {
  throw createError({ statusCode: 400, statusMessage: "Bad Request" });
}

const searchRegex =
  /^(\p{Letter}+)(-([1-2]{1}[\d]{3}-[0-1]{1}[\d]{1}-[0-3]{1}[\d]{1}))?$/u;
let searchName = "";
let searchBirthdate = "";
const match = route.params.search.match(searchRegex);
if (!match) {
  throw createError({ statusCode: 400, statusMessage: "Bad Request" });
}
searchName = match[1];
searchBirthdate = match[3] ? `&birthdate=${match[3]}` : "";

const { data } = await useFetch<PoliticiansResult>(
  `${config.public.backendEndpoint}/politician?name=${searchName}${searchBirthdate}`
);

if (data.value === null) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

const createUrl = (searchName: string, searchBirthdate: string) => {
  return `/politician/${searchName}-${searchBirthdate.split("T")[0]}`;
};

if (data.value.politicians.length === 1) {
  router.push({
    path: createUrl(
      data.value.politicians[0].name,
      data.value.politicians[0].birthdate
    ),
  });
}
const politicianList = ref(data.value.politicians);
</script>
<template>
  <div>Route:{{ $route.params.search }}</div>
  <div v-if="politicianList.length === 0">There is no result.</div>
  <div v-else-if="politicianList.length > 1">
    <ul v-for="politician in politicianList">
      <li>
        <router-link :to="createUrl(politician.name, politician.birthdate)">
          <img :src="politician.avatarUrl" alt="" class="inline-block w-24" />
          {{ `${politician.name}-${politician.birthdate}` }}
        </router-link>
      </li>
    </ul>
  </div>
  <div v-else>
    <li>
      <img
        :src="politicianList[0].avatarUrl"
        alt=""
        class="inline-block w-24"
      />{{ politicianList[0].name }}
    </li>
  </div>
</template>
