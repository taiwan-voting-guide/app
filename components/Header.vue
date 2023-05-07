<template>
  <header class="sticky top-0 w-full border-b-2 border-primary bg-white py-1">
    <div class="mx-auto flex items-center">
      <NuxtLink to="/">
        <img src="/logo.svg" />
      </NuxtLink>
      <div class="mx-4">
        <NuxtLink to="/docs/introduction"> <Button>使用文件</Button></NuxtLink>
        <NuxtLink to="/data"> <Button>數據</Button></NuxtLink>
      </div>
      <div class="ml-auto mr-4 flex">
        <NuxtLink to="/"> <Button>聊天室</Button></NuxtLink>
        <NuxtLink to="/docs/contribute"> <Button>成為貢獻者</Button></NuxtLink>
        <NuxtLink to="/"> <Button>意見回饋</Button></NuxtLink>
      </div>
    </div>
  </header>
</template>
