<template>
  <details class="mt-auto text-xs text-slate-500">
    <summary class="mb-1 cursor-pointer">資料來源 / 貢獻者</summary>
    <dl class="text-xs text-slate-500">
      <dt>資料來源:</dt>
      <dd>
        <slot name="source" />
      </dd>
      <dt>貢獻者:</dt>
      <dd>
        <slot name="contributor" />
      </dd>
    </dl>
  </details>
</template>
