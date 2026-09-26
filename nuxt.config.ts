// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/scss/main.scss'],
  components: [
    { path: '~/components/buttons', pathPrefix: false },
    { path: '~/components/sections', pathPrefix: false },
    { path: '~/components/modals', pathPrefix: false },
    '~/components',
  ],
  ssr: true,
  modules: ['@pinia/nuxt', 'nuxt-swiper'],
})