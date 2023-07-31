export default defineNuxtConfig({
  devtools: { enabled: false },

  css: [
    'vue-final-modal/style.css',
    '@/assets/styles/global.scss'
  ],

  imports: {
    dirs: ['stores'],
  },

  modules: [
    'nuxt-icon',
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    ['@pinia/nuxt', { autoImports: ['defineStore', 'storeToRefs', 'acceptHMRUpdate'] }]
  ]
})
