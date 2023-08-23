<template>
	<div>
		<div v-for="chr in characters.data">
			{{ chr.name }}
		</div>
	</div>
</template>

<script setup>
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
// const groups = await fetchData('/groups');
</script>

<style scoped></style>
