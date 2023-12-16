<template>
  <div class="flex h-screen flex-col">
    <AppHeader />
    <main class="flex h-full w-full flex-1 items-center justify-center p-2">
      <div class="flex w-80 flex-col gap-4">
        <template v-if="!sent">
          <div class="flex items-center gap-1">
            <InformationCircleIcon class="h-5 w-5 stroke-2" />

            請先進行Email驗證
          </div>
          <form
            class="flex w-full flex-col gap-4"
            @submit.prevent="sendVerificationCode"
          >
            <label>
              <span class="after:text-red-500 after:content-['*']">Email</span>
              <input
                :readonly="loading"
                v-model="email"
                placeholder="you@example.com"
                type="email"
                class="w-full rounded-md border-none px-3 py-2 placeholder-slate-400 shadow"
                :disabled="loading || sent"
                :class="{
                  'ring-1 ring-red-500': isError,
                  'text-slate-400': sent,
                }"
              />
            </label>
            <ButtonPrimary :submit="true" :disabled="loading || sent">
              <template v-if="sent"> 驗證信已寄出 </template>
              <template v-else> 寄送驗證信 </template>
            </ButtonPrimary>
          </form>
        </template>
        <template v-else>
          <div class="flex items-center gap-1">
            <InformationCircleIcon class="h-5 w-5 stroke-2" />
            請查收郵件中的驗證碼並貼上
          </div>
          <form
            class="flex w-full flex-col gap-4"
            @submit.prevent="verifyEmail"
          >
            <label>
              <span class="after:text-red-500 after:content-['*']">驗證碼</span>
              <input
                v-model="verification_code"
                placeholder="驗證碼"
                type="text"
                class="w-full rounded-md border-none px-3 py-2 placeholder-slate-400 shadow"
              />
            </label>
            <ButtonPrimary
              :submit="true"
              :disabled="verification_code.length === 0 || verifing"
            >
              驗證信箱
            </ButtonPrimary>
          </form>
        </template>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { InformationCircleIcon } from '@heroicons/vue/24/outline';

const email = ref<string>('');
const verification_code = ref<string>('');
const loading = ref<boolean>(false);
const isError = ref<boolean>(false);
const sent = ref<boolean>(false);
const verifing = ref<boolean>(false);

const sessionkey = useCookie('user_session');
onMounted(() => {
  setInterval(() => {
    if (sent && sessionkey.value) {
      navigateTo('/contribute');
    }
  }, 1000);
});

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
    sent.value = true;
  } catch (error) {
    loading.value = false;
    isError.value = !!error;
  }

  sent.value = true;
}

async function verifyEmail() {
  verifing.value = true;
  await navigateTo(
    {
      path: '/api/verify-email',
      query: {
        email: email.value,
        token: verification_code.value,
      },
    },
    { external: true },
  );
}

definePageMeta({
  middleware: ['auth'],
});
</script>
