<template>
	<div>
		<SectionsIntro />
		<SectionsCharacters :characters="characters" />
		<SectionsHero
			:details="api_key_hero"
			@clickCTA="AppStore.toggleRegistrationForm" />
		<SectionsGroups :groups="groups" />
		<SectionsHero :details="json_hero" />
	</div>
</template>

<script setup>
import { useAppStore } from '@/stores/appStore';
useHead({
	title: 'HxH API | Open Source API'
});
const AppStore = useAppStore();
const characters = ref([]);
const groups = ref([]);
const api_key_hero = ref({
	image: '/img/api_img.svg',
	title: `Adding
					<span class="text-red-600">API Key</span>
					To Your Request`,
	sub_title: `With the convenience of our hassle-free API key generation,
					accessing the API becomes a seamless and effortless
					experience.`,
	button: {
		label: 'Generate Api key'
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
		link: 'https://github.com/akocero/hxh_api_docs',
		label: 'Documentation'
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

	return data.value?.data;
};

characters.value = await fetchData('/characters');
groups.value = await fetchData('/groups');
</script>

<style lang="scss" scoped></style>
