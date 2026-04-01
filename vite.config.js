import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',  
      manifest: {
        name: 'OWOW Project Dashboard',  // Full app name
        short_name: 'OWOW On the go',  
        description: 'OWOW Dashboard - project management tool used by clients and project managers to track project progress, manage resources, and visualize data through dashboards.',
        theme_color: '#1b1b1b',  
        background_color: '#1b1b1b',  
        display: 'standalone',  
        icons: [
          {
            src: '/png1.png', 
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/png2.png', 
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'  
          }
        ]
      }
    })
  ],

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },

  preview: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})