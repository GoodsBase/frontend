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
                        src: 'maskable.svg',
                        type: 'image/svg+xml',
                        sizes: '72x72 96x96 120x120 128x128 144x144 152x152 180x180 192x192 384x384',
                        purpose: 'any maskable',
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
