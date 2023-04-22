<template>
  <main class="mx-auto mt-8 max-w-4xl">
    <div class="flex flex-wrap justify-center">
      <Tag
        v-for="hint in hints"
        :key="hint"
        :text="hint"
        :onClick="() => toggleHint(hint)"
        :clicked="isHintClicked(hint)"
      />
    </div>
    <div class="mt-8 flex flex-nowrap justify-around">
      <Politician
        v-for="candidate in candidates"
        :key="candidate.name"
        :candidate="candidate"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
const { toggleHint, isHintClicked } = useHints();
</script>
