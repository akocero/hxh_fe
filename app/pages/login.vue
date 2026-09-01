<template>
	<div class="min-h-screen flex items-center justify-center px-4">
		<div class="w-full max-w-md space-y-6">
			<div class="text-center">
				<h1 class="text-3xl font-extrabold font-sans">HXH API Login</h1>
				<p class="mt-2 text-sm text-gray-400">
					{{ mode === 'magic'
						? "Enter your email and we'll send you a magic link to log in."
						: 'Enter your email and password to log in.' }}
				</p>
			</div>

			<!-- Magic link form -->
			<form
				v-if="mode === 'magic'"
				class="bg-dark_light rounded-xl p-8 space-y-5 shadow-xl"
				@submit.prevent="handleMagicLink">
				<BaseAlert v-if="alert" :option="alert" />

				<BaseInput label="Email" type="email" v-model="email" />

				<div class="flex justify-between items-center">
					<button
						type="button"
						class="text-sm text-gray-400 hover:text-white underline underline-offset-2"
						@click="switchToPassword">
						Log in with password
					</button>
					<button
						class="rounded-lg font-semibold text-gray-50 px-6 py-2 h-10 bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-default"
						:disabled="AuthStore.is_loading">
						{{ AuthStore.is_loading ? 'Sending...' : 'Send Magic Link' }}
					</button>
				</div>
			</form>

			<!-- Password login form -->
			<form
				v-else
				class="bg-dark_light rounded-xl p-8 space-y-5 shadow-xl"
				@submit.prevent="handlePasswordLogin">
				<BaseAlert v-if="alert" :option="alert" />

				<BaseInput label="Email" type="email" v-model="email" />
				<BaseInput label="Password" type="password" v-model="password" />

				<div class="flex justify-between items-center">
					<NuxtLink to="/forgot-password" class="text-sm text-red-400 hover:underline">
						Forgot password?
					</NuxtLink>
					<button
						class="rounded-lg font-semibold text-gray-50 px-6 py-2 h-10 bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-default"
						:disabled="AuthStore.is_loading">
						{{ AuthStore.is_loading ? 'Logging in...' : 'Log in' }}
					</button>
				</div>

				<button
					type="button"
					class="w-full text-sm text-gray-400 hover:text-white underline underline-offset-2 text-center"
					@click="switchToMagic">
					Use magic link instead
				</button>
			</form>

			<p class="text-center text-sm text-gray-500">
				Don't have an account?
				<span
					class="text-red-400 cursor-pointer hover:underline"
					@click="AppStore.openRegistrationForm()">
					Register here
				</span>
			</p>
		</div>

		<FormsRegister />
	</div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useAppStore } from '@/stores/app';

definePageMeta({ layout: 'default' });
useHead({ title: 'Login | HXH API' });

const AuthStore = useAuthStore();
const AppStore = useAppStore();
const router = useRouter();

const mode = ref<'magic' | 'password'>('magic');
const email = ref('');
const password = ref('');
const alert = ref<any>(null);

onMounted(() => {
	AuthStore.init();
	if (AuthStore.isAuthenticated) router.replace('/dashboard');
});

const switchToPassword = () => {
	alert.value = null;
	mode.value = 'password';
};

const switchToMagic = () => {
	alert.value = null;
	password.value = '';
	mode.value = 'magic';
};

const handleMagicLink = async () => {
	alert.value = null;

	if (!email.value) {
		alert.value = { type: 'error', title: 'Email required', body: 'Please enter your email address.' };
		return;
	}

	const res: any = await AuthStore.requestMagicLink(email.value);

	if (AuthStore.error) {
		const msg = AuthStore.error.message || '';
		if (msg.toLowerCase().includes('password is linked')) {
			switchToPassword();
			alert.value = {
				type: 'error',
				title: 'Password detected',
				body: 'A password is linked to your account. Please log in with your password below.'
			};
			return;
		}
		alert.value = { type: 'error', title: 'Failed', body: msg };
		return;
	}

	alert.value = { type: 'success', title: 'Magic link sent!', body: res.message };
	email.value = '';
};

const handlePasswordLogin = async () => {
	alert.value = null;

	if (!email.value) {
		alert.value = { type: 'error', title: 'Email required', body: 'Please enter your email address.' };
		return;
	}

	if (!password.value) {
		alert.value = { type: 'error', title: 'Password required', body: 'Please enter your password.' };
		return;
	}

	await AuthStore.login(email.value, password.value);

	if (AuthStore.error) {
		alert.value = { type: 'error', title: 'Login failed', body: AuthStore.error.message };
		return;
	}

	router.push('/dashboard');
};
</script>
