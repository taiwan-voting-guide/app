<template>
  <div class="flex h-screen flex-col">
    <Header>
      <Logo />
    </Header>
    <main class="flex h-full w-full flex-1 items-center justify-center p-2">
      <div class="flex w-80 flex-col gap-4">
        <div class="flex items-center gap-1 font-bold">
          <InformationCircleIcon class="h-5 w-5" />

          請先進行電子郵件驗證，以繼續編輯內容。
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
              class="w-full rounded-md border-none px-3 py-2 text-sm placeholder-slate-400 drop-shadow"
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
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { InformationCircleIcon } from '@heroicons/vue/24/outline';

const email = ref<string>('');
const loading = ref<boolean>(false);
const isError = ref<boolean>(false);
const sent = ref<boolean>(false);

const sessionkey = useCookie('user_session');
const router = useRouter();
if (sessionkey.value) {
  router.push('/');
}

onMounted(() => {
  setInterval(() => {
    if (sessionkey.value) {
      router.push('/contribute');
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
}
</script>
