// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: false },
	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', 'nuxt-icon'],
	runtimeConfig: {
		public: {
			hxhBaseUrl: process.env.VITE_HXH_BASE_URL,
			hxhApiKey: process.env.VITE_HXH_API_KEY,
		}
	},
	routeRules: {
		// Homepage pre-rendered at build time
		'/': { prerender: true },
		'/characters': { isr: 10 }
	}
});
