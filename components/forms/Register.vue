<template>
	<Modal
		:is_open="AppStore.is_registration_open"
		v-if="AppStore.is_registration_open">
		<form
			action=""
			class="p-5 md:p-8 space-y-6"
			@submit.prevent="handleRegister">
			<BaseAlert v-if="alert_option" :option="alert_option" />
			<div>
				<h3 class="text-xl">Register for API Key</h3>
			</div>
			<div class="">
				<BaseInput label="Email" type="email" v-model="body.email" />
				<span class="mt-2 block text-sm">
					Please ensure that the email you provide is valid and
					active.
				</span>
			</div>
			<div class="">
				<BaseInput label="Full name" type="text" v-model="body.name" />
			</div>
			<div class="">
				<BaseInput label="Usage" type="text" v-model="body.usage" />
				<span class="mt-2 block text-sm">
					Concisely describe the API's purpose for the associated app
					or website.
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
					class="rounded-lg font-semibold text-gray-50 px-4 py-2 h-10 hover:bg-green-500 bg-green-600"
					v-if="!GuestStore.is_loading">
					Send Email
				</button>
				<button
					type="button"
					class="rounded-lg font-semibold text-gray-500 px-4 py-2 h-10 bg-gray-800 disabled:cursor-default"
					disabled
					v-if="GuestStore.is_loading">
					Sending...
				</button>
			</div>
		</form>
	</Modal>
</template>

<script setup>
import { useAppStore } from '@/stores/appStore';
import { useGuestStore } from '@/stores/guestStore';

const AppStore = useAppStore();
const GuestStore = useGuestStore();
const body = ref({});
const alert_option = ref(null);

const handleRegister = async () => {
	alert_option.value = null;
	const res = await GuestStore.register(body.value);

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

<style lang="scss" scoped></style>
