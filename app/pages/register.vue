<template>
	<div class="min-h-screen flex items-center justify-center px-4">
		<FormsRegister />
	</div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app';

definePageMeta({ layout: 'default' });
useHead({ title: 'Register | HXH API' });

const AppStore = useAppStore();

onMounted(() => {
	AppStore.openRegistrationForm();
});
</script>
