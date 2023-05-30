<template>
  <Sidebar>
    <nav class="py-2">
      <ul>
        <li v-for="datum in data" :key="datum.title">
          <NuxtLink :to="datum._path">
            <SidebarItem :activated="url.pathname === datum._path">
              {{ datum.title }}
            </SidebarItem>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </Sidebar>
</template>

<script lang="ts" setup>
import type { ParsedContent } from "@nuxt/content/dist/runtime/types";

const url = useRequestURL();

const data = await queryContent<ParsedContent>("data").find();
console.log(data);
</script>
