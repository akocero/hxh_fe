<template>
	<div class="py-10 md:py-16">

		<!-- Back link -->
		<NuxtLink to="/characters"
			class="inline-flex items-center gap-2 text-xs text-gray-600 hover:text-gray-400 font-bold uppercase tracking-wider mb-8 transition-colors">
			← All Characters
		</NuxtLink>

		<!-- Loading -->
		<div v-if="pending" class="flex flex-col md:flex-row gap-10">
			<div class="w-full md:w-72 aspect-[3/4] bg-dark_light animate-pulse flex-shrink-0"></div>
			<div class="flex-1 space-y-4 pt-4">
				<div class="h-10 bg-dark_light animate-pulse w-2/3 rounded"></div>
				<div class="h-4 bg-dark_light animate-pulse w-1/3 rounded"></div>
				<div class="h-4 bg-dark_light animate-pulse w-1/2 rounded"></div>
				<div class="h-32 bg-dark_light animate-pulse rounded mt-6"></div>
			</div>
		</div>

		<!-- Character -->
		<div v-else-if="chr" class="flex flex-col md:flex-row gap-10 md:gap-16">

			<!-- Left: Image -->
			<div class="flex-shrink-0 w-full md:w-64 lg:w-72">
				<div class="relative overflow-hidden border border-gray-800/60 bg-dark_light">
					<!-- Top accent -->
					<div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent z-10"></div>
					<div class="aspect-[3/4]">
						<img v-if="chr.image?.length"
							:src="chr.image[0].secure_url"
							:alt="chr.name"
							class="w-full h-full object-cover object-top" />
						<div v-else class="w-full h-full flex items-center justify-center text-gray-700 text-7xl">?</div>
					</div>
				</div>

				<!-- Additional images -->
				<div v-if="chr.image?.length > 1" class="grid grid-cols-4 gap-1 mt-1">
					<div v-for="(img, i) in chr.image.slice(1, 5)" :key="i"
						class="aspect-square overflow-hidden bg-dark_light border border-gray-800/40">
						<img :src="img.secure_url" :alt="chr.name" class="w-full h-full object-cover object-top" />
					</div>
				</div>
			</div>

			<!-- Right: Details -->
			<div class="flex-1 min-w-0">

				<!-- Name -->
				<h1 class="font-bebas text-4xl md:text-6xl lg:text-7xl leading-none tracking-wide capitalize mb-2">
					{{ chr.name }}
				</h1>
				<p v-if="chr.also_known_as?.length" class="text-gray-500 text-sm mb-6">
					Also known as: {{ chr.also_known_as.join(', ') }}
				</p>

				<!-- Badges row -->
				<div class="flex flex-wrap gap-2 mb-8">
					<span v-for="nen in nenTypes" :key="nen"
						class="px-3 py-1.5 text-xs font-bold uppercase tracking-[0.15em] border border-primary/50 bg-primary/10 text-primary">
						{{ nen }}
					</span>
					<span v-if="chr.state"
						class="px-3 py-1.5 text-xs font-bold uppercase tracking-[0.15em] border"
						:class="chr.state === 'alive'
							? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
							: 'border-gray-700 bg-gray-800/40 text-gray-400'">
						{{ chr.state }}
					</span>
					<span v-for="prof in (chr.professions ?? [])" :key="prof"
						class="px-3 py-1.5 text-xs font-bold uppercase tracking-[0.15em] border border-gray-700 text-gray-400">
						{{ prof }}
					</span>
				</div>

				<!-- About -->
				<div v-if="chr.about || chr.details" class="mb-8">
					<h2 class="font-bebas text-2xl tracking-wide text-gray-300 mb-3 flex items-center gap-3">
						About
						<div class="flex-1 h-px bg-gray-800"></div>
					</h2>
					<p class="text-gray-400 leading-relaxed">{{ chr.about || chr.details }}</p>
				</div>

				<!-- Abilities -->
				<div v-if="chr.abilities?.length" class="mb-8">
					<h2 class="font-bebas text-2xl tracking-wide text-gray-300 mb-3 flex items-center gap-3">
						Abilities
						<div class="flex-1 h-px bg-gray-800"></div>
					</h2>
					<div class="flex flex-wrap gap-2">
						<span v-for="ability in chr.abilities" :key="ability"
							class="px-3 py-1.5 text-xs font-semibold bg-dark_light border border-gray-800 text-gray-300 capitalize hover:border-primary/40 hover:text-primary transition-all duration-200">
							{{ ability }}
						</span>
					</div>
				</div>

				<!-- Groups -->
				<div v-if="chr.groups?.length" class="mb-8">
					<h2 class="font-bebas text-2xl tracking-wide text-gray-300 mb-3 flex items-center gap-3">
						Groups
						<div class="flex-1 h-px bg-gray-800"></div>
					</h2>
					<div class="flex flex-wrap gap-2">
						<span v-for="grp in chr.groups" :key="grp._id ?? grp"
							class="px-3 py-1.5 text-xs font-semibold bg-dark_light border border-gray-800 text-gray-300 capitalize">
							{{ grp.name ?? grp }}
						</span>
					</div>
				</div>

				<!-- Relatives -->
				<div v-if="chr.relatives?.length" class="mb-8">
					<h2 class="font-bebas text-2xl tracking-wide text-gray-300 mb-3 flex items-center gap-3">
						Relatives
						<div class="flex-1 h-px bg-gray-800"></div>
					</h2>
					<div class="flex flex-wrap gap-2">
						<NuxtLink v-for="rel in chr.relatives" :key="rel._id ?? rel"
							:to="rel._id ? `/characters/${rel._id}` : '#'"
							class="px-3 py-1.5 text-xs font-semibold bg-dark_light border border-gray-800 text-gray-300 hover:border-primary/40 hover:text-primary transition-all duration-200 capitalize">
							{{ rel.name ?? rel }}
						</NuxtLink>
					</div>
				</div>

				<!-- Gender / Birthday -->
				<div v-if="chr.gender || chr.birthday" class="flex flex-wrap gap-6 text-sm">
					<div v-if="chr.gender">
						<span class="text-gray-600 uppercase tracking-widest text-xs font-bold block mb-1">Gender</span>
						<span class="text-gray-300 capitalize">{{ chr.gender }}</span>
					</div>
					<div v-if="chr.birthday">
						<span class="text-gray-600 uppercase tracking-widest text-xs font-bold block mb-1">Birthday</span>
						<span class="text-gray-300">{{ chr.birthday }}</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Not found -->
		<div v-else class="py-32 text-center">
			<p class="text-gray-500 font-bebas text-3xl tracking-wide">Character not found</p>
			<NuxtLink to="/characters" class="mt-6 inline-block text-primary hover:underline text-sm font-bold uppercase tracking-wider">
				← Back to Characters
			</NuxtLink>
		</div>
	</div>
</template>

<script setup lang="ts">
const route = useRoute();
const { id } = route.params;

const { data: result, pending } = await useFetch(
	`${import.meta.env.VITE_HXH_BASE_URL}/characters/${id}`,
	{
		key: `character-${id}`,
		headers: { 'x-api-key': import.meta.env.VITE_HXH_API_KEY }
	}
);

const chr = computed(() => (result.value as any)?.data ?? null);

const nenTypes = computed(() => {
	const t = chr.value?.nen_type;
	if (!t) return [];
	return Array.isArray(t) ? t : [t];
});

const characterName = computed(() => chr.value?.name ?? 'Character');
const characterDesc = computed(
	() => chr.value?.about ?? chr.value?.details ??
		`View detailed data for ${characterName.value} from Hunter x Hunter via the free HxH REST API.`
);
const canonicalUrl = computed(() => `https://hxh.eugenebadato.com/characters/${id}`);

useHead({
	title: computed(() => `${characterName.value} — Hunter x Hunter API`),
	link: [{ rel: 'canonical', href: canonicalUrl }]
});

useSeoMeta({
	title: computed(() => `${characterName.value} — Hunter x Hunter API`),
	ogTitle: computed(() => `${characterName.value} — Hunter x Hunter API`),
	description: computed(() => characterDesc.value),
	ogDescription: computed(() => characterDesc.value),
	keywords: computed(() => `${characterName.value}, hunter x hunter ${characterName.value}, hxh character, hxh api`),
	ogImage: computed(() => chr.value?.image?.[0]?.secure_url ?? 'https://hxh.eugenebadato.com/img/og.jpeg'),
	ogUrl: canonicalUrl,
	ogType: 'website',
	twitterCard: 'summary_large_image',
	twitterTitle: computed(() => `${characterName.value} — Hunter x Hunter API`),
	twitterDescription: computed(() => characterDesc.value)
});
</script>
