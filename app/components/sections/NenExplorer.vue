<template>
	<section class="md:my-40 my-20">
		<!-- Section header -->
		<div class="mb-10">
			<span class="font-bebas text-primary tracking-[0.3em] text-sm uppercase block mb-1">Aura System</span>
			<h2 class="font-bebas text-5xl md:text-6xl text-white tracking-wide leading-none">NEN TYPES</h2>
			<p class="text-gray-400 mt-3 max-w-xl">
				Every Hunter channels their aura differently. Click a type to see its users — or query them yourself with
				<code class="text-primary text-sm font-mono">?nen_type=enhancement</code>.
			</p>
		</div>

		<!-- Nen type cards -->
		<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
			<button
				v-for="nen in nenTypes"
				:key="nen.slug"
				@click="selectNen(nen.slug)"
				class="clip-corner-tr-sm text-left bg-dark_light border p-5 md:p-6 flex flex-col gap-3 transition-all duration-300 relative overflow-hidden group"
				:class="selected === nen.slug
					? 'border-primary/60 shadow-lg shadow-primary/10'
					: 'border-gray-800 hover:border-gray-600'">

				<!-- Top accent line on selected -->
				<div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent transition-all duration-300"
					:class="selected === nen.slug ? 'via-primary' : 'via-gray-700 group-hover:via-gray-500'"></div>

				<!-- Corner glow on selected -->
				<div v-if="selected === nen.slug"
					class="absolute top-0 right-0 w-8 h-8 blur-lg"
					:class="nen.dot.replace('bg-', 'bg-') + ' opacity-60'"></div>

				<div class="flex items-center gap-3">
					<span class="w-2.5 h-2.5 rounded-full flex-shrink-0" :class="nen.dot"></span>
					<h3 class="font-bebas text-xl tracking-wide">{{ nen.name }}</h3>
					<span v-if="selected === nen.slug" class="ml-auto text-primary text-xs font-bold uppercase tracking-wider">Active</span>
				</div>
				<p class="text-gray-400 text-sm leading-relaxed">{{ nen.description }}</p>
				<span class="inline-block text-xs font-mono px-2 py-1 bg-dark text-gray-400 border border-gray-800">
					{{ nen.notable }}
				</span>
			</button>
		</div>

		<!-- Character results -->
		<Transition name="slide-down">
			<div v-if="selected" class="mt-12">
				<div class="flex items-center justify-between mb-6">
					<h3 class="font-bebas text-3xl md:text-4xl tracking-wide">
						<span :class="activeNen?.dot.replace('bg-', 'text-')">{{ activeNen?.name }}</span>
						<span class="text-white"> Users</span>
						<span v-if="!loading && characters.length" class="text-gray-500 text-xl font-normal ml-2">
							({{ characters.length }})
						</span>
					</h3>
					<button @click="selected = null; characters = []"
						class="text-gray-500 hover:text-gray-300 text-xs transition-colors font-bold uppercase tracking-wider border border-gray-800 hover:border-gray-600 px-3 py-1.5">
						✕ Clear
					</button>
				</div>

				<!-- Loading -->
				<div v-if="loading" class="grid grid-cols-10 gap-x-4 gap-y-6">
					<div v-for="n in 10" :key="n" class="md:col-span-2 col-span-5">
						<div class="aspect-[3/4] bg-dark_light animate-pulse"></div>
						<div class="mt-3 space-y-2">
							<div class="h-3 bg-dark_light rounded animate-pulse w-3/4"></div>
							<div class="h-3 bg-dark_light rounded animate-pulse w-1/2"></div>
						</div>
					</div>
				</div>

				<!-- Results -->
				<div v-else-if="characters.length" class="grid grid-cols-10 gap-x-3 gap-y-6 md:gap-x-4 md:gap-y-8">
					<div v-for="chr in characters" :key="chr._id" class="group md:col-span-2 col-span-5">
						<div class="relative overflow-hidden bg-dark_light border border-gray-800/60 group-hover:border-primary/40 transition-all duration-500">
							<div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
							<div class="aspect-[3/4] overflow-hidden">
								<img v-if="chr.image?.length"
									:src="chr.image[0].secure_url"
									:alt="chr.name"
									class="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700" />
								<img v-else src="https://placehold.co/300x400/1c1c1c/555?text=?" :alt="chr.name" class="w-full h-full object-cover" />
							</div>
							<div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark via-dark/80 to-transparent p-3 pt-8">
								<h3 class="text-sm font-bold text-white capitalize truncate">{{ chr.name }}</h3>
								<p v-if="chr.also_known_as?.[0]" class="text-xs text-gray-500 capitalize truncate mt-0.5">({{ chr.also_known_as[0] }})</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Empty -->
				<div v-else class="text-center py-16 text-gray-500 border border-gray-800">
					No characters found for this Nen type yet.
				</div>
			</div>
		</Transition>
	</section>
</template>

<script setup lang="ts">
const selected = ref<string | null>(null);
const characters = ref<any[]>([]);
const loading = ref(false);

const nenTypes = [
	{
		slug: 'enhancement',
		name: 'Enhancement',
		dot: 'bg-red-500',
		description: "Amplifies the user's aura to strengthen their body and physical abilities. The most balanced type for combat.",
		notable: 'Gon · Uvogin · Phinks'
	},
	{
		slug: 'transmutation',
		name: 'Transmutation',
		dot: 'bg-blue-400',
		description: "Changes the properties of the user's aura to mimic the qualities of something else — electricity, fire, or any substance.",
		notable: 'Killua · Hisoka · Zeno'
	},
	{
		slug: 'emission',
		name: 'Emission',
		dot: 'bg-yellow-400',
		description: 'Allows the user to separate and project aura away from the body while maintaining control at great distances.',
		notable: 'Leorio · Razor · Shoot'
	},
	{
		slug: 'manipulation',
		name: 'Manipulation',
		dot: 'bg-green-400',
		description: 'Enables the user to control living or non-living things with their aura, bending the will of targets to their commands.',
		notable: 'Illumi · Shalnark · Morel'
	},
	{
		slug: 'conjuration',
		name: 'Conjuration',
		dot: 'bg-indigo-400',
		description: 'Allows the user to create physical, independent objects out of their aura that exist as long as aura is maintained.',
		notable: 'Kurapika · Kite · Knov'
	},
	{
		slug: 'specialization',
		name: 'Specialization',
		dot: 'bg-purple-400',
		description: "Unique abilities that don't fit any other category. Rare and unpredictable — often the most dangerous of all.",
		notable: 'Kurapika (Scarlet) · Neon · Chrollo'
	}
];

const activeNen = computed(() => nenTypes.find((n) => n.slug === selected.value));

async function selectNen(slug: string) {
	if (selected.value === slug) {
		selected.value = null;
		characters.value = [];
		return;
	}

	selected.value = slug;
	characters.value = [];
	loading.value = true;

	try {
		const res = await $fetch<any>(`${import.meta.env.VITE_HXH_BASE_URL}/characters`, {
			headers: { 'x-api-key': import.meta.env.VITE_HXH_API_KEY },
			query: { nen_type: slug, limit: 20 }
		});
		characters.value = res?.data ?? [];
	} catch {
		characters.value = [];
	} finally {
		loading.value = false;
	}
}
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
	transition: opacity 0.35s ease, transform 0.35s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
	opacity: 0;
	transform: translateY(-10px);
}
</style>
