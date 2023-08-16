<template>
  <div class="flex h-screen w-screen flex-col text-sm text-slate-600">
    <Header />
    <div class="flex flex-1 overflow-scroll bg-slate-100">
      <slot />
    </div>
  </div>
</template>
