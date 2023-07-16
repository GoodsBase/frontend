import { Component, onMount } from 'solid-js'
import Quagga from '@ericblade/quagga2'

export const SearchPage: Component = () => {
    let ref!: HTMLDivElement

    onMount(() => {
        Quagga.init(
            {
                inputStream: {
                    name: 'Live',
                    type: 'LiveStream',
                    target: ref,
                    constraints: {
                        facingMode: 'environment',
                    },
                },
                decoder: {
                    readers: [
                        'ean_reader',
                        'code_128_reader',
                        'i2of5_reader',
                        'upc_reader',
                    ],
                },
            },
            function (error) {
                if (error) {
                    console.error('Error initializing Quagga', error)
                    return
                }

                Quagga.start()
                Quagga.onDetected((event) => {
                    Quagga.stop()
                    alert(event.codeResult.code)
                })
            },
        )
    })

    return <div ref={ref}></div>
}
