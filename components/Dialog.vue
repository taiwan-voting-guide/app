<template>
  <ClientOnly>
    <HeadlessDialog :open="open" @close="onClose">
      <div
        class="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur"
        aria-hidden="true"
      />
      <div class="fixed inset-0 z-40 flex items-center justify-center">
        <HeadlessDialogPanel
          :class="{
            'h-full w-full p-1': isMobile,
            'h-96 w-96': !isMobile,
          }"
        >
          <Card>
            <slot />
          </Card>
        </HeadlessDialogPanel>
      </div>
    </HeadlessDialog>
  </ClientOnly>
</template>

<script setup lang="ts">
const { open, onClose } = defineProps<{
  open: boolean;
  onClose: () => void;
}>();
const { isMobile } = useDevice();
</script>
