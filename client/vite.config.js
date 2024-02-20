import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api':import.meta.env.VITE_API_URL
    },
  },
  plugins: [react()],
})
