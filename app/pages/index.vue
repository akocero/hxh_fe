<template>
	<div>
		<SectionsIntro />
		<SectionsCharacters :characters="characters?.data || []" />
		<SectionsHero :details="api_key_hero" />
		<SectionsPlayground />
		<SectionsGroups :groups="groups?.data || []" />
		<SectionsHero :details="json_hero" />
	</div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app';

useHead({
	title: 'Hunter x Hunter API — Free HxH REST API',
	link: [{ rel: 'canonical', href: 'https://hxh.eugenebadato.com' }],
	script: [
		{
			type: 'application/ld+json',
			innerHTML: JSON.stringify({
				'@context': 'https://schema.org',
				'@type': 'WebSite',
				name: 'Hunter x Hunter API',
				url: 'https://hxh.eugenebadato.com',
				description:
					'A free REST API for accessing Hunter x Hunter anime and manga data including characters, groups, and lore.',
				potentialAction: {
					'@type': 'SearchAction',
					target: 'https://hxh.eugenebadato.com/characters?search={search_term_string}',
					'query-input': 'required name=search_term_string'
				}
			})
		},
		{
			type: 'application/ld+json',
			innerHTML: JSON.stringify({
				'@context': 'https://schema.org',
				'@type': 'SoftwareApplication',
				name: 'Hunter x Hunter API',
				url: 'https://hxh.eugenebadato.com',
				applicationCategory: 'DeveloperApplication',
				operatingSystem: 'All',
				description:
					'A free and open-source REST API providing structured JSON data for Hunter x Hunter characters, groups, Nen abilities, and more.',
				offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
				creator: {
					'@type': 'Person',
					name: 'Eugene Paul Badato',
					url: 'https://eugenebadato.com'
				}
			})
		}
	]
});

useSeoMeta({
	title: 'Hunter x Hunter API — Free HxH REST API',
	ogTitle: 'Hunter x Hunter API — Free HxH REST API',
	description:
		'Explore the Hunter x Hunter universe with a free REST API. Access character profiles, group affiliations, and deep lore — equip yourself with an API key and start your hunt.',
	ogDescription:
		'Explore the Hunter x Hunter universe with a free REST API. Access character profiles, group affiliations, and deep lore — equip yourself with an API key and start your hunt.',
	keywords:
		'hunter x hunter api, hxh api, anime api, hunter x hunter rest api, hxh characters api, gon killua kurapika api, free anime api',
	ogImage: 'https://hxh.eugenebadato.com/img/og_img.png',
	ogUrl: 'https://hxh.eugenebadato.com',
	ogType: 'website',
	ogSiteName: 'Hunter x Hunter API',
	twitterCard: 'summary_large_image',
	twitterTitle: 'Hunter x Hunter API — Free HxH REST API',
	twitterDescription:
		'A free REST API for the HxH universe. Access character profiles, group data, and lore in clean JSON format.',
	twitterImage: 'https://hxh.eugenebadato.com/img/og_img.png'
});

const AppStore = useAppStore();

const api_key_hero = ref({
	image: '/img/api_img.svg',
	title: `Adding <span class="text-red-600">API Key</span> To Your Request`,
	sub_title: `With the convenience of our hassle-free API key generation, accessing the API becomes a seamless and effortless experience.`,
	button: {
		label: 'Generate Api key',
		fn: () => AppStore.toggleRegistrationForm()
	},
	is_reverse: false
});

const json_hero = ref({
	image: '/img/json_img.svg',
	title: `Detailed <span class="text-red-600">JSON</span> Response`,
	sub_title: `The JSON response provides an intricately detailed set of data, offering comprehensive insights for your needs.`,
	button: {
		label: 'Documentation',
		fn: () => window.open('https://github.com/akocero/hxh_api_docs', '_blank')
	},
	is_reverse: true
});

const { data: characters } = await useFetch(`${import.meta.env.VITE_HXH_BASE_URL}/characters`, {
	query: { sort: 'createdAt', limit: 20 },
	headers: { 'x-api-key': import.meta.env.VITE_HXH_API_KEY },
	server: false
});

const { data: groups } = await useFetch(`${import.meta.env.VITE_HXH_BASE_URL}/groups`, {
	query: { sort: 'createdAt', limit: 20 },
	headers: { 'x-api-key': import.meta.env.VITE_HXH_API_KEY },
	server: false
});
</script>
