<template>
	<details class="text-xs text-primary">
		<summary>
			detail
		</summary>
		<ContentSlot :use="$slots.default" unwrap="p" />
	</details>
</template>
