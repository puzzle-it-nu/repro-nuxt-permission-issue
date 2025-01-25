// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  watchers: {
    chokidar: {
      ignorePermissionErrors: true,
    },
  },
  vite: {
    build: {
      watch: {
        chokidar: {
          ignorePermissionErrors: true,
        },
      },
    },
    server: {
      watch: {
        ignorePermissionErrors: true,
      },
    },
  },
})
