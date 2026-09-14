<template>
	<section v-if="details" class="max-w-screen-xl mx-auto md:my-56 my-32 px-2 md:px-0">
		<div
			class="flex flex-col md:flex-row justify-between items-center"
			:class="[details.is_reverse && 'md:flex-row-reverse']">
			<div class="mb-10">
				<img :src="details.image" alt="" class="rounded-xl -rotate-3 shadow-xl" />
			</div>
			<div class="max-w-lg">
				<h2
					class="font-bebas text-4xl md:text-6xl leading-none tracking-wide mb-4"
					v-html="details.title"></h2>
				<p class="text-gray-400 leading-relaxed">{{ details.sub_title }}</p>
				<div class="mt-10">
					<button
						@click="details.button.fn"
						class="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold uppercase tracking-[0.12em] text-sm hover:bg-red-500 transition-colors duration-200 group"
						style="box-shadow: 0 0 24px rgba(200,30,30,0.3);">
						<span>{{ details.button.label }}</span>
						<span class="transition-transform group-hover:translate-x-1">→</span>
					</button>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
defineProps<{
	details: {
		image: string;
		title: string;
		sub_title: string;
		button: { label: string; fn: () => void };
		is_reverse: boolean;
	};
}>();
</script>
