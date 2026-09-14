<template>
	<div class="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">

		<!-- Background glow -->
		<div class="absolute inset-0 pointer-events-none">
			<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-15 blur-[120px] animate-nen-pulse"
				style="background: radial-gradient(circle, hsl(360,74%,51%) 0%, transparent 65%);"></div>
		</div>

		<div class="w-full max-w-md relative z-10">

			<!-- Logo + heading -->
			<div class="text-center mb-8">
				<NuxtLink to="/" class="font-bebas text-2xl tracking-widest text-gray-400 hover:text-white transition-colors">
					← HXH API
				</NuxtLink>
				<h1 class="font-bebas text-5xl md:text-6xl leading-none tracking-wide mt-2 mb-2">
					{{ mode === 'magic' ? 'SIGN IN' : 'WELCOME BACK' }}
				</h1>
				<p class="text-gray-500 text-sm">
					{{ mode === 'magic'
						? "Enter your email and we'll send you a magic link."
						: 'Enter your credentials to log in.' }}
				</p>
			</div>

			<!-- Form card -->
			<div class="clip-corner-tr relative bg-dark_light border border-gray-800 p-8">
				<!-- Top accent line -->
				<div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>

				<!-- Magic link form -->
				<form v-if="mode === 'magic'" class="space-y-6" @submit.prevent="handleMagicLink">
					<BaseAlert v-if="alert" :option="alert" />

					<BaseInput label="Email" type="email" v-model="email" />

					<button
						class="w-full py-3.5 font-bold uppercase tracking-[0.15em] text-sm bg-primary text-white hover:bg-red-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
						:disabled="AuthStore.is_loading"
						style="box-shadow: 0 0 24px rgba(200,30,30,0.3);">
						{{ AuthStore.is_loading ? 'Sending...' : 'Send Magic Link →' }}
					</button>

					<button
						type="button"
						class="w-full py-3 text-xs font-bold uppercase tracking-[0.15em] border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200 transition-all duration-200"
						@click="switchToPassword">
						Sign In With Password Instead
					</button>
				</form>

				<!-- Password login form -->
				<form v-else class="space-y-5" @submit.prevent="handlePasswordLogin">
					<BaseAlert v-if="alert" :option="alert" />

					<BaseInput label="Email" type="email" v-model="email" />
					<BaseInput label="Password" type="password" v-model="password" />

					<button
						class="w-full py-3.5 font-bold uppercase tracking-[0.15em] text-sm bg-primary text-white hover:bg-red-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
						:disabled="AuthStore.is_loading"
						style="box-shadow: 0 0 24px rgba(200,30,30,0.3);">
						{{ AuthStore.is_loading ? 'Logging in...' : 'Log In →' }}
					</button>

					<button
						type="button"
						class="w-full py-3 text-xs font-bold uppercase tracking-[0.15em] border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200 transition-all duration-200"
						@click="switchToMagic">
						Use Magic Link Instead
					</button>

					<div class="text-center">
						<NuxtLink to="/forgot-password"
							class="text-xs text-gray-600 hover:text-primary transition-colors font-bold uppercase tracking-wider">
							Forgot password?
						</NuxtLink>
					</div>
				</form>
			</div>

			<!-- Register link -->
			<p class="text-center text-sm text-gray-600 mt-6">
				Don't have an account?
				<span
					class="text-primary cursor-pointer hover:text-red-400 font-bold transition-colors uppercase tracking-wider text-xs ml-1"
					@click="AppStore.openRegistrationForm()">
					Get API Key →
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
useHead({ title: 'Sign In — HxH API' });

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

const switchToPassword = () => { alert.value = null; mode.value = 'password'; };
const switchToMagic = () => { alert.value = null; password.value = ''; mode.value = 'magic'; };

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
			alert.value = { type: 'error', title: 'Password detected', body: 'A password is linked to your account. Please log in with your password below.' };
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
	if (!email.value) { alert.value = { type: 'error', title: 'Email required', body: 'Please enter your email address.' }; return; }
	if (!password.value) { alert.value = { type: 'error', title: 'Password required', body: 'Please enter your password.' }; return; }
	await AuthStore.login(email.value, password.value);
	if (AuthStore.error) { alert.value = { type: 'error', title: 'Login failed', body: AuthStore.error.message }; return; }
	router.push('/dashboard');
};
</script>
