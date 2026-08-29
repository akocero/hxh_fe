<template>
	<div>
		<div v-for="chr in characters?.data" :key="chr._id">
			{{ chr.name }}
		</div>
	</div>
</template>

<script setup>
const config = useRuntimeConfig();

const { data: characters } = await useFetch(`${config.public.hxhBaseUrl}/characters`, {
	key: 'characters-list',
	query: { sort: 'createdAt', limit: 20 },
	headers: { 'x-api-key': config.public.hxhApiKey },
});
</script>

<style scoped></style>
