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

  modules: [
    'nuxt-icon',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    ['@pinia/nuxt', { autoImports: ['defineStore', 'storeToRefs', 'acceptHMRUpdate'] }]
  ]
})
