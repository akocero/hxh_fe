import { defineStore } from 'pinia';

export const usePlaygroundStore = defineStore('playground', {
	state: () => ({
		response: null as any,
		error: null as any,
		is_loading: false
	}),
	actions: {
		async execute(endpoint: string, api_key: string) {
			this.response = null;
			this.is_loading = true;
			this.error = null;
			try {
				const res = await $fetch(
					`${import.meta.env.VITE_HXH_BASE_URL}${endpoint}?api_key=${api_key}`
				);
				this.response = res;
				return res;
			} catch (error: any) {
				this.error = error.response?._data;
			} finally {
				this.is_loading = false;
			}
		}
	}
});
