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

<script setup>
import { useAppStore } from '@/stores/appStore';

useHead({
	title: 'HXH API | Open Source API'
});

useSeoMeta({
	title: 'Hunter x Hunter Database API',
	ogTitle: 'Hunter x Hunter Database API',
	description: `Welcome to the Hunter X Hunter API! This guide is your key to
				exploring the world of HTTP requests in the Hunter X Hunter
				universe. Before you embark on your data-gathering quest.`,
	ogDescription: `Welcome to the Hunter X Hunter API! This guide is your key to
				exploring the world of HTTP requests in the Hunter X Hunter
				universe. Before you embark on your data-gathering quest.`,
	ogImage: '/img/og_img.png',
	twitterCard: 'summary_large_image'
});

const AppStore = useAppStore();
const api_key_hero = ref({
	image: '/img/api_img.svg',
	title: `Adding
					<span class="text-red-600">API Key</span>
					To Your Request`,
	sub_title: `With the convenience of our hassle-free API key generation,
					accessing the API becomes a seamless and effortless
					experience.`,
	button: {
		label: 'Generate Api key',
		fn: () => {
			AppStore.toggleRegistrationForm();
		}
	},
	is_reverse: false
});

const json_hero = ref({
	image: '/img/json_img.svg',
	title: `Detailed
					<span class="text-red-600">JSON</span>
					Response`,
	sub_title: `The JSON response provides an intricately detailed set of
					data, offering comprehensive insights for your needs.`,
	button: {
		label: 'Documentation',
		fn: () => {
			window.open('https://github.com/akocero/hxh_api_docs', '_blank');
		}
	},
	is_reverse: true
});

const fetchData = async (endpoint) => {
	const url = `${
		import.meta.env.VITE_HXH_BASE_URL
	}/api/v1${endpoint}?sort=createdAt&limit=10&api_key=${
		import.meta.env.VITE_HXH_API_KEY
	}`;
	const { data } = await useFetch(url);

	return data;
};

const characters = await fetchData('/characters');
const groups = await fetchData('/groups');
</script>
