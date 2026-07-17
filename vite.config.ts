import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // Les libs d'animation pèsent lourd et ne changent quasiment jamais :
        // les isoler les garde en cache entre deux déploiements.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id))
            return 'react'
          if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils'))
            return 'motion'
          if (id.includes('gsap') || id.includes('lenis')) return 'gsap'
          if (id.includes('i18next')) return 'i18n'
          if (id.includes('dompurify')) return 'dompurify'
        },
      },
    },
  },
})
