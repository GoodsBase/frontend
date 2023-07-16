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
    c: {
        name: 'Авокадо',
        barcode: '1245968578126',
        price: 180.35,
        measurmentUnit: 'кг',
        folderId: 'b',
    },
})

export const [foldersStore, setFoldersStore] = createStore<
    Record<string, GoodsFolder>
>({
    a: { name: 'Фрукти', itemsCount: 18, folderId: null },
    b: { name: 'Овочі', itemsCount: 35, folderId: null },
    c: { name: 'Яблука', itemsCount: 22, folderId: 'a' },
})

export function removeFolder(id: string) {
    const foldersIdsToDelete = [id]
    const itemsIdsToDelete: string[] = []

    const folders = Object.entries(foldersStore)
    const items = Object.entries(itemsStore)

    for (const folderId of foldersIdsToDelete) {
        folders.forEach(([id, folder]) => {
            if (folder.folderId === folderId) {
                foldersIdsToDelete.push(id)
            }
        })
        items.forEach(([id, item]) => {
            if (item.folderId === folderId) {
                itemsIdsToDelete.push(id)
            }
        })
    }

    setFoldersStore((state) => {
        for (const id of foldersIdsToDelete) {
            delete state[id]
        }
        return state
    })
    setItemsStore((state) => {
        for (const id of itemsIdsToDelete) {
            delete state[id]
        }
        return state
    })
}
