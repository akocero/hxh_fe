// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: false },
	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', 'nuxt-icon'],
	routeRules: {
		// Homepage pre-rendered at build time
		'/': { prerender: true }
	}
});
