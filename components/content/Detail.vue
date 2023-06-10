<template>
  <details class="mt-auto text-xs text-slate-500">
    <summary class="mb-1">資料來源/貢獻者</summary>
    <ContentSlot :use="$slots.default" unwrap="p" />
  </details>
</template>
