import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
	state: () => ({
		is_registration_open: false
	}),
	actions: {
		toggleRegistrationForm(payload) {
			this.is_registration_open = !this.is_registration_open;
		}
	}
});
