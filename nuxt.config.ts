export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: false },
	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxt/icon', '@nuxtjs/sitemap'],
	css: ['~/assets/css/main.css'],
	site: {
		url: 'https://hxh.eugenebadato.com',
		name: 'Hunter x Hunter API'
	},
	sitemap: {
		strictNuxtContentPaths: false,
		exclude: [
			'/login',
			'/register',
			'/dashboard',
			'/forgot-password',
			'/verify',
			'/verify-email',
			'/reset-password/**'
		]
	},
	app: {
		head: {
			htmlAttrs: { lang: 'en' },
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			meta: [
				{ name: 'theme-color', content: '#dc2626' },
				{ name: 'author', content: 'Eugene Paul Badato' },
				{ name: 'robots', content: 'index, follow' },
				{ name: 'google-site-verification', content: '_DQLzfGZNOJ3YS2XgNmjp2OFxeUkyFDkn14XPgpWcQg' }
			],
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
			]
		}
	},
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
