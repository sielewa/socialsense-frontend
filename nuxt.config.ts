// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: '%s - SocialSense.com',
    },
  },

  typescript: {
    strict: true,
  },

  imports: {
    autoImport: true,
    dirs: ['stores'],
  },

  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore', 'acceptHMRUpdate',
          ['defineStore', 'definePiniaStore'],
        ],
      },
    ],
    '@nuxtjs/tailwindcss',
  ],

  vite: {
    server: {
      proxy: {
        '/api': {
          target: process.env.API_URL,
          changeOrigin: true,
        },
      },
    },
  },

  runtimeConfig: {
    privateApiBaseUrl: process.env.API_URL,
    public: {
      apiBaseUrl: process.env.NUXT_API_BASE_URL,
      publicApiBaseUrl: process.env.NUXT_API_BASE_URL,
    },
  },

  devtools: { enabled: false },
});