import { defineStore } from 'pinia';

export const usePlaygroundStore = defineStore('playground', {
	state: () => ({
		response: null,
		error: null,
		is_loading: false
	}),
	actions: {
		async execute(endpoint, api_key) {
			try {
				this.response = null;
				this.is_loading = true;
				this.error = null;
				const res = await $fetch(
					`${
						import.meta.env.VITE_HXH_BASE_URL
					}/api/v1${endpoint}?api_key=${api_key}`
				);
				this.is_loading = false;
				this.response = res;
				return res;
			} catch (error) {
				console.log('Erro: ', error.response?._data);
				this.error = error.response?._data;
				this.is_loading = false;
			}
		}
	}
});
