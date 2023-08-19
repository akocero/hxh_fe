<template>
	<div class="">characters {{ characterStore.item }}</div>
	<button @click="characterStore.create('test2')">action</button>
</template>

<script setup>
import { useCharacterStore } from '@/stores/characterStore';
definePageMeta({
	layout: 'characters'
});

const characterStore = useCharacterStore();
</script>

<style scoped></style>
