import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
	state: () => ({
		token: null as string | null,
		user: null as Record<string, any> | null,
		is_loading: false,
		error: null as any
	}),

	getters: {
		isAuthenticated: (state) => !!state.token
	},

	actions: {
		init() {
			if (import.meta.client) {
				const stored = localStorage.getItem('hxh_guest_token');
				const user = localStorage.getItem('hxh_guest_user');
				if (stored) this.token = stored;
				if (user) this.user = JSON.parse(user);
			}
		},

		_saveSession(token: string, user: Record<string, any>) {
			this.token = token;
			this.user = user;
			localStorage.setItem('hxh_guest_token', token);
			localStorage.setItem('hxh_guest_user', JSON.stringify(user));
		},

		logout() {
			this.token = null;
			this.user = null;
			this.error = null;
			localStorage.removeItem('hxh_guest_token');
			localStorage.removeItem('hxh_guest_user');
		},

		async requestMagicLink(email: string) {
			this.is_loading = true;
			this.error = null;
			try {
				return await $fetch(`${import.meta.env.VITE_HXH_BASE_URL}/guest/magic_link`, {
					method: 'POST',
					body: { email }
				});
			} catch (err: any) {
				this.error = err.response?._data;
			} finally {
				this.is_loading = false;
			}
		},

		async verifyEmail(token: string) {
			this.is_loading = true;
			this.error = null;
			try {
				const res: any = await $fetch(
					`${import.meta.env.VITE_HXH_BASE_URL}/guest/self_verify?token=${token}`
				);
				this._saveSession(res.data.token, res.data.guest);
				return res;
			} catch (err: any) {
				this.error = err.response?._data;
			} finally {
				this.is_loading = false;
			}
		},

		async verifyMagicLink(token: string) {
			this.is_loading = true;
			this.error = null;
			try {
				const res: any = await $fetch(
					`${import.meta.env.VITE_HXH_BASE_URL}/guest/verify_magic_link?token=${token}`
				);
				this._saveSession(res.data.token, res.data.guest);
				return res;
			} catch (err: any) {
				this.error = err.response?._data;
			} finally {
				this.is_loading = false;
			}
		},

		async login(email: string, password: string) {
			this.is_loading = true;
			this.error = null;
			try {
				const res: any = await $fetch(`${import.meta.env.VITE_HXH_BASE_URL}/guest/login`, {
					method: 'POST',
					body: { email, password }
				});
				this._saveSession(res.data.token, res.data.guest);
				return res;
			} catch (err: any) {
				this.error = err.response?._data;
			} finally {
				this.is_loading = false;
			}
		},

		async fetchSelf() {
			if (!this.token) return;
			try {
				const res: any = await $fetch(`${import.meta.env.VITE_HXH_BASE_URL}/guest/self`, {
					headers: { Authorization: `Bearer ${this.token}` }
				});
				this.user = res.data;
				localStorage.setItem('hxh_guest_user', JSON.stringify(res.data));
				return res;
			} catch {
				this.logout();
			}
		},

		async setPassword(password: string, password_confirm: string) {
			this.is_loading = true;
			this.error = null;
			try {
				return await $fetch(`${import.meta.env.VITE_HXH_BASE_URL}/guest/set_password`, {
					method: 'PATCH',
					body: { password, password_confirm },
					headers: { Authorization: `Bearer ${this.token}` }
				});
			} catch (err: any) {
				this.error = err.response?._data;
			} finally {
				this.is_loading = false;
			}
		},

		async forgotPassword(email: string) {
			this.is_loading = true;
			this.error = null;
			try {
				return await $fetch(`${import.meta.env.VITE_HXH_BASE_URL}/guest/forgot_password`, {
					method: 'POST',
					body: { email }
				});
			} catch (err: any) {
				this.error = err.response?._data;
			} finally {
				this.is_loading = false;
			}
		},

		async regenerateApiKey() {
			this.is_loading = true;
			this.error = null;
			try {
				const res: any = await $fetch(
					`${import.meta.env.VITE_HXH_BASE_URL}/guest/regenerate_api_key`,
					{
						method: 'PATCH',
						headers: { Authorization: `Bearer ${this.token}` }
					}
				);
				if (this.user) {
					this.user.api_key = res.data.api_key;
					this.user.api_key_expires = res.data.api_key_expires;
					localStorage.setItem('hxh_guest_user', JSON.stringify(this.user));
				}
				return res;
			} catch (err: any) {
				this.error = err.response?._data;
			} finally {
				this.is_loading = false;
			}
		},

		async resetPassword(token: string, password: string, password_confirm: string) {
			this.is_loading = true;
			this.error = null;
			try {
				return await $fetch(
					`${import.meta.env.VITE_HXH_BASE_URL}/guest/reset_password/${token}`,
					{
						method: 'PATCH',
						body: { password, password_confirm }
					}
				);
			} catch (err: any) {
				this.error = err.response?._data;
			} finally {
				this.is_loading = false;
			}
		}
	}
});
