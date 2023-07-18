import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    plugins: [
        solid(),
        VitePWA({
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true,
            },
            manifest: {
                name: 'GoodsBase',
                short_name: 'GoodsBase',
                description: 'Веб-застосунок для обліку товарів',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: 'icon.svg',
                        type: 'image/svg+xml',
                        sizes: 'any',
                        purpose: 'any',
                    },
                    {
                        src: 'maskable.svg',
                        type: 'image/svg+xml',
                        sizes: 'any',
                        purpose: 'maskable',
                    },
                    {
                        src: 'bigicon.png',
                        type: 'image/png',
                        sizes: '512x512',
                        purpose: 'maskable',
                    },
                ],
                start_url: '/',
            },
        }),
    ],
})
