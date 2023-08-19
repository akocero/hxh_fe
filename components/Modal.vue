<template>
	<div
		class="fixed top-0 left-0 h-screen w-full backdrop-blur-sm flex justify-center items-center z-20"
		v-if="is_open">
		<div class="rounded-lg shadow-lg bg-gray-900 w-[28rem]">
			<slot></slot>
		</div>
	</div>
</template>

<script setup>
defineProps(['is_open']);
</script>

<style lang="scss" scoped></style>
