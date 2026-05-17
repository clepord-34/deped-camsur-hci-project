import { resolve } from 'path'
import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        archive: resolve(__dirname, 'src/pages/archive.html'),
        instructional: resolve(__dirname, 'src/pages/instructional-materials.html'),
        procurement: resolve(__dirname, 'src/pages/procurement.html'),
        directory: resolve(__dirname, 'src/pages/directory.html'),
        programs: resolve(__dirname, 'src/pages/programs.html'),
        services: resolve(__dirname, 'src/pages/services.html'),
        transparencySeal: resolve(__dirname, 'src/pages/transparency-seal.html'),
        about: resolve(__dirname, 'src/pages/about.html'),
      },
    },
  },
})
