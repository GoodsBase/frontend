import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    base: '/frontend/',
    plugins: [
        solid(),
        // VitePWA({
        //     registerType: 'autoUpdate',
        //     devOptions: {
        //         enabled: true,
        //     },
        //     manifest: {
        //         name: 'My App',
        //         short_name: 'App',
        //         description: 'My Progressive Web App',
        //         start_url: '/',
        //         display: 'standalone',
        //         background_color: '#ffffff',
        //         theme_color: '#000000',
        //         icons: [
        //             {
        //                 src: '/path/to/icon.png',
        //                 sizes: '192x192',
        //                 type: 'image/png',
        //             },
        //             {
        //                 src: '/path/to/icon-512.png',
        //                 sizes: '512x512',
        //                 type: 'image/png',
        //             },
        //         ],
        //     },
        // }),
    ],
})
