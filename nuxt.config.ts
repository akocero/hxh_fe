export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: false },
	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxt/icon'],
	css: ['~/assets/css/main.css'],
	routeRules: {
		'/': { prerender: true },
		'/characters': { prerender: true },
		'/about': { prerender: true },
		'/login': { ssr: false },
		'/register': { ssr: false },
		'/forgot-password': { ssr: false },
		'/verify': { ssr: false },
		'/verify-email': { ssr: false },
		'/dashboard': { ssr: false },
		'/reset-password/**': { ssr: false }
	},
	nitro: {
		preset: 'cloudflare-pages'
	}
});
