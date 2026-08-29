<template>
	<div>
		<pre>URL: {{ `${$config.public.hxhBaseUrl}/characters` }}</pre>
		<pre>data: {{ characters }}</pre>
		<pre>error: {{ error }}</pre>
		<div v-for="chr in characters?.data">
			{{ chr.name }}
		</div>
	</div>
</template>

<script setup>
const config = useRuntimeConfig();

const url = `${config.public.hxhBaseUrl}/characters`;
console.log('Fetching URL:', url);
console.log('API key:', config.public.hxhApiKey);

const { data: characters, error } = await useFetch(url, {
	query: { sort: 'createdAt', limit: 20 },
	headers: { 'x-api-key': config.public.hxhApiKey },
});

console.log('characters:', characters.value);
console.log('error:', error.value);
</script>

<style scoped></style>
