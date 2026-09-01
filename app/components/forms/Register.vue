<template>
	<BaseModal :isOpen="AppStore.is_registration_open" v-if="AppStore.is_registration_open">
		<form class="p-5 md:p-8 space-y-6" @submit.prevent="handleRegister">
			<BaseAlert v-if="alert_option" :option="alert_option" />
			<div>
				<h3 class="text-xl">Register for API Key</h3>
			</div>
			<div>
				<BaseInput label="Email" type="email" v-model="body.email" />
				<span class="mt-2 block text-sm">
					Please ensure that the email you provide is valid and active.
				</span>
			</div>
			<div>
				<BaseInput label="Full name" type="text" v-model="body.name" />
			</div>
			<div>
				<BaseInput label="Usage" type="text" v-model="body.usage" />
				<span class="mt-2 block text-sm">
					Concisely describe the API's purpose for the associated app or website.
				</span>
			</div>
			<div class="flex justify-end gap-2">
				<button
					type="button"
					class="rounded-lg font-semibold bg-gray-700 text-gray-50 px-4 py-2 h-10 hover:bg-gray-600"
					@click="handleClose">
					Cancel
				</button>
				<button
					v-if="!GuestStore.is_loading"
					class="rounded-lg font-semibold text-gray-50 px-4 py-2 h-10 hover:bg-green-500 bg-green-600">
					Send Email
				</button>
				<button
					v-else
					type="button"
					class="rounded-lg font-semibold text-gray-500 px-4 py-2 h-10 bg-gray-800 disabled:cursor-default"
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
		alert_option.value = {
			title: 'Registration failed!',
			body: GuestStore.error.message,
			type: 'error'
		};
		return;
	}

	body.value = {};
	alert_option.value = {
		title: 'Registration successful!',
		body: res.message,
		type: 'success'
	};
};

const handleClose = () => {
	alert_option.value = null;
	AppStore.toggleRegistrationForm();
};
</script>
