// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt', 'nuxt-swiper', 'vue-yandex-maps/nuxt', '@nuxtjs/sitemap'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      meta: [{ name: 'robots', content: 'noindex, nofollow' }],
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    },
  },
  runtimeConfig: {
    strapiUrl: process.env.NUXT_STRAPI_URL || '',
    public: {
      strapiUrl: process.env.NUXT_STRAPI_URL || '',
    },
  },
  css: ['~/assets/scss/main.scss', '@fancyapps/ui/dist/fancybox/fancybox.css'],
  ssr: true,
  
  site: {
    url: 'http://localhost:3000',
  },

  sitemap: {
    sitemaps: {
      pages: {
        sources: [
          '/api/__sitemap__/urls',
        ],
      },
      'blog-post': {
        sources: [
          '/api/__sitemap__/blog-post',
        ],
      },
      'blog-cat': {
        sources: [
          '/api/__sitemap__/blog-cat',
        ],
      },
      directions: {
        sources: [
          '/api/__sitemap__/directions',
        ],
      },
    },
  },

  
  yandexMaps: {
    apikey: process.env.NUXT_YANDEX_MAPS_API_KEY,
  },
})
