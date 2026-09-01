<template>
	<div class="min-h-screen flex items-center justify-center px-4">
		<div class="w-full max-w-md space-y-6">
			<div class="text-center">
				<h1 class="text-3xl font-extrabold font-sans">Forgot Password</h1>
				<p class="mt-2 text-sm text-gray-400">
					Enter your email and we'll send you a reset link.
				</p>
			</div>

			<form
				class="bg-dark_light rounded-xl p-8 space-y-5 shadow-xl"
				@submit.prevent="handleSubmit">
				<BaseAlert v-if="alert" :option="alert" />

				<BaseInput label="Email" type="email" v-model="email" />

				<div class="flex justify-end">
					<button
						class="rounded-lg font-semibold text-gray-50 px-6 py-2 h-10 bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:text-gray-500"
						:disabled="AuthStore.is_loading || submitted">
						{{ AuthStore.is_loading ? 'Sending...' : submitted ? 'Sent!' : 'Send Reset Link' }}
					</button>
				</div>
			</form>

			<p class="text-center text-sm text-gray-500">
				<NuxtLink to="/login" class="text-red-400 hover:underline">← Back to login</NuxtLink>
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

definePageMeta({ layout: 'default' });
useHead({ title: 'Forgot Password | HXH API' });

const AuthStore = useAuthStore();
const email = ref('');
const alert = ref<any>(null);
const submitted = ref(false);

const handleSubmit = async () => {
	if (submitted.value) return;
	alert.value = null;
	if (!email.value) {
		alert.value = { type: 'error', title: 'Required', body: 'Please enter your email address.' };
		return;
	}
	const res: any = await AuthStore.forgotPassword(email.value);
	if (AuthStore.error) {
		alert.value = { type: 'error', title: 'Failed', body: AuthStore.error.message };
		return;
	}
	submitted.value = true;
	email.value = '';
	alert.value = { type: 'success', title: 'Check your email!', body: res.message };
};
</script>
