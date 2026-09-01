<template>
	<div
		v-if="isOpen"
		class="fixed top-0 left-0 h-screen w-full backdrop-blur-sm flex justify-center items-center z-20 px-4 md:px-0">
		<div class="rounded-lg shadow-lg bg-gray-900 w-[28rem]">
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps<{ isOpen: boolean }>();
</script>
