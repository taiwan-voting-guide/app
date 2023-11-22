<template>
  <HeadlessSwitch
    v-model="value"
    :class="props.enabled ? 'bg-primary' : 'bg-primary/50'"
    class="relative inline-flex h-5 w-[2.25rem] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors"
  >
    <span class="sr-only">{{ name }}</span>
    <span
      aria-hidden="true"
      :class="props.enabled ? 'translate-x-4' : 'translate-x-0'"
      class="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white ring-0 transition"
    />
  </HeadlessSwitch>
</template>

<script setup lang="ts">
const props = defineProps<{ enabled: boolean; name: string }>();
const emit = defineEmits(['update:enabled']);

const value = computed({
  get() {
    return props.enabled;
  },
  set(value) {
    emit('update:enabled', value);
  },
});
</script>
