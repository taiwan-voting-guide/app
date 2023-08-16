<template>
  <header
    class="flex h-12 w-full flex-none items-center border-b border-primary bg-white"
  >
    <NuxtLink class="flex h-full items-center" to="/">
      <img class="mx-4 my-2 h-6" src="/logo.svg" />
    </NuxtLink>
    <NuxtLink to="/docs/introduction"> <Button>文件</Button></NuxtLink>
    <NuxtLink to="/data/tag_clicks_last_7_days">
      <Button>數據</Button></NuxtLink
    >
    <div class="ml-auto mr-4 flex">
      <NuxtLink to="https://github.com/taiwan-voting-guide/app">
        <Button
          ><div class="flex items-center gap-1">
            <img class="inline h-4 w-4" src="/github-mark.svg" />GitHub
          </div></Button
        ></NuxtLink
      >
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
  </header>
</template>
