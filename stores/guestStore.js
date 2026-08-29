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
				const { public: { hxhBaseUrl } } = useRuntimeConfig();
				const res = await $fetch(
					`${hxhBaseUrl}/guest/register`,
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
