<template>
	<div class="min-h-screen px-4 py-12">
		<div class="max-w-2xl mx-auto space-y-8">
			<div class="flex items-center justify-between">
				<h1 class="text-3xl font-extrabold font-sans">Dashboard</h1>
				<button
					class="text-sm text-gray-400 hover:text-white border border-gray-600 rounded-lg px-4 py-2"
					@click="handleLogout">
					Logout
				</button>
			</div>

			<!-- Action banners -->
			<div v-if="banners.length" class="space-y-2">
				<div
					v-for="banner in banners"
					:key="banner.id"
					class="flex items-start gap-3 rounded-xl px-5 py-4 text-sm font-medium border"
					:class="banner.style">
					<span class="mt-0.5 shrink-0 text-base">{{ banner.icon }}</span>
					<div class="flex-1">
						<span class="font-semibold">{{ banner.title }}</span>
						<span class="text-gray-300"> — {{ banner.body }}</span>
					</div>
					<button
						class="shrink-0 underline underline-offset-2 hover:opacity-80 font-semibold"
						@click="scrollTo(banner.target)">
						{{ banner.action }}
					</button>
				</div>
			</div>

			<div class="bg-dark_light rounded-xl p-6 space-y-4 shadow-xl">
				<h2 class="text-lg font-semibold">Your Profile</h2>
				<div class="grid grid-cols-1 gap-3 text-sm">
					<div class="flex justify-between border-b border-gray-700 pb-2">
						<span class="text-gray-400">Name</span>
						<span>{{ AuthStore.user?.name }}</span>
					</div>
					<div class="flex justify-between border-b border-gray-700 pb-2">
						<span class="text-gray-400">Email</span>
						<span>{{ AuthStore.user?.email }}</span>
					</div>
					<div class="flex justify-between">
						<span class="text-gray-400">Usage</span>
						<span>{{ AuthStore.user?.usage }}</span>
					</div>
				</div>
			</div>

			<div id="api-key-section" class="bg-dark_light rounded-xl p-6 space-y-4 shadow-xl">
				<div class="flex items-center justify-between">
					<h2 class="text-lg font-semibold">Your API Key</h2>
					<span
						:class="isExpired ? 'text-red-400 bg-red-950' : 'text-green-400 bg-green-950'"
						class="text-xs font-semibold px-3 py-1 rounded-full">
						{{ isExpired ? 'Expired' : `Expires ${expiryLabel}` }}
					</span>
				</div>

				<BaseAlert
					v-if="isExpired"
					:option="{ type: 'error', title: 'API key expired', body: 'Your key is no longer valid. Regenerate it below to resume API access.' }" />

				<div class="flex items-center gap-3">
					<code class="flex-1 bg-gray-900 rounded-lg px-4 py-3 text-sm font-mono break-all select-all">
						{{ AuthStore.user?.api_key }}
					</code>
					<button
						class="shrink-0 rounded-lg px-4 py-2 text-sm font-semibold border border-gray-600 hover:border-green-500 hover:text-green-400 transition-colors"
						@click="copyApiKey">
						{{ copied ? 'Copied!' : 'Copy' }}
					</button>
				</div>

				<BaseAlert v-if="keyAlert" :option="keyAlert" />

				<div class="flex justify-end">
					<button
						class="rounded-lg font-semibold text-gray-50 px-5 py-2 h-10 bg-red-700 hover:bg-red-600 disabled:bg-gray-700 disabled:text-gray-500 text-sm"
						:disabled="AuthStore.is_loading"
						@click="handleRegenerate">
						{{ AuthStore.is_loading ? 'Regenerating...' : '↺ Regenerate API Key' }}
					</button>
				</div>

				<p class="text-xs text-gray-500">
					Pass this as an <code class="text-red-400">x-api-key</code> header on every request.
					Regenerating immediately invalidates your current key.
				</p>
			</div>

			<div v-if="!AuthStore.user?.has_password" id="password-section" class="bg-dark_light rounded-xl p-6 space-y-5 shadow-xl">
				<div>
					<h2 class="text-lg font-semibold">Set a Password</h2>
					<p class="text-sm text-gray-400 mt-1">
						Add a password so you can log in without a magic link in the future.
					</p>
				</div>

				<BaseAlert v-if="passwordAlert" :option="passwordAlert" />

				<form class="space-y-4" @submit.prevent="handleSetPassword">
					<BaseInput label="New password" type="password" v-model="newPassword" />
					<BaseInput label="Confirm password" type="password" v-model="confirmPassword" />
					<div class="flex justify-end">
						<button
							class="rounded-lg font-semibold text-gray-50 px-6 py-2 h-10 bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:text-gray-500"
							:disabled="AuthStore.is_loading">
							{{ AuthStore.is_loading ? 'Saving...' : 'Set Password' }}
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

definePageMeta({ middleware: 'auth', layout: 'default' });
useHead({ title: 'Dashboard | HXH API' });

const AuthStore = useAuthStore();
const router = useRouter();

const copied = ref(false);
const newPassword = ref('');
const confirmPassword = ref('');
const passwordAlert = ref<any>(null);
const keyAlert = ref<any>(null);

const banners = computed(() => {
	const items = [];
	if (isExpired.value) {
		items.push({
			id: 'expired',
			icon: '⚠',
			title: 'API key expired',
			body: 'Your key is no longer valid and API requests will be rejected.',
			action: 'Regenerate now',
			target: 'api-key-section',
			style: 'bg-red-950 border-red-800 text-red-200'
		});
	}
	if (!AuthStore.user?.has_password) {
		items.push({
			id: 'no-password',
			icon: '🔒',
			title: 'No password set',
			body: 'Add a password so you can log in without a magic link next time.',
			action: 'Set password',
			target: 'password-section',
			style: 'bg-yellow-950 border-yellow-800 text-yellow-200'
		});
	}
	return items;
});

const scrollTo = (id: string) => {
	document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const isExpired = computed(() => {
	const expires = AuthStore.user?.api_key_expires;
	if (!expires) return true;
	return new Date(expires) < new Date();
});

const expiryLabel = computed(() => {
	const expires = AuthStore.user?.api_key_expires;
	if (!expires) return '';
	return new Date(expires).toLocaleDateString(undefined, {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
});

onMounted(async () => {
	AuthStore.init();
	await AuthStore.fetchSelf();
});

const copyApiKey = async () => {
	await navigator.clipboard.writeText(AuthStore.user?.api_key || '');
	copied.value = true;
	setTimeout(() => (copied.value = false), 2000);
};

const handleSetPassword = async () => {
	passwordAlert.value = null;
	if (!newPassword.value || !confirmPassword.value) {
		passwordAlert.value = { type: 'error', title: 'Required', body: 'Please fill in both fields.' };
		return;
	}
	if (newPassword.value.length < 8) {
		passwordAlert.value = { type: 'error', title: 'Too short', body: 'Password must be at least 8 characters.' };
		return;
	}
	if (newPassword.value !== confirmPassword.value) {
		passwordAlert.value = { type: 'error', title: 'Mismatch', body: 'Passwords do not match.' };
		return;
	}
	const res: any = await AuthStore.setPassword(newPassword.value, confirmPassword.value);
	if (AuthStore.error) {
		passwordAlert.value = { type: 'error', title: 'Failed', body: AuthStore.error.message };
		return;
	}
	newPassword.value = '';
	confirmPassword.value = '';
	passwordAlert.value = { type: 'success', title: 'Password set!', body: res.message };
	if (AuthStore.user) AuthStore.user.has_password = true;
};

const handleRegenerate = async () => {
	keyAlert.value = null;
	const res: any = await AuthStore.regenerateApiKey();
	if (AuthStore.error) {
		keyAlert.value = { type: 'error', title: 'Failed', body: AuthStore.error.message };
		return;
	}
	keyAlert.value = { type: 'success', title: 'Key regenerated!', body: res.message };
};

const handleLogout = () => {
	AuthStore.logout();
	router.push('/login');
};
</script>
