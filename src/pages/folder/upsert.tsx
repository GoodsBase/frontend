import { useMatch, useNavigate, useParams } from '@solidjs/router'
import { Component, createMemo, createSignal } from 'solid-js'
import { Page } from '../../components/page'
import { Header } from '../../components/header'
import { BackButton } from '../../components/backButton'
import {
    foldersStore,
    saveToStorage,
    setFoldersStore,
} from '../../stores/goods'
import { Footer } from '../../components/footer'
import { PageContent } from '../../components/pageContent'
import { createId } from '@paralleldrive/cuid2'
import { GoodsFolder } from '../../types/goods'
import { IconButton } from '../../components/iconButton'
import { IconCheck } from '@tabler/icons-solidjs'
import { base } from '../../environment'

export const FolderUpsert: Component = () => {
    const params = useParams<{ id?: string }>()
    const folderId = createMemo(() => params.id ?? null)
    const folder = createMemo(() => foldersStore[params.id!])

    const isCreate = useMatch(() => `${base}/folder/create/:id?`)

    const [name, setName] = createSignal<string>(
        (!isCreate() && folder()?.name) || '',
    )

    const navigate = useNavigate()

    function save() {
        if (isCreate()) {
            const id = createId()

            const folder: GoodsFolder = {
                folderId: folderId(),
                itemsCount: 0,
                name: name(),
            }

            setFoldersStore({ ...foldersStore, [id]: folder })
        } else {
            setFoldersStore(params.id!, (folder) => ({
                ...folder,
                name: name(),
            }))
        }

        saveToStorage()
        navigate(-1)
    }

    return (
        <Page>
            <Header
                Icon={() => <BackButton />}
                title={isCreate() ? 'Нова папка' : 'Редагування папки'}
                subtitle={
                    isCreate() && folder() && `Усередині "${folder().name}"`
                }
            />
            <PageContent>
                <input
                    placeholder="Назва"
                    value={name()}
                    onChange={(event) => {
                        setName(event.target.value)
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
