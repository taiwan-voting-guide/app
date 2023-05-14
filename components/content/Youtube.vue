<template>
  <div class="relative my-2 h-0 w-full pt-[56.25%]">
    <iframe
      class="absolute left-0 top-0 h-full w-full"
      :src="`https://www.youtube.com/embed/${props.src}`"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  src: string;
}>();
</script>
