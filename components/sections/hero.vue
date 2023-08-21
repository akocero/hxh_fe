<template>
	<section
		class="max-w-screen-xl mx-auto md:my-56 my-32 px-2 md:px-0"
		v-if="details">
		<div
			class="flex flex-col md:flex-row justify-between items-center"
			:class="[details.is_reverse && 'md:flex-row-reverse']">
			<div class="mb-10">
				<img :src="details.image" alt="" class="rounded-xl -rotate-3" />
			</div>
			<div class="max-w-lg">
				<h2
					class="text-2xl md:text-4xl font-sans mb-4 font-extrabold uppercase"
					v-html="details.title"></h2>
				<p class="text-gray-400">
					{{ details.sub_title }}
				</p>
				<div class="mt-10 h-10 flex items-end">
					<button
						@click="details.button.fn"
						class="rounded-lg font-semibold bg-gray-800 text-gray-50 px-8 py-3 hover:bg-gray-700">
						{{ details.button.label }}
					</button>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
defineProps({
	details: Object
});
</script>

<style lang="scss" scoped></style>
