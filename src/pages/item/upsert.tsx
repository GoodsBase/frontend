import { useMatch, useNavigate, useParams } from '@solidjs/router'
import { Component, createEffect, createMemo, createSignal } from 'solid-js'
import { Page } from '../../components/page'
import { Header } from '../../components/header'
import { BackButton } from '../../components/backButton'
import {
    changeFolderItemsCount,
    foldersStore,
    itemsStore,
    removeItem,
    saveToStorage,
    setItemsStore,
} from '../../stores/goods'
import { Footer } from '../../components/footer'
import { PageContent } from '../../components/pageContent'
import { createId } from '@paralleldrive/cuid2'
import { GoodsFolder, GoodsItem } from '../../types/goods'
import { IconButton } from '../../components/iconButton'
import { IconCheck, IconTrash } from '@tabler/icons-solidjs'
import { base } from '../../environment'
import { createStore } from 'solid-js/store'
import { BarcodeInput } from '../../components/barcodeInput'

export const ItemUpsert: Component = () => {
    const params = useParams<{ id?: string; folderId?: string }>()
    const storedItem: GoodsItem | undefined = itemsStore[params.id!]

    const folderId = createMemo(
        () => params.folderId ?? storedItem?.folderId ?? null,
    )
    const parentFolder = createMemo<GoodsFolder | undefined>(
        () => foldersStore[folderId()!],
    )
    createEffect(() => console.log(parentFolder()))

    const isCreate = useMatch(() => `${base}/item/create/:folderId?`)

    const barcodeSignal = createSignal(storedItem?.barcode ?? '')
    const [barcode] = barcodeSignal

    const [item, setItem] = createStore<Omit<GoodsItem, 'barcode'>>({
        folderId: storedItem?.folderId ?? folderId(),
        name: storedItem?.name ?? '',
        price: storedItem?.price ?? null,
        measurmentUnit: storedItem?.measurmentUnit ?? '',
    })

    const navigate = useNavigate()

    function save() {
        if (item.price === null) {
            setItem('price', 0)
        }
        if (isCreate()) {
            const id = createId()
            setItemsStore({
                ...itemsStore,
                [id]: { ...item, barcode: barcode() },
            })
            changeFolderItemsCount(folderId(), 1)
        } else {
            setItemsStore(params.id!, { ...item, barcode: barcode() })
        }

        saveToStorage()
        navigate(-1)
    }

    function remove() {
        if (!confirm(`Видалити товар "${item.name}"?`)) return
        removeItem(params.id!)
        navigate(-1)
    }

    return (
        <Page>
            <Header
                Icon={() => <BackButton />}
                title={isCreate() ? 'Новий товар' : 'Редагування товару'}
                subtitle={
                    parentFolder() && `Усередині "${parentFolder()?.name}"`
                }
                actions={
                    isCreate()
                        ? undefined
                        : [
                              () => {
                                  return (
                                      <IconButton
                                          onClick={remove}
                                          aria-label="Видалити товар"
                                      >
                                          <IconTrash size={48} />
                                      </IconButton>
                                  )
                              },
                          ]
                }
            />
            <PageContent>
                <input
                    placeholder="Назва"
                    value={item.name}
                    onChange={(event) => {
                        setItem('name', event.target.value)
                    }}
                />
                <BarcodeInput barcodeSignal={barcodeSignal} />
                <input
                    placeholder="Ціна"
                    value={item.price}
                    type="number"
                    min={0}
                    step={0.01}
                    onChange={(event) => {
                        setItem('price', Number(event.target.value))
                    }}
                />

                <input
                    placeholder="Одиниця виміру"
                    value={item.measurmentUnit}
                    onChange={(event) => {
                        setItem('measurmentUnit', event.target.value)
                    }}
                />
            </PageContent>
            <Footer
                rightActions={[
                    () => {
                        return (
                            <IconButton onClick={save} aria-label="Зберегти">
                                <IconCheck size={48} />
                            </IconButton>
                        )
                    },
                ]}
            />
        </Page>
    )
}
