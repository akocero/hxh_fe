<template>
	<Teleport to="body">
		<Transition name="modal">
			<div
				v-if="isOpen"
				class="fixed inset-0 z-50 flex items-center justify-center px-4"
				@click.self="$emit('close')">
				<!-- Backdrop -->
				<div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
				<!-- Panel -->
				<div class="relative clip-corner-tr bg-dark_light border border-gray-800 w-full max-w-md shadow-2xl">
					<!-- Top accent line -->
					<div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
					<slot />
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<script setup lang="ts">
defineProps<{ isOpen: boolean }>();
defineEmits(['close']);
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
	transition: opacity 0.2s ease, transform 0.2s ease;
}
.modal-enter-active .relative,
.modal-leave-active .relative {
	transition: transform 0.2s ease;
}
.modal-enter-from { opacity: 0; }
.modal-leave-to { opacity: 0; }
.modal-enter-from .relative { transform: scale(0.96) translateY(8px); }
.modal-leave-to .relative { transform: scale(0.96) translateY(8px); }
</style>
