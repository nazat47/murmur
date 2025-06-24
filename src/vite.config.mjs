import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3001/api/v1',
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
  },
})
