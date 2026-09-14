<template>
	<BaseModal :isOpen="AppStore.is_registration_open" @close="handleClose">
		<form class="p-6 md:p-8 space-y-6" @submit.prevent="handleRegister">

			<!-- Header -->
			<div class="flex items-start justify-between">
				<div>
					<div class="inline-flex items-center gap-2 px-3 py-1 mb-3 border border-primary/40 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em]">
						<span class="w-1 h-1 rounded-full bg-primary animate-pulse"></span>
						Free Forever
					</div>
					<h2 class="font-bebas text-3xl md:text-4xl leading-none tracking-wide">GET YOUR API KEY</h2>
					<p class="text-gray-500 text-xs mt-1">No credit card required. Takes 30 seconds.</p>
				</div>
				<button
					type="button"
					@click="handleClose"
					class="text-gray-600 hover:text-gray-300 transition-colors text-xl leading-none mt-1">
					✕
				</button>
			</div>

			<BaseAlert v-if="alert_option" :option="alert_option" />

			<!-- Fields -->
			<div class="space-y-4">
				<div>
					<BaseInput label="Email" type="email" v-model="body.email" />
					<p class="text-gray-600 text-xs mt-1.5 pl-1">Use a valid, active email — your API key is sent here.</p>
				</div>
				<BaseInput label="Full Name" type="text" v-model="body.name" />
				<div>
					<BaseInput label="Intended Use" type="text" v-model="body.usage" />
					<p class="text-gray-600 text-xs mt-1.5 pl-1">Briefly describe what you're building (e.g. "HxH fan site").</p>
				</div>
			</div>

			<!-- Actions -->
			<div class="flex items-center justify-end gap-3 pt-2">
				<button
					type="button"
					class="px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-300 transition-all"
					@click="handleClose">
					Cancel
				</button>
				<button
					v-if="!GuestStore.is_loading"
					class="px-6 py-2.5 text-xs font-bold uppercase tracking-[0.12em] bg-primary text-white hover:bg-red-500 transition-colors"
					style="box-shadow: 0 0 20px rgba(200,30,30,0.3);">
					Send Verification →
				</button>
				<button
					v-else
					type="button"
					class="px-6 py-2.5 text-xs font-bold uppercase tracking-[0.12em] bg-gray-800 text-gray-500 cursor-not-allowed"
					disabled>
					Sending...
				</button>
			</div>
		</form>
	</BaseModal>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app';
import { useGuestStore } from '@/stores/guest';

const AppStore = useAppStore();
const GuestStore = useGuestStore();
const body = ref<Record<string, string>>({});
const alert_option = ref<{ type: 'error' | 'success'; title: string; body: string } | null>(null);

const handleRegister = async () => {
	alert_option.value = null;
	const res: any = await GuestStore.register(body.value);
	if (GuestStore.error) {
		alert_option.value = { title: 'Registration failed!', body: GuestStore.error.message, type: 'error' };
		return;
	}
	body.value = {};
	alert_option.value = { title: 'Check your email!', body: res.message, type: 'success' };
};

const handleClose = () => {
	alert_option.value = null;
	AppStore.toggleRegistrationForm();
};
</script>
