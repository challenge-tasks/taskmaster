export default defineNuxtConfig({

  app: {
    head: {
      link: [{ rel: 'icon', href: '/favicon.png' }]
    }
  },

  devtools: { enabled: false },

  components: [{
    path: '~/components',
    pathPrefix: false
  }],

  ui: {
    icons: ['ion', 'octicon', 'ant-design', 'bxl']
  },

  colorMode: {
    preference: 'light'
  },

  css: [
    '@/assets/styles/global.scss'
  ],

  i18n: {
    vueI18n: './i18n/i18n.config.ts',
    defaultLocale: 'ru'
  },

  imports: {
    dirs: ['stores'],
  },

  runtimeConfig: {
    github_client_secret: process.env.GITHUB_CLIENT_SECRET,

    public: {
      baseUrl: process.env.BASE_URL,
      apiBaseUrl: process.env.API_BASE_URL,
      github_client_id: process.env.GITHUB_CLIENT_ID,
      github_oauth_redirect_url: process.env.GITHUB_OAUTH_REDIRECT_URL
    }
  },

  modules: [
    '@nuxt/ui',
    'nuxt-swiper',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@vee-validate/nuxt',
    '@morev/vue-transitions/nuxt',
    ['@pinia/nuxt', { autoImports: ['defineStore', 'storeToRefs', 'acceptHMRUpdate'] }]
  ]
})
