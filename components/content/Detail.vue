<template>
  <details class="text-xs">
    <summary>detail</summary>
    <ContentSlot :use="$slots.default" unwrap="p" />
  </details>
</template>
