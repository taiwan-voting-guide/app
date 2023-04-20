<template>
	<button class="m-2 px-4 py-2 border border-primary rounded text-primary" 
		:class="{ 'bg-slate-200 font-bold': props.clicked }"
		@click="onClick">{{ props.text }} </button>
</template>

<script setup lang="ts">
const props = defineProps<{
	clicked: boolean
	text: string
	onClick: () => void
}>()
</script>
