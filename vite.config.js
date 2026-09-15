import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    base: '/app/',
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8012/Pallets-Alfa-App',
                changeOrigin: true
            }
        }
    },
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                index: resolve(import.meta.dirname, 'index.html'),
                login: resolve(import.meta.dirname, 'login.html'),
                profile: resolve(import.meta.dirname, 'profile.html'),
            }
        },
    },
});
