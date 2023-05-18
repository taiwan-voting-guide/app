<template>
  <header class="w-full flex-none border-b-2 border-primary bg-white py-1">
    <div class="mx-auto flex items-center">
      <NuxtLink to="/">
        <img class="h-12 hover:rounded hover:bg-slate-100" src="/logo.svg" />
      </NuxtLink>
      <div class="mx-4">
        <NuxtLink to="/docs/introduction"> <Button>文件</Button></NuxtLink>
        <NuxtLink to="/data"> <Button>數據</Button></NuxtLink>
      </div>
      <div class="ml-auto mr-4 flex">
        <NuxtLink
          to="https://join.slack.com/t/taiwanvotingguide/shared_invite/zt-1stmgptpf-~D6X8ETZyaNR7uUHrIk~sA"
        >
          <Button
            ><div class="flex items-center gap-1">
              <img class="inline h-4 w-4" src="/slack.webp" />Slack
            </div></Button
          ></NuxtLink
        >
        <NuxtLink to="https://forms.gle/nAxdNjAqpAb3GEMz8">
          <Button>意見回饋</Button></NuxtLink
        >
      </div>
    </div>
  </header>
</template>
