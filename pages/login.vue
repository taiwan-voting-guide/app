<template>
  <main class="m-4 flex flex-1 flex-col items-center justify-center">
    <lable>
      <span class="m-1 after:text-red-500 after:content-['*']">Email</span>
      <input
        placeholder="you@example.com"
        type="email"
        class="mb-4 block h-8 w-60 rounded-md border-primary bg-slate-50 px-2 shadow-inner placeholder:text-slate-400 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </lable>
    <ButtonPrimary>
      <EnvelopeIcon class="h-4 w-4" />
      寄送驗證碼
    </ButtonPrimary>
  </main>
</template>

<script setup lang="ts">
import { EnvelopeIcon } from '@heroicons/vue/24/outline';
</script>
