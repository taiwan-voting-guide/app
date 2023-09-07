<template>
  <main class="m-4 flex flex-1 items-center justify-center">
    <form class="flex flex-col gap-4" @submit.prevent="sendVerificationCode">
      <label>
        <span class="m-1 after:text-red-500 after:content-['*']">Email</span>
        <input
          :readonly="loading"
          v-model="email"
          placeholder="you@example.com"
          type="email"
          class="block h-8 w-60 rounded-md border-primary bg-slate-50 px-2 shadow-inner placeholder:text-slate-400 read-only:cursor-not-allowed read-only:text-slate-400 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-primary"
          :class="{ 'ring-1 ring-red-500': isError }"
        />
      </label>
      <ButtonPrimary :submit="true" :disabled="loading">
        <ArrowPathIcon v-if="loading" class="h-4 w-4 animate-spin" />
        ✉️ 寄送驗證碼
      </ButtonPrimary>
    </form>
  </main>
</template>

<script setup lang="ts">
import { ArrowPathIcon } from '@heroicons/vue/24/outline';

const email = ref<string>('');
const loading = ref<boolean>(false);
const isError = ref<boolean>(false);

const sessionkey = useCookie('user_session');
const router = useRouter();
if (sessionkey.value) {
  router.push('/');
}

async function sendVerificationCode() {
  loading.value = true;
  isError.value = false;
  try {
    await $fetch('/api/send-verification-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email.value }),
    });
  } catch (error) {
    loading.value = false;
    isError.value = !!error;
  }
}
</script>
