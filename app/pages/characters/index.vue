<template>
	<div class="py-10 md:py-16">

		<!-- Header -->
		<div class="mb-10">
			<NuxtLink to="/" class="inline-flex items-center gap-2 text-xs text-gray-600 hover:text-gray-400 font-bold uppercase tracking-wider mb-6 transition-colors">
				← Home
			</NuxtLink>
			<span class="font-bebas text-primary tracking-[0.3em] text-sm uppercase block mb-1">The Cast</span>
			<h1 class="font-bebas text-5xl md:text-7xl leading-none tracking-wide">CHARACTERS</h1>
		</div>

		<!-- Nen type filters -->
		<div class="flex flex-wrap gap-2 mb-8">
			<button
				v-for="f in nenFilters"
				:key="f.value"
				@click="setFilter(f.value)"
				class="px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] border transition-all duration-200"
				:class="activeFilter === f.value
					? 'border-primary bg-primary/10 text-primary'
					: 'border-gray-800 text-gray-500 hover:border-gray-600 hover:text-gray-300'">
				{{ f.label }}
			</button>
		</div>

		<!-- Loading skeleton -->
		<div v-if="pending" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
			<div v-for="n in 20" :key="n" class="aspect-[3/4] bg-dark_light animate-pulse"></div>
		</div>

		<!-- Grid -->
		<div v-else-if="displayedCharacters.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
			<NuxtLink
				v-for="chr in displayedCharacters"
				:key="chr._id"
				:to="`/characters/${chr._id}`"
				class="group">
				<div class="relative overflow-hidden bg-dark_light border border-gray-800/60 group-hover:border-primary/40 transition-all duration-500">
					<div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
					<div class="aspect-[3/4] overflow-hidden">
						<img v-if="chr.image?.length"
							:src="chr.image[0].secure_url"
							:alt="chr.name"
							class="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700" />
						<div v-else class="w-full h-full bg-dark_light flex items-center justify-center text-gray-700 text-5xl">?</div>
					</div>
					<div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark via-dark/80 to-transparent p-3 pt-8">
						<h3 class="text-sm font-bold text-white capitalize truncate">{{ chr.name }}</h3>
						<p v-if="nenType(chr)" class="text-xs text-primary capitalize font-semibold mt-0.5">{{ nenType(chr) }}</p>
					</div>
				</div>
			</NuxtLink>
		</div>

		<!-- Empty -->
		<div v-else class="py-20 text-center text-gray-500 border border-gray-800">
			No characters found for this Nen type.
		</div>

		<!-- Load more -->
		<div v-if="hasMore && !pending" class="mt-10 text-center">
			<button
				@click="loadMore"
				:disabled="loadingMore"
				class="inline-flex items-center gap-2 px-8 py-4 border border-gray-700 text-gray-400 font-bold uppercase tracking-[0.12em] text-sm hover:border-primary hover:text-primary transition-all duration-300 disabled:opacity-40">
				{{ loadingMore ? 'Loading...' : 'Load More' }}
			</button>
		</div>

		<!-- Total -->
		<p v-if="!pending && totalCount" class="mt-6 text-center text-gray-600 text-xs uppercase tracking-wider">
			Showing {{ displayedCharacters.length }} of {{ totalCount }} characters
		</p>
	</div>
</template>

<script setup lang="ts">
useHead({
	title: 'Hunter x Hunter Characters — HxH API',
	link: [{ rel: 'canonical', href: 'https://hxh.eugenebadato.com/characters' }]
});
useSeoMeta({
	title: 'HxH Characters — Hunter x Hunter Character Database | HxH API',
	ogTitle: 'HxH Characters — Hunter x Hunter Character Database | HxH API',
	description: 'Browse all Hunter x Hunter characters via the free HxH REST API. Filter by Nen type, view full profiles for Gon, Killua, Kurapika, Leorio, Hisoka, and 200+ more.',
	ogDescription: 'Browse all Hunter x Hunter characters via the free HxH REST API. Filter by Nen type, view full profiles for Gon, Killua, Kurapika, Leorio, Hisoka, and 200+ more.',
	keywords: 'hxh characters, hunter x hunter characters, hxh character list, gon freecss, killua zoldyck, kurapika, leorio paradinight, hisoka morow, nen types, hxh api characters',
	ogImage: 'https://hxh.eugenebadato.com/img/og.jpeg',
	ogImageWidth: '1200',
	ogImageHeight: '630',
	ogUrl: 'https://hxh.eugenebadato.com/characters',
	ogType: 'website',
	twitterCard: 'summary_large_image'
});

const nenFilters = [
	{ label: 'All', value: '' },
	{ label: 'Enhancement', value: 'enhancement' },
	{ label: 'Transmutation', value: 'transmutation' },
	{ label: 'Emission', value: 'emission' },
	{ label: 'Manipulation', value: 'manipulation' },
	{ label: 'Conjuration', value: 'conjuration' },
	{ label: 'Specialization', value: 'specialization' },
];

const activeFilter = ref('');
const page = ref(1);
const limit = 20;
const allCharacters = ref<any[]>([]);
const totalCount = ref(0);
const loadingMore = ref(false);

const query = computed(() => ({
	sort: 'createdAt',
	limit,
	page: 1,
	...(activeFilter.value ? { nen_type: activeFilter.value } : {})
}));

const { data: characters, pending } = await useFetch(`${import.meta.env.VITE_HXH_BASE_URL}/characters`, {
	key: 'characters-list',
	query,
	headers: { 'x-api-key': import.meta.env.VITE_HXH_API_KEY },
	watch: [activeFilter]
});

watch(characters, (val) => {
	allCharacters.value = val?.data ?? [];
	totalCount.value = val?._paginate?.total ?? 0;
	page.value = 1;
}, { immediate: true });

const displayedCharacters = computed(() => allCharacters.value);
const hasMore = computed(() => allCharacters.value.length < totalCount.value);

async function setFilter(val: string) {
	activeFilter.value = val;
	allCharacters.value = [];
	page.value = 1;
}

async function loadMore() {
	loadingMore.value = true;
	page.value++;
	try {
		const res = await $fetch<any>(`${import.meta.env.VITE_HXH_BASE_URL}/characters`, {
			headers: { 'x-api-key': import.meta.env.VITE_HXH_API_KEY },
			query: {
				sort: 'createdAt',
				limit,
				page: page.value,
				...(activeFilter.value ? { nen_type: activeFilter.value } : {})
			}
		});
		allCharacters.value = [...allCharacters.value, ...(res?.data ?? [])];
		totalCount.value = res?._paginate?.total ?? totalCount.value;
	} finally {
		loadingMore.value = false;
	}
}

function nenType(chr: any): string {
	const t = chr.nen_type;
	if (!t) return '';
	if (Array.isArray(t)) return t[0] ?? '';
	return t;
}
</script>
