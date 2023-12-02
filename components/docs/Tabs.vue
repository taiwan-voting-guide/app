<template>
  <nav
    class="sticky top-16 flex w-fit gap-4 rounded-md bg-primary/10 p-2 backdrop-blur-md flex-wrap"
  >
    <NuxtLink
      :to="tab.path"
      v-for="tab in docTabs"
      class="cursor-pointer"
      :class="{
        'font-bold text-slate-600': $route.path === tab.path,
        'text-slate-500 hover:font-bold hover:text-slate-600':
          $route.path !== tab.path,
      }"
    >
      {{ tab.name }}
    </NuxtLink>
  </nav>
</template>
