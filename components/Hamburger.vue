<template>
  <div ref="dropdown">
    <nav
      @click="toggleDropdown"
      class="mr-4 cursor-pointer rounded border border-primary p-2"
    >
      <svg
        class="fill-primary"
        width="20"
        height="14"
        viewBox="0 0 20 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0H20V2H0V0ZM0 6H20V8H0V6ZM0 12H20V14H0V12Z" />
      </svg>
    </nav>

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
        <div class="block px-4 py-2 text-primary hover:bg-slate-100">
          hi, {{ user.name }}
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
</template>

<script>
export default {
  data() {
    return {
      showDropdown: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
  },
};
</script>

<script setup>
const user = useState("user");
</script>
