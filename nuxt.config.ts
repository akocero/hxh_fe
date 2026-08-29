// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: false },
	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', 'nuxt-icon'],
	runtimeConfig: {
		public: {
			hxhBaseUrl: process.env.NUXT_PUBLIC_HXH_BASE_URL || '',
			hxhApiKey: process.env.NUXT_PUBLIC_HXH_API_KEY || '',
		}
	},
	routeRules: {
		'/': { prerender: true },
		'/characters': { prerender: true }
	}
});
