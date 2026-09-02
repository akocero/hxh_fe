<template>
	<div>
		<div v-for="chr in characters?.data" :key="chr._id">
			{{ chr.name }}
		</div>
	</div>
</template>

<script setup lang="ts">
useHead({
	title: 'Hunter x Hunter Characters — HxH API',
	link: [{ rel: 'canonical', href: 'https://hxh.eugenebadato.com/characters' }]
});

useSeoMeta({
	title: 'Hunter x Hunter Characters — HxH API',
	ogTitle: 'Hunter x Hunter Characters — HxH API',
	description:
		'Browse the full Hunter x Hunter character database via API. Get JSON data on Gon, Killua, Kurapika, Leorio, and hundreds more HxH characters.',
	ogDescription:
		'Browse the full Hunter x Hunter character database via API. Get JSON data on Gon, Killua, Kurapika, Leorio, and hundreds more HxH characters.',
	keywords:
		'hunter x hunter characters, hxh characters api, gon freecss, killua zoldyck, kurapika, leorio, hxh character list',
	ogImage: 'https://hxh.eugenebadato.com/img/og_img.png',
	ogUrl: 'https://hxh.eugenebadato.com/characters',
	ogType: 'website',
	twitterCard: 'summary_large_image',
	twitterTitle: 'Hunter x Hunter Characters — HxH API',
	twitterDescription:
		'Browse the full Hunter x Hunter character database. Get detailed JSON data via the free HxH REST API.'
});

const { data: characters } = await useFetch(`${import.meta.env.VITE_HXH_BASE_URL}/characters`, {
	key: 'characters-list',
	query: { sort: 'createdAt', limit: 20 },
	headers: { 'x-api-key': import.meta.env.VITE_HXH_API_KEY }
});
</script>
