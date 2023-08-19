<template>
	<div>
		<p>Character ID is {{ id }}</p>
	</div>
</template>

<script setup>
const route = useRoute();
const { id } = route.params;
</script>

<style lang="scss" scoped></style>
