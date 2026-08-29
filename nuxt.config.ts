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
	nitro: {
		preset: 'cloudflare-module'
	},
	routeRules: {
		'/': { isr: 3600 },
		'/characters': { isr: 10 }
	}
});
