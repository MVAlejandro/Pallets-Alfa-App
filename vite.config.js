import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    base: '/app/',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                index: resolve(__dirname, 'index.html'),
                login: resolve(__dirname, 'login.html')
            }
        },
    },
});
