# HxH API — Frontend

The official frontend for the **Hunter x Hunter REST API** — a free, open-source database for HxH characters, groups, Nen types, and lore.

Live site: [hxh.eugenebadato.com](https://hxh.eugenebadato.com)

---

## About

This is a Nuxt 4 application that serves as the landing page and developer portal for the HxH API. It includes:

- **Home page** — hero, stats, character showcase, Nen type explorer, groups, features, code snippet
- **Characters page** — filterable, paginated character grid with Nen type filters
- **Character detail page** — full profile view (images, abilities, groups, relatives)
- **Playground** — live API query tester with syntax-highlighted JSON response
- **Nen Lab** — coming soon page for the Nen chimera breeding feature
- **Auth** — magic link and password login, API key registration modal
- **Dashboard** — authenticated user view for managing API keys

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Nuxt 4](https://nuxt.com) |
| Styling | [Tailwind CSS](https://tailwindcss.com) |
| State | [Pinia](https://pinia.vuejs.org) |
| Icons | [@nuxt/icon](https://github.com/nuxt/icon) |
| Sitemap | [@nuxtjs/sitemap](https://nuxtseo.com/sitemap) |
| Deployment | Cloudflare Pages |

---

## Local Development

```bash
# Install dependencies
pnpm install

# Start dev server at http://localhost:3000
pnpm dev
```

Create a `.env` file (see `.env.example` for required variables):

```env
VITE_HXH_BASE_URL=https://hxh-api.onrender.com/api/v1
VITE_HXH_API_KEY=your_api_key_here
```

---

## Build & Deploy

```bash
# Build for production
pnpm build

# Preview production build locally
pnpm preview
```

Deployed to Cloudflare Pages via the `cloudflare-pages` Nitro preset.

---

## Author

Created by **Eugene Paul Badato**

- Portfolio: [eugenebadato.com](https://eugenebadato.com)
- GitHub: [@akocero](https://github.com/akocero)
- Email: akocero15@gmail.com

---

## License

MIT — free to use, fork, and build on.
