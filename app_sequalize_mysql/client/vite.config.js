import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Twój backend działa na tym hoście i porcie
        changeOrigin: true, // Zmień origin żądania na backend
      },
    },
  },
})