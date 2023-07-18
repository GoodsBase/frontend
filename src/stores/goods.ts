import { createStore } from 'solid-js/store'
import { GoodsFolder, GoodsItem } from '../types/goods'
import { createSignal } from 'solid-js'

export const [itemsStore, setItemsStore] = createStore<
    Record<string, GoodsItem>
>({})

export const [foldersStore, setFoldersStore] = createStore<
    Record<string, GoodsFolder>
>({})

export function removeFolder(id: string) {
    const folder = foldersStore[id]
    changeFolderItemsCount(folder.folderId, -folder.itemsCount)

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
    let folderId = itemsStore[id].folderId
    setItemsStore((state) => {
        delete state[id]
        return state
    })
    changeFolderItemsCount(folderId, -1)
    saveToStorage()
}

export const [rootItemCount, setRootItemCount] = createSignal(0)

export function getFolderItemsCount(folderId: string | null) {
    if (folderId === null) {
        return rootItemCount()
    } else {
        return foldersStore[folderId].itemsCount
    }
}

export function changeFolderItemsCount(folderId: string | null, diff: number) {
    if (folderId === null) {
        setRootItemCount((x) => x + diff)
    } else {
        const folder = foldersStore[folderId]
        setFoldersStore(folderId, (state) => {
            return {
                ...state,
                itemsCount: state.itemsCount + diff,
            }
        })
        changeFolderItemsCount(folder.folderId, diff)
    }
}

type State = {
    rootItemsCount: number
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
        setRootItemCount(parsed.rootItemsCount ?? 0)
    }
}

export function saveToStorage() {
    const state: State = {
        folders: foldersStore,
        items: itemsStore,
        rootItemsCount: rootItemCount(),
    }

    localStorage.setItem(key, JSON.stringify(state))
}

loadFromStorage()
