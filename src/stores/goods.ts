import { createStore } from 'solid-js/store'
import { GoodsFolder, GoodsItem } from '../types/goods'

export const [itemsStore, setItemsStore] = createStore<
    Record<string, GoodsItem>
>({})

export const [foldersStore, setFoldersStore] = createStore<
    Record<string, GoodsFolder>
>({})

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

    saveToStorage()
}

export function removeItem(id: string) {
    setItemsStore((state) => {
        delete state[id]
        return state
    })

    saveToStorage()
}

type State = {
    folders: Record<string, GoodsFolder>
    items: Record<string, GoodsItem>
}

const key = 'state'

export function loadFromStorage() {
    const stored = localStorage.getItem(key)
    if (stored !== null) {
        const parsed = JSON.parse(stored) as State
        setFoldersStore(parsed.folders)
        setItemsStore(parsed.items)
    }
}

export function saveToStorage() {
    const state: State = {
        folders: foldersStore,
        items: itemsStore,
    }

    localStorage.setItem(key, JSON.stringify(state))
}

loadFromStorage()
