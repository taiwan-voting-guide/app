<template>
	<main class="mt-8 mx-auto max-w-3xl">
		<div class="flex flex-wrap justify-center">
			<Tag v-for="hint in hints" :key="hint" :text="hint" :onClick="() => toggleHint(hint)"
				:clicked="hintsClicked.has(hint)" />
		</div>
		<div class="mt-8 flex flex-nowrap justify-around">
			<Politician v-for="candidate in candidates" :key="candidate.name" :candidate="candidate" />
		</div>
	</main>
</template>

<script setup lang="ts">
const hintsClicked = ref<Set<string>>(new Set())

function toggleHint(hint: string): void {
	if (hintsClicked.value.has(hint)) {
		hintsClicked.value.delete(hint)
	} else {
		hintsClicked.value.add(hint)
	}
}

</script>
