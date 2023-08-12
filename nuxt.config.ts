export default defineNuxtConfig({
  devtools: { enabled: false },

  css: [
    'vue-final-modal/style.css',
    '@/assets/styles/global.scss'
  ],

  image: {
    format: ['webp']
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
    '@vueuse/nuxt',
    '@vee-validate/nuxt',
    '@nuxtjs/tailwindcss',
    '@morev/vue-transitions/nuxt',
    ['@pinia/nuxt', { autoImports: ['defineStore', 'storeToRefs', 'acceptHMRUpdate'] }]
  ]
})
