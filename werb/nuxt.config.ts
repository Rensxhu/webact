// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  // Served under https://<user>.github.io/webact/ - update if the repo/pages path changes.
  app: {
    baseURL: '/webact/',
    head: {
      title: 'Visit Pangasinan | Cultural and Heritage Guide',
      meta: [
        {
          name: 'description',
          content:
            'Mobile-first guide to Pangasinan cultural and heritage destinations, events, and travel essentials.',
        },
        { property: 'og:title', content: 'Visit Pangasinan - Cultural and Heritage Guide' },
        {
          property: 'og:description',
          content:
            'Discover destinations, heritage sites, and local events in Pangasinan with an accessible mobile experience.',
        },
        { property: 'og:type', content: 'website' },
      ],
      link: [{ rel: 'icon', href: '/webact/favicon.ico' }],
    },
  },

  css: ['bootstrap/dist/css/bootstrap.min.css', '~/assets/main.css'],

  // Prerender every route to static HTML/CSS/JS for GitHub Pages.
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/destinations'],
    },
  },

  routeRules: {
    '/heritage': { redirect: '/destinations' },
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: '',
      contactEndpoint: '',
      requestTimeoutMs: 8000,
      enableVisibilityMetadata: false,
    },
  },
})
