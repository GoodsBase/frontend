import { createStore } from 'solid-js/store'
import { GoodsFolder, GoodsItem } from '../types/goods'

export const [itemsStore, setItemsStore] = createStore<
    Record<string, GoodsItem>
>({
    a: {
        name: 'Ківі',
        barcode: '1245968578126',
        price: 123.5,
        measurmentUnit: 'кг',
        folderId: null,
    },
    b: {
        name: 'Банан',
        barcode: '1245968578126',
        price: 250,
        measurmentUnit: 'кг',
        folderId: 'a',
    },
})

export const [foldersStore, setFoldersStore] = createStore<
    Record<string, GoodsFolder>
>({
    a: { name: 'Фрукти', itemsCount: 18, folderId: null },
    b: { name: 'Овочі', itemsCount: 35, folderId: null },
    c: { name: 'Яблука', itemsCount: 22, folderId: 'a' },
})
