<template>
  <ul>
    <li class="pl-4" v-for="(item, index) in navigation" :key="index">
      <NuxtLink v-if="!item.children" :to="item._path">
        {{ item.title }}
      </NuxtLink>
      <div v-else>
        {{ item.title }}
      </div>
      <TreeNav v-if="item.children" :navigation="item.children" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { NavItem } from "@nuxt/content/dist/runtime/types";

const { navigation } = defineProps<{
  navigation: Array<NavItem>;
}>();
</script>
