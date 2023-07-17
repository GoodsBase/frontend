import { Component } from 'solid-js'
import Quagga from '@ericblade/quagga2'
import style from './style.module.css'
import { IconButton } from '../iconButton'
import { IconX } from '@tabler/icons-solidjs'

export type OnDetected = (code: string) => void

let dialogRef!: HTMLDialogElement
let scannerRef!: HTMLDivElement

export function openBarcodeScanner(onDetected: OnDetected) {
    let detected = false

    Quagga.init(
        {
            inputStream: {
                name: 'Live',
                type: 'LiveStream',
                target: scannerRef,
                constraints: {
                    facingMode: 'environment',
                    // deviceId:
                    //     '8ba95f6c7cd44e7f0b519b70bc8169b68f7a7dd599b9b8338be3f6c49e688ed2',
                },
            },
            decoder: {
                readers: [
                    'ean_reader',
                    'code_128_reader',
                    'i2of5_reader',
                    // 'upc_reader',
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
                if (!detected) {
                    detected = true
                    closeBarcodeScanner()
                    onDetected(event.codeResult.code!)
                }
            })
        },
    )
    dialogRef.showModal()
}

export function closeBarcodeScanner() {
    Quagga.stop()
    dialogRef.close()
}

export const BarcodeDialog: Component = () => {
    return (
        <dialog ref={dialogRef} class={style.dialog}>
            <IconButton class={style.close} onClick={closeBarcodeScanner}>
                <IconX size={36} />
            </IconButton>
            <div ref={scannerRef} class={style.scanner} />
        </dialog>
    )
}
