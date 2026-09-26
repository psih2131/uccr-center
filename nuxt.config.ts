// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/scss/main.scss', '@fancyapps/ui/dist/fancybox/fancybox.css'],
  ssr: true,
  modules: ['@pinia/nuxt', 'nuxt-swiper', 'vue-yandex-maps/nuxt'],
  yandexMaps: {
    apikey: process.env.NUXT_YANDEX_MAPS_API_KEY,
  },
})