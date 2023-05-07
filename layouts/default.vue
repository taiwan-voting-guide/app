<template>
  <div class="flex h-screen w-screen flex-col">
    <Header />
    <div class="flex flex-1 overflow-scroll">
      <slot />
    </div>
  </div>
</template>
