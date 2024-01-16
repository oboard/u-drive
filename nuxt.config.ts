import { presetUno } from 'unocss'
import { presetDaisy } from 'unocss-preset-daisy'
import { presetIcons } from 'unocss'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  app: {
    head: {
      viewport: 'width=device-width',
      title: 'U-Drive',
      link: [
        {
          rel: 'icon', type: 'image/svg+xml',
          href: '/favicon.svg'
        }
      ],
    }
  },
  nitro: {
    // 该配置用于服务端请求转发
    routeRules: {
      // Cached for 1 hour
      '/api/*': {
        // cache: { maxAge: 1 }
        cache: { maxAge: 60 * 60 },
        cors: true,
      },
      '/proxy/https://**': {
        proxy: 'https://**'
      },
    }
  },
  modules: [
    '@unocss/nuxt',
    "@nuxt/image"
  ],
  unocss: {
    presets: [
      presetUno(),
      presetDaisy({
        themes: ['light', 'dark', 'winter'],
        darkTheme: 'dark',
      }),
      presetIcons()
    ],
    attributify: true,
    icons: true,
    components: false,
    shortcuts: [
      // ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ],
  },
})
