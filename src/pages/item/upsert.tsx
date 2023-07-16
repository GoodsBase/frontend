import { useMatch, useNavigate, useParams } from '@solidjs/router'
import { Component, createMemo } from 'solid-js'
import { Page } from '../../components/page'
import { Header } from '../../components/header'
import { BackButton } from '../../components/backButton'
import { foldersStore, itemsStore, setItemsStore } from '../../stores/goods'
import { Footer } from '../../components/footer'
import { PageContent } from '../../components/pageContent'
import { createId } from '@paralleldrive/cuid2'
import { GoodsFolder, GoodsItem } from '../../types/goods'
import { IconButton } from '../../components/iconButton'
import { IconCheck } from '@tabler/icons-solidjs'
import { base } from '../../environment'
import { createStore } from 'solid-js/store'

export const ItemUpsert: Component = () => {
    const params = useParams<{ id?: string; folderId?: string }>()
    const folderId = createMemo(() => params.folderId ?? null)
    const parentFolder = createMemo<GoodsFolder | undefined>(
        () => foldersStore[params.folderId!],
    )

    const isCreate = useMatch(() => `${base}/item/create/:folderId?`)

    const storedItem: GoodsItem | undefined = itemsStore[params.id!]
    const [item, setItem] = createStore<GoodsItem>({
        folderId: storedItem?.folderId ?? folderId(),
        name: storedItem?.name ?? '',
        barcode: storedItem?.barcode ?? '',
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
            setItemsStore({ ...itemsStore, [id]: item })
        } else {
            setItemsStore(params.id!, item)
        }

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
            />
            <PageContent>
                <input
                    placeholder="Назва"
                    value={item.name}
                    onChange={(event) => {
                        setItem('name', event.target.value)
                    }}
                />
                <input
                    placeholder="Штрихкод"
                    value={item.barcode}
                    onChange={(event) => {
                        setItem('barcode', event.target.value)
                    }}
                />
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
                            <IconButton onClick={save}>
                                <IconCheck size={48} />
                            </IconButton>
                        )
                    },
                ]}
            />
        </Page>
    )
}
