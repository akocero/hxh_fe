import { defineStore } from 'pinia';

export const useGuestStore = defineStore('guest', {
	state: () => ({
		is_loading: false,
		error: null
	}),
	actions: {
		async register(body) {
			try {
				this.is_loading = true;
				this.error = null;
				const res = await $fetch(
					`${
						import.meta.env.VITE_HXH_BASE_URL
					}/api/v1/guest/register`,
					{
						method: 'post',
						body: JSON.stringify(body)
					}
				);
				this.is_loading = false;
				return res;
			} catch (error) {
				console.log('Erro: ', error.response?._data);
				this.error = error.response?._data;
				this.is_loading = false;
			}
		}
	}
});
