import { Component, createSignal } from 'solid-js'
import { Page } from '../../components/page'
import { BarcodeInput } from '../../components/barcodeInput'
import { Header } from '../../components/header'
import { BackButton } from '../../components/backButton'
import { PageContent } from '../../components/pageContent'
import { GoodsList } from '../../components/goodsList'

export const SearchPage: Component = () => {
    const barcodeSignal = createSignal('')
    const [barcode] = barcodeSignal

    return (
        <Page>
            <Header title="Пошук" Icon={() => <BackButton />} />
            <BarcodeInput
                {...{ barcodeSignal, placeholder: 'Назва чи штрих-код' }}
            />
            <PageContent>
                <GoodsList search={barcode()} />
            </PageContent>
        </Page>
    )
}
