<template>
	<div>
		<SectionsIntro />
		<SectionsStats
			:character-count="characters?._paginate?.total ?? 0"
			:group-count="groups?._paginate?.total ?? 0" />
		<SectionsFreeOpenSource />
		<SectionsGettingStarted />
		<SectionsCharacters :characters="characters?.data || []" />
		<SectionsNenExplorer />
		<SectionsHero :details="api_key_hero" />
		<SectionsRandomCharacter />
		<SectionsGroups :groups="groups?.data || []" />
		<SectionsFeatures />
		<SectionsCodeSnippet />
	</div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app';

const SITE_URL = 'https://hxh.eugenebadato.com';
const OG_IMAGE = `${SITE_URL}/img/og.jpeg`;
const TITLE = 'HxH API — Free Hunter x Hunter REST API';
const DESCRIPTION =
	'The #1 free Hunter x Hunter REST API. Get JSON data for HxH characters, Nen types, groups, and abilities. No cost, no credit card — generate your API key in seconds.';

useHead({
	title: TITLE,
	link: [{ rel: 'canonical', href: SITE_URL }],
	script: [
		{
			type: 'application/ld+json',
			innerHTML: JSON.stringify({
				'@context': 'https://schema.org',
				'@type': 'WebSite',
				name: 'HxH API',
				alternateName: 'Hunter x Hunter API',
				url: SITE_URL,
				description: DESCRIPTION,
				potentialAction: {
					'@type': 'SearchAction',
					target: `${SITE_URL}/characters?search={search_term_string}`,
					'query-input': 'required name=search_term_string'
				}
			})
		},
		{
			type: 'application/ld+json',
			innerHTML: JSON.stringify({
				'@context': 'https://schema.org',
				'@type': 'SoftwareApplication',
				name: 'HxH API',
				alternateName: 'Hunter x Hunter REST API',
				url: SITE_URL,
				applicationCategory: 'DeveloperApplication',
				operatingSystem: 'All',
				description: DESCRIPTION,
				screenshot: OG_IMAGE,
				featureList: [
					'Free REST API for Hunter x Hunter data',
					'Character profiles with Nen types',
					'Group and faction data',
					'Filter, sort, and paginate results',
					'Random character endpoint',
					'API key authentication'
				],
				offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
				creator: {
					'@type': 'Person',
					name: 'Eugene Paul Badato',
					url: 'https://eugenebadato.com'
				}
			})
		},
		{
			type: 'application/ld+json',
			innerHTML: JSON.stringify({
				'@context': 'https://schema.org',
				'@type': 'FAQPage',
				mainEntity: [
					{
						'@type': 'Question',
						name: 'What is the HxH API?',
						acceptedAnswer: {
							'@type': 'Answer',
							text: 'The HxH API is a free, open-source REST API that provides structured JSON data for the Hunter x Hunter anime and manga universe, including characters, Nen types, groups, and abilities.'
						}
					},
					{
						'@type': 'Question',
						name: 'Is the Hunter x Hunter API free to use?',
						acceptedAnswer: {
							'@type': 'Answer',
							text: 'Yes. The HxH API is completely free to use with no usage fees. Simply register with your email to receive an API key instantly.'
						}
					},
					{
						'@type': 'Question',
						name: 'How do I get an HxH API key?',
						acceptedAnswer: {
							'@type': 'Answer',
							text: 'Visit hxh.eugenebadato.com, click "Get API Key", enter your email address, and verify your email. Your unique API key will be generated automatically.'
						}
					},
					{
						'@type': 'Question',
						name: 'What data does the Hunter x Hunter API provide?',
						acceptedAnswer: {
							'@type': 'Answer',
							text: 'The API provides data on HxH characters (name, Nen type, abilities, state, professions, groups), factions/groups, and supports filtering, sorting, pagination, and field projection.'
						}
					}
				]
			})
		}
	]
});

useSeoMeta({
	title: TITLE,
	ogTitle: TITLE,
	description: DESCRIPTION,
	ogDescription: DESCRIPTION,
	keywords:
		'hxh api, hunter x hunter api, free hxh api, hxh rest api, hunter x hunter rest api, anime api, hxh characters api, gon freecss api, killua zoldyck api, kurapika api, nen types api, free anime rest api, hunter x hunter json api, hxh database api',
	ogImage: OG_IMAGE,
	ogImageWidth: '1200',
	ogImageHeight: '630',
	ogImageAlt: 'HxH API — Free Hunter x Hunter REST API',
	ogUrl: SITE_URL,
	ogType: 'website',
	twitterCard: 'summary_large_image',
	twitterTitle: TITLE,
	twitterDescription: 'Free REST API for the Hunter x Hunter universe. Characters, Nen types, groups — clean JSON, instant access.',
	twitterImage: OG_IMAGE,
	articleAuthor: 'Eugene Paul Badato'
});

const AppStore = useAppStore();

const api_key_hero = ref({
	image: '/img/api_img.svg',
	title: `Adding <span class="text-primary">API Key</span> To Your Request`,
	sub_title: `With the convenience of our hassle-free API key generation, accessing the API becomes a seamless and effortless experience.`,
	button: {
		label: 'Generate Api key',
		fn: () => AppStore.toggleRegistrationForm()
	},
	is_reverse: false
});

const { data: characters } = await useFetch(`${import.meta.env.VITE_HXH_BASE_URL}/characters`, {
	query: { sort: 'createdAt', limit: 10 },
	headers: { 'x-api-key': import.meta.env.VITE_HXH_API_KEY },
	server: false
});

const { data: groups } = await useFetch(`${import.meta.env.VITE_HXH_BASE_URL}/groups`, {
	query: { sort: 'createdAt', limit: 50 },
	headers: { 'x-api-key': import.meta.env.VITE_HXH_API_KEY },
	server: false
});
</script>
