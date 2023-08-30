export default defineNuxtConfig({
  devtools: { enabled: false },

  css: [
    'vue-final-modal/style.css',
    '@/assets/styles/global.scss'
  ],

  image: {
    format: ['webp']
  },

  i18n: {
    vueI18n: './i18n/i18n.config.ts',
    defaultLocale: 'ru'
  },

  imports: {
    dirs: ['stores'],
  },

  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL,
      apiBaseUrl: process.env.API_BASE_URL
    }
  },

  modules: [
    'nuxt-icon',
    '@nuxt/image',
    'nuxt-swiper',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@vee-validate/nuxt',
    '@nuxtjs/tailwindcss',
    '@morev/vue-transitions/nuxt',
    ['@pinia/nuxt', { autoImports: ['defineStore', 'storeToRefs', 'acceptHMRUpdate'] }]
  ]
})
