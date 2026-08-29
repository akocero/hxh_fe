<template>
	<div>
		<div v-for="chr in characters?.data">
			{{ chr.name }}
		</div>
	</div>
</template>

<script setup>
const config = useRuntimeConfig();

const { data: characters } = await useFetch(`${config.public.hxhBaseUrl}/characters`, {
	query: { sort: 'createdAt', limit: 20 },
	headers: { 'x-api-key': config.public.hxhApiKey },
});
</script>

<style scoped></style>
