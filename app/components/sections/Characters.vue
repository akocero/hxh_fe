<template>
	<section class="md:my-40 my-20">
		<!-- Section header -->
		<div class="flex items-end justify-between mb-10">
			<div>
				<span class="font-bebas text-primary tracking-[0.3em] text-sm uppercase block mb-1">The Cast</span>
				<h2 class="font-bebas text-5xl md:text-6xl text-white tracking-wide leading-none">CHARACTERS</h2>
			</div>
			<NuxtLink to="/characters"
				class="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-primary transition-colors font-bold uppercase tracking-[0.15em] pb-1 border-b border-gray-700 hover:border-primary">
				View All →
			</NuxtLink>
		</div>

		<!-- Character grid — 5 columns, 2 rows = 10 items -->
		<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
			<NuxtLink
				v-for="chr in characters"
				:key="chr._id"
				:to="`/characters/${chr._id}`"
				class="group">
				<div class="relative overflow-hidden bg-dark_light border border-gray-800/60 group-hover:border-primary/40 transition-all duration-500">
					<!-- Top border glow on hover -->
					<div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

					<!-- Image with 3:4 aspect ratio -->
					<div class="aspect-[3/4] overflow-hidden">
						<img v-if="chr.image?.length"
							:src="chr.image[0].secure_url"
							:alt="chr.name"
							class="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700" />
						<img v-else
							src="https://placehold.co/300x400/1c1c1c/555?text=?"
							:alt="chr.name"
							class="w-full h-full object-cover" />
					</div>

					<!-- Bottom gradient overlay -->
					<div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark via-dark/80 to-transparent p-3 pt-8">
						<h3 class="text-sm font-bold text-white capitalize truncate leading-tight">{{ chr.name }}</h3>
						<p v-if="nenType(chr)" class="text-xs text-primary capitalize font-semibold mt-0.5">{{ nenType(chr) }}</p>
						<p v-else-if="chr.also_known_as?.[0]" class="text-xs text-gray-500 capitalize mt-0.5 truncate">({{ chr.also_known_as[0] }})</p>
					</div>
				</div>
			</NuxtLink>
		</div>

		<!-- View all CTA -->
		<div class="mt-8 text-center">
			<NuxtLink to="/characters"
				class="inline-flex items-center gap-2 px-8 py-4 border border-gray-700 text-gray-400 font-bold uppercase tracking-[0.12em] text-sm hover:border-primary hover:text-primary transition-all duration-300 group">
				<span>View All Characters</span>
				<span class="transition-transform group-hover:translate-x-1">→</span>
			</NuxtLink>
		</div>
	</section>
</template>

<script setup lang="ts">
defineProps<{ characters: any[] }>();

function nenType(chr: any): string {
	const t = chr.nen_type;
	if (!t) return '';
	if (Array.isArray(t)) return t[0] ?? '';
	return t;
}
</script>
