export default defineNuxtConfig({

  site: {
    url: 'https://taskmaster.uz',
    name: 'Taskmaster.uz',
    description: 'Taskmaster - выполняйте задания и улучшайте свои навыки',
    defaultLocale: 'ru',
    identity: {
      type: 'Organization'
    },
    telegram: 'https://t.me/taskmasteruz',
  },

  app: {
    head: {
      link: [
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

  devtools: { enabled: true },

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
      cookieExpiresAfter: process.env.COOKIE_EXPIRES_AFTER,
      github_oauth_redirect_url: process.env.GITHUB_OAUTH_REDIRECT_URL,
      emailVerificationTimeout: process.env.EMAIL_VERIFICATION_REQUEST_TIMEOUT
    }
  },

  modules: [
    '@nuxt/ui',
    '@nuxtjs/seo',
    'nuxt-swiper',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@vee-validate/nuxt',
    '@morev/vue-transitions/nuxt',
    ['@pinia/nuxt', { autoImports: ['defineStore', 'storeToRefs', 'acceptHMRUpdate'] }]
  ]
})
