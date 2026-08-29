// https://nuxt.com/docs/api/configuration/nuxt-config

console.log('[BUILD] VITE_HXH_BASE_URL:', process.env.VITE_HXH_BASE_URL);
console.log('[BUILD] VITE_HXH_API_KEY:', process.env.VITE_HXH_API_KEY);
console.log('[BUILD] All env keys containing HXH:', Object.keys(process.env).filter(k => k.includes('HXH')));

export default defineNuxtConfig({
	devtools: { enabled: false },
	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', 'nuxt-icon'],
	routeRules: {
		'/': { prerender: true },
		'/characters': { prerender: true }
	}
});
