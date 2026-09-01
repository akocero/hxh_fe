<template>
	<div>
		<p>Character ID is {{ id }}</p>
	</div>
</template>

<script setup lang="ts">
const route = useRoute();
const { id } = route.params;
</script>
