<template>
	<div class="min-h-screen flex items-center justify-center px-4">
		<div class="text-center space-y-4 max-w-sm">
			<template v-if="status === 'loading'">
				<BaseSpinner />
				<p class="text-gray-400">Verifying your magic link...</p>
			</template>

			<template v-else-if="status === 'success'">
				<h2 class="text-2xl font-extrabold font-sans">You're in!</h2>
				<p class="text-gray-400">Redirecting you to the dashboard...</p>
			</template>

			<template v-else>
				<h2 class="text-2xl font-extrabold font-sans text-red-400">Link Invalid</h2>
				<p class="text-gray-400">{{ errorMessage }}</p>
				<NuxtLink to="/login" class="inline-block mt-4 text-sm text-red-400 hover:underline">
					← Back to login
				</NuxtLink>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

definePageMeta({ layout: 'default' });
useHead({ title: 'Verifying | HXH API' });

const AuthStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const status = ref('loading');
const errorMessage = ref('This magic link is invalid or has expired. Please request a new one.');

onMounted(async () => {
	if (AuthStore.isAuthenticated) {
		router.replace('/dashboard');
		return;
	}

	const token = route.query.token as string;

	if (!token) {
		status.value = 'error';
		return;
	}

	await AuthStore.verifyMagicLink(token);

	if (AuthStore.error) {
		status.value = 'error';
		errorMessage.value = AuthStore.error.message || errorMessage.value;
		return;
	}

	status.value = 'success';
	setTimeout(() => router.replace('/dashboard'), 1000);
});
</script>
