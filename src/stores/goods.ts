import { createStore } from 'solid-js/store'
import { GoodsFolder, GoodsItem } from '../types/goods'

export const [itemsStore, setItemsStore] = createStore<GoodsItem[]>([
    {
        id: 'a',
        name: 'Ківі',
        barcode: '1245968578126',
        price: 123.5,
        measurmentUnit: 'кг',
        folderId: null,
    },
    {
        id: 'b',
        name: 'Авокадо',
        barcode: '1245968578126',
        price: 250,
        measurmentUnit: 'кг',
        folderId: '2',
    },
])

export const [foldersStore, setFolderStore] = createStore<GoodsFolder[]>([
    { id: '1', name: 'Фрукти', itemsCount: 18, folderId: null },
    { id: '2', name: 'Овочі', itemsCount: 35, folderId: null },
    { id: '3', name: 'Бобові', itemsCount: 22, folderId: '2' },
])
