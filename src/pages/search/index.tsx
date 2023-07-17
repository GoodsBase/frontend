import { Component, createSignal } from 'solid-js'
import { Page } from '../../components/page'
import { BarcodeInput } from '../../components/barcodeInput'
import { Header } from '../../components/header'
import { BackButton } from '../../components/backButton'

export const SearchPage: Component = () => {
    const barcodeSignal = createSignal('')

    return (
        <Page>
            <Header title="Пошук" Icon={() => <BackButton />} />
            <BarcodeInput
                {...{ barcodeSignal, placeholder: 'Назва чи штрих-код' }}
            />
        </Page>
    )
}
