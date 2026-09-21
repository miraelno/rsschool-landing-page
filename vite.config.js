import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: 'src',
    base: '/rsschool-landing-page/',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(import.meta.dirname, 'src/index.html'),
                menu: resolve(import.meta.dirname, 'src/menu.html'),
            },
        },
    },
});