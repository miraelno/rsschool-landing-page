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
                about: resolve(import.meta.dirname, 'src/about.html'),
            },
        },
    },
});