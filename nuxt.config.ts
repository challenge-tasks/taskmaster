export default defineNuxtConfig({
  devtools: { enabled: false },

  css: ['@/assets/styles/global.scss'],

  modules: [
    'nuxt-icon',
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss'
  ]
})
