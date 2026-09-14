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
			titleTemplate: '%s',
			meta: [
				{ name: 'theme-color', content: '#dc2626' },
				{ name: 'author', content: 'Eugene Paul Badato' },
				{ name: 'creator', content: 'Eugene Paul Badato' },
				{ name: 'publisher', content: 'Eugene Paul Badato' },
				{ name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
				{ name: 'google-site-verification', content: '_DQLzfGZNOJ3YS2XgNmjp2OFxeUkyFDkn14XPgpWcQg' },
				{ name: 'application-name', content: 'HxH API' },
				{ property: 'og:locale', content: 'en_US' },
				{ property: 'og:site_name', content: 'Hunter x Hunter API' },
				{ property: 'article:author', content: 'Eugene Paul Badato' },
				{ name: 'twitter:site', content: '@akocero' },
				{ name: 'twitter:creator', content: '@akocero' }
			],
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
				{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
				{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
			],
			script: [
				{
					type: 'application/ld+json',
					innerHTML: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'Organization',
						name: 'Hunter x Hunter API',
						url: 'https://hxh.eugenebadato.com',
						logo: 'https://hxh.eugenebadato.com/img/og_img.png',
						sameAs: ['https://github.com/akocero/node_hxh_api']
					})
				}
			]
		}
	},
	routeRules: {
		'/': { prerender: true },
		'/characters': { prerender: true },
		'/about': { prerender: true },
		'/playground': { prerender: true },
		'/nen-lab': { prerender: true },
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
