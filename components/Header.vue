<template>
  <header class="border-b-2 border-primary py-2">
    <div class="mx-auto flex max-w-4xl items-center">
      <object type="image/svg+xml" data="/logo.svg"></object>
      <div class="ml-auto">
        <Hamburger />
        {{ user.name }}
      </div>
    </div>
  </header>
</template>

<script setup>
const user = useState("user");
</script>
