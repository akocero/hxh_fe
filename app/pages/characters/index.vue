<template>
	<div>
		<div v-for="chr in characters?.data" :key="chr._id">
			{{ chr.name }}
		</div>
	</div>
</template>

<script setup lang="ts">
useHead({ title: 'Characters | HXH API' });

const { data: characters } = await useFetch(`${import.meta.env.VITE_HXH_BASE_URL}/characters`, {
	key: 'characters-list',
	query: { sort: 'createdAt', limit: 20 },
	headers: { 'x-api-key': import.meta.env.VITE_HXH_API_KEY }
});
</script>
