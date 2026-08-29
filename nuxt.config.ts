// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: false },
	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', 'nuxt-icon'],
	runtimeConfig: {
		public: {
			hxhBaseUrl: '',
			hxhApiKey: '',
		}
	},
	routeRules: {
		'/': { prerender: true },
		'/characters': { prerender: true }
	}
});
