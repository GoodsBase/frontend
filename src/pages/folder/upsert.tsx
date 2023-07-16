import { useMatch, useNavigate, useParams } from '@solidjs/router'
import { Component, createEffect, createMemo, createSignal } from 'solid-js'
import { Page } from '../../components/page'
import { Header } from '../../components/header'
import { BackButton } from '../../components/backButton'
import { foldersStore, setFoldersStore } from '../../stores/goods'
import { Footer } from '../../components/footer'
import { PageContent } from '../../components/pageContent'
import { createId } from '@paralleldrive/cuid2'
import { GoodsFolder } from '../../types/goods'
import { IconButton } from '../../components/iconButton'
import { IconCheck } from '@tabler/icons-solidjs'
import { base } from '../../environment'

export const FolderUpsert: Component = () => {
    const params = useParams<{ id?: string }>()
    const folderId = createMemo(() =>
        !params.id || params.id === 'null' ? null : params.id,
    )
    const folder = createMemo(() => foldersStore[params.id!])

    const isCreate = useMatch(() => `${base}/folder/create/:id`)
    createEffect(() => console.log(isCreate()))

    const [name, setName] = createSignal<string>(
        (!isCreate() && folder()?.name) || '',
    )

    const navigate = useNavigate()

    function save() {
        if (isCreate()) {
            const id = createId()

            const folder: GoodsFolder = {
                folderId: folderId(),
                itemsCount: NaN,
                name: name(),
            }

            setFoldersStore({ ...foldersStore, [id]: folder })
        } else {
            setFoldersStore(params.id!, (folder) => ({
                ...folder,
                name: name(),
            }))
        }

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
