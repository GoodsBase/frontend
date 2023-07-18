import { Component, Signal, JSX } from 'solid-js'
import { OnDetected, openBarcodeScanner } from '../barcodeScanner'
import style from './style.module.css'
import { IconButton } from '../iconButton'
import { IconBarcode } from '@tabler/icons-solidjs'

type Props = {
    placeholder?: string
    barcodeSignal: Signal<string>
} & JSX.IntrinsicElements['input']

export const BarcodeInput: Component<Props> = (props) => {
    const [barcode, setBarcode] = props.barcodeSignal

    const onDetected: OnDetected = (code) => {
        setBarcode(code)
    }

    return (
        <div class={style.container}>
            <input
                class={style.input}
                value={barcode()}
                onInput={(event) => {
                    setBarcode(event.target.value)
                }}
                placeholder={props.placeholder ?? 'Штрих-код'}
            />
            <IconButton
                class={style.button}
                onClick={() => {
                    openBarcodeScanner(onDetected)
                }}
                tabindex="-1"
            >
                <IconBarcode size={36} />
            </IconButton>
        </div>
    )
}
