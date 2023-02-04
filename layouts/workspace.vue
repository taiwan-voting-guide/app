<template>
  <div class="flex">
    <SideMenu>
      <ul>
        <li>
          <NuxtLink
            class="cursor-pointerm-2 m-2 block rounded p-2 text-primary hover:bg-slate-100"
            to="/workspace/data"
            >資料驗證</NuxtLink
          >
        </li>
      </ul>
    </SideMenu>
    <div class="flex-auto">
      <slot> </slot>
    </div>
  </div>
</template>
