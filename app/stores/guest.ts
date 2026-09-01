import { defineStore } from 'pinia';

export const useGuestStore = defineStore('guest', {
	state: () => ({
		is_loading: false,
		error: null as any
	}),
	actions: {
		async register(body: Record<string, any>) {
			this.is_loading = true;
			this.error = null;
			try {
				return await $fetch(`${import.meta.env.VITE_HXH_BASE_URL}/guest/register`, {
					method: 'POST',
					body
				});
			} catch (error: any) {
				this.error = error.response?._data;
			} finally {
				this.is_loading = false;
			}
		}
	}
});
