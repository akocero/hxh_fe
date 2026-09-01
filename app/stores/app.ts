import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
	state: () => ({
		is_registration_open: false
	}),
	actions: {
		toggleRegistrationForm() {
			this.is_registration_open = !this.is_registration_open;
		},
		openRegistrationForm() {
			this.is_registration_open = true;
		},
		closeRegistrationForm() {
			this.is_registration_open = false;
		}
	}
});
