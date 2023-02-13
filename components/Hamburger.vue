<template>
  <div v-if="user">
    <Avatar :handleClick="toggleDropdown" :src="user.avatarUrl" />

    <div
      v-if="showDropdown"
      class="absolute mt-2 w-max rounded border border-primary bg-white shadow-lg"
    >
      <div class="py-2">
        <NuxtLink
          v-if="!user"
          to="/login"
          class="block px-4 py-2 text-primary hover:bg-slate-100"
        >
          登入
        </NuxtLink>
        <div
          v-if="user"
          class="block px-4 py-2 text-primary hover:bg-slate-100"
        >
          Hi, {{ user.name }}
        </div>
        <NuxtLink
          v-if="user"
          to="/workspace"
          class="block px-4 py-2 text-primary hover:bg-slate-100"
        >
          協作空間
        </NuxtLink>
      </div>
    </div>
  </div>

  <NuxtLink
    v-else
    to="/login"
    class="block rounded px-4 py-2 text-primary hover:bg-slate-100"
  >
    登入
  </NuxtLink>
</template>

<script setup lang="ts">
const showDropdown = ref(false);

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

const user = useState("user");
</script>
