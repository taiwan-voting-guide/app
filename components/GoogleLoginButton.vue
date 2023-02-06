<template>
  <div
    id="g_id_onload"
    :data-client_id="config.public.googleClientId"
    data-auto_prompt="false"
    :data-login_uri="googleAuthEndpoint"
  ></div>
  <div
    class="g_id_signin"
    data-type="standard"
    data-theme="outline"
    data-size="large"
    data-text="signin_with"
    data-shape="rectangular"
    data-logo_alignment="left"
  ></div>
</template>

<script setup>
useHead({
  script: [
    { src: "https://accounts.google.com/gsi/client", async: true, defer: true },
  ],
});
const config = useRuntimeConfig();
const googleAuthEndpoint = `${config.public.backendEndpoint}/auth/google`;
</script>
