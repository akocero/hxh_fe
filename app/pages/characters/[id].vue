<template>
	<div>
		<p>Character ID is {{ id }}</p>
	</div>
</template>

<script setup lang="ts">
const route = useRoute();
const { id } = route.params;

const { data: character } = await useFetch(
	`${import.meta.env.VITE_HXH_BASE_URL}/characters/${id}`,
	{
		key: `character-${id}`,
		headers: { 'x-api-key': import.meta.env.VITE_HXH_API_KEY }
	}
);

const characterName = computed(() => (character.value as any)?.data?.name ?? 'Character');
const characterDesc = computed(
	() =>
		(character.value as any)?.data?.about ??
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
	keywords: computed(
		() =>
			`${characterName.value}, hunter x hunter ${characterName.value}, hxh character, hxh api`
	),
	ogImage: 'https://hxh.eugenebadato.com/img/og_img.png',
	ogUrl: canonicalUrl,
	ogType: 'website',
	twitterCard: 'summary_large_image',
	twitterTitle: computed(() => `${characterName.value} — Hunter x Hunter API`),
	twitterDescription: computed(() => characterDesc.value)
});
</script>
