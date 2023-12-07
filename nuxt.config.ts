export default defineNuxtConfig({

  site: {
    url: 'https://taskmaster.uz',
    name: 'Taskmaster.uz',
    description: 'Taskmaster - complete tasks and increase your skills',
    defaultLocale: 'ru',
    indexable: true,
    identity: {
      type: 'Organization'
    },
    telegram: 'https://t.me/taskmasteruz',
  },

  app: {
    head: {
      link: [
        { rel:"preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: true },
        { href: "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap", rel: "stylesheet" },

        { rel: 'icon', href: '/favicon/favicon.ico' },
        { rel: 'manifest', href: '/favicon/site.webmanifest' },
        { rel: 'shortcut icon', href: "/favicon/favicon.ico" },
        { rel: 'icon', type: "image/png", href: '/favicon/favicon-16x16.png' },
        { rel: 'icon', type: "image/png", href: '/favicon/favicon-32x32.png' },
        { rel: 'mask-icon', color: "#4f46e5", href: '/favicon/safari-pinned-tab.svg' },
        { rel: 'apple-touch-icon', sizes: "180x180", href: '/favicon/apple-touch-icon.png' }
      ]
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

  swiper: {
    modules: ['navigation']
  },

  imports: {
    dirs: ['stores'],
  },

  runtimeConfig: {
    telegram_chat_id: process.env.TELEGRAM_CHAT_ID,
    telegram_bot_token: process.env.TELEGRAM_BOT_TOKEN,
    github_client_secret: process.env.GITHUB_CLIENT_SECRET,

    public: {
      baseUrl: process.env.BASE_URL,
      apiBaseUrl: process.env.API_BASE_URL,
      github_client_id: process.env.GITHUB_CLIENT_ID,
      cookieExpiresAfter: process.env.COOKIE_EXPIRES_AFTER,
      github_oauth_redirect_url: process.env.GITHUB_OAUTH_REDIRECT_URL,
      emailVerificationInterval: process.env.EMAIL_VERIFICATION_REQUEST_INTERVAL
    }
  },

  modules: [
    '@nuxt/ui',
    'nuxt-swiper',
    '@unlazy/nuxt',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    'nuxt-og-image',
    '@nuxtseo/module',
    'nuxt-simple-robots',
    '@vee-validate/nuxt',
    '@morev/vue-transitions/nuxt',
    ['@pinia/nuxt', { autoImports: ['defineStore', 'storeToRefs', 'acceptHMRUpdate'] }]
  ]
})
