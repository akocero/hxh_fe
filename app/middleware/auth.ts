import { useAuthStore } from '@/stores/auth';

export default defineNuxtRouteMiddleware(() => {
	if (import.meta.server) return;

	const AuthStore = useAuthStore();
	AuthStore.init();

	if (!AuthStore.isAuthenticated) {
		return navigateTo('/login');
	}
});
