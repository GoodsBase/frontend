import { Component } from 'solid-js'
import { Header } from '../components/header'
import { IconPackage } from '@tabler/icons-solidjs'
import { GoodsList } from '../components/goodsList'
import { GoodsTree } from '../types/goods'
import { Footer } from '../components/footer'

const tree: GoodsTree = [
    { type: 'folder', name: 'Фрукти', itemsCount: 18, childern: [] },
    { type: 'folder', name: 'Овочі', itemsCount: 35, childern: [] },
    {
        type: 'item',
        name: 'Ківі',
        barcode: '1245968578126',
        price: 123.5,
        measurmentUnit: 'кг',
    },
]

export const Root: Component = () => {
    return (
        <div class="page">
            <Header Icon={IconPackage} text="Товари" />
            <GoodsList tree={tree} />
            <Footer actions={[() => <>{'hello'}</>]} />
        </div>
    )
}
