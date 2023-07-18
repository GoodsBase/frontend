import { Component, createMemo } from 'solid-js'
import { FolderHeader } from '../../components/folderHeader'

import { GoodsList } from '../../components/goodsList'
import { Footer } from '../../components/footer'
import { useNavigate, useParams } from '@solidjs/router'
import { Page } from '../../components/page'
import { PageContent } from '../../components/pageContent'
import { IconButton } from '../../components/iconButton'
import {
    IconBarcode,
    IconCubePlus,
    IconFolderPlus,
    IconListSearch,
} from '@tabler/icons-solidjs'
import { openBarcodeScanner } from '../../components/barcodeScanner'
import { itemsStore } from '../../stores/goods'

export const FolderView: Component = () => {
    const params = useParams<{ id?: string }>()
    const folderId = createMemo(() => params.id ?? null)

    const navigate = useNavigate()

    function scanBarcode() {
        openBarcodeScanner((code) => {
            const item = Object.entries(itemsStore).find(
                ([, item]) => item.barcode === code,
            )

            if (!item) {
                alert(`Товар зі штрихкодом ${code} відсутній`)
                return
            }

            const [id] = item
            navigate(`/item/${id}`)
        })
    }

    return (
        <Page>
            <FolderHeader id={folderId()} />
            <PageContent>
                <GoodsList folderId={folderId()} />
            </PageContent>
            <Footer
                leftActions={[
                    () => (
                        <IconButton
                            onClick={() => {
                                navigate(`/folder/create/${folderId() ?? ''}`)
                            }}
                            aria-label="Створити папку"
                        >
                            <IconFolderPlus size={48} />
                        </IconButton>
                    ),
                    () => (
                        <IconButton
                            onClick={() => {
                                navigate(`/item/create/${folderId() ?? ''}`)
                            }}
                            aria-label="Додати товар"
                        >
                            <IconCubePlus size={48} />
                        </IconButton>
                    ),
                ]}
                rightActions={[
                    () => (
                        <IconButton
                            onClick={scanBarcode}
                            aria-label="Сканувати штрихкод"
                        >
                            <IconBarcode size={48} />
                        </IconButton>
                    ),
                    () => (
                        <IconButton
                            onClick={() => {
                                navigate(`/search`)
                            }}
                            aria-label="Пошук"
                        >
                            <IconListSearch size={48} />
                        </IconButton>
                    ),
                ]}
            />
        </Page>
    )
}
