<template>
	<section class="md:my-40 my-20">
		<!-- Section header -->
		<div class="mb-12">
			<span class="font-bebas text-primary tracking-[0.3em] text-sm uppercase block mb-1">What You Get</span>
			<h2 class="font-bebas text-5xl md:text-6xl text-white tracking-wide leading-none mb-4">
				BUILT FOR <span class="text-primary">DEVELOPERS</span>
			</h2>
			<p class="text-gray-400 max-w-xl">
				Everything you'd expect from a production REST API — filter, sort, paginate, and explore — all without writing a single line of backend code.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			<div
				v-for="feat in features"
				:key="feat.title"
				class="clip-corner-tr relative bg-dark_light border border-gray-800 p-6 flex flex-col gap-3 hover:border-primary/40 transition-all duration-500 overflow-hidden group">

				<!-- Top accent line -->
				<div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent group-hover:via-primary/60 transition-all duration-500"></div>

				<!-- Icon -->
				<div class="w-12 h-12 flex items-center justify-center bg-dark border border-gray-800 group-hover:border-primary/30 transition-all duration-500 text-2xl">
					{{ feat.icon }}
				</div>

				<h3 class="font-bebas text-xl tracking-wide text-white">{{ feat.title }}</h3>
				<p class="text-gray-400 text-sm leading-relaxed">{{ feat.description }}</p>
				<code
					v-if="feat.example"
					class="mt-1 text-xs text-primary font-mono bg-dark px-3 py-2 border border-gray-800 block">
					{{ feat.example }}
				</code>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
const features = [
	{
		icon: '⚡',
		title: 'Filter Any Field',
		description:
			'Query characters by name, Nen type, state, gender, or any field in the schema using flexible operator syntax.',
		example: '?nen_type=transmutation&state=alive'
	},
	{
		icon: '↕',
		title: 'Sort Results',
		description: 'Order data by any field, ascending or descending, using a simple comma-separated sort param.',
		example: '?sort=-createdAt,name'
	},
	{
		icon: '📄',
		title: 'Pagination',
		description:
			'Every list endpoint is paginated. Response includes total count and page info so you can build infinite scroll or classic paging.',
		example: '?page=2&limit=10'
	},
	{
		icon: '🎲',
		title: 'Random Endpoint',
		description:
			'Hit /characters/random or /groups/random to surface a random entry — great for discovery features and easter eggs.',
		example: 'GET /characters/random'
	},
	{
		icon: '🔎',
		title: 'Field Projection',
		description:
			'Only fetch the fields you need. Reduce payload size by specifying a comma-separated list of fields.',
		example: '?fields=name,nen_type,image'
	},
	{
		icon: '🔗',
		title: 'Relational Data',
		description:
			'Characters include their groups, relatives, and images as populated references — not just raw IDs.',
		example: 'groups, relatives, image'
	}
];
</script>
