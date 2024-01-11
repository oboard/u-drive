import { presetUno } from 'unocss'
import { presetDaisy } from 'unocss-preset-daisy'
import { presetIcons } from 'unocss'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
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
