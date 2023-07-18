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
                icons: [
                    {
                        src: 'favicon.svg',
                        type: 'image/svg+xml',
                        purpose: 'any',
                    },
                ],
                start_url: '/',
            },
        }),
    ],
})
