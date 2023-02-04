<template>
  <div class="flex">
    <SideMenu>
      <ul>
        <li><NuxtLink to="/workspace/data">資料驗證</NuxtLink></li>
      </ul>
    </SideMenu>
    <div class="flex-auto">
      <slot> </slot>
    </div>
  </div>
</template>
