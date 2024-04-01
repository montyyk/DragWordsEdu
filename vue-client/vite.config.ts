import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
        extensions: ['.vue', '.ts', '.js']
    },
    server: {
        proxy: {
            '/api': 'http://localhost:3000'
        }
    },
    build: {
        outDir: '../server/public'
    }
})
