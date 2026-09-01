<template>
	<div class="min-h-screen flex items-center justify-center px-4">
		<div class="w-full max-w-md space-y-6">
			<div class="text-center">
				<h1 class="text-3xl font-extrabold font-sans">Reset Password</h1>
				<p class="mt-2 text-sm text-gray-400">Choose a new password for your account.</p>
			</div>

			<form
				class="bg-dark_light rounded-xl p-8 space-y-5 shadow-xl"
				@submit.prevent="handleSubmit">
				<BaseAlert v-if="alert" :option="alert" />

				<BaseInput label="New password" type="password" v-model="password" />
				<BaseInput label="Confirm new password" type="password" v-model="confirmPassword" />

				<div class="flex justify-end">
					<button
						class="rounded-lg font-semibold text-gray-50 px-6 py-2 h-10 bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:text-gray-500"
						:disabled="AuthStore.is_loading">
						{{ AuthStore.is_loading ? 'Resetting...' : 'Reset Password' }}
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

definePageMeta({ layout: 'default' });
useHead({ title: 'Reset Password | HXH API' });

const AuthStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const password = ref('');
const confirmPassword = ref('');
const alert = ref<any>(null);

const handleSubmit = async () => {
	alert.value = null;
	if (!password.value || !confirmPassword.value) {
		alert.value = { type: 'error', title: 'Required', body: 'Please fill in both fields.' };
		return;
	}
	const res: any = await AuthStore.resetPassword(
		route.params.token as string,
		password.value,
		confirmPassword.value
	);
	if (AuthStore.error) {
		alert.value = { type: 'error', title: 'Failed', body: AuthStore.error.message };
		return;
	}
	alert.value = { type: 'success', title: 'Password reset!', body: res.message };
	setTimeout(() => router.push('/login'), 2000);
};
</script>
