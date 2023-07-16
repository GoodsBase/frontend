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

export const FolderUpsert: Component = () => {
    const params = useParams<{ id?: string }>()
    const folder = createMemo(() => foldersStore[params.id!])

    createEffect(() => {
        console.log(foldersStore)
    })

    const isCreate = useMatch(() => '/folder/create/:id')

    const [name, setName] = createSignal<string>(
        (!isCreate() && folder()?.name) || '',
    )

    const navigate = useNavigate()

    function save() {
        if (isCreate()) {
            const id = createId()

            const folder: GoodsFolder = {
                folderId: params.id ?? null,
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

    const actions = createMemo(() => {
        const actions: Component[] = [
            () => {
                return (
                    <button onClick={save}>
                        {isCreate() ? 'Додати' : 'Зберегти'}
                    </button>
                )
            },
        ]
        if (!isCreate()) {
            actions.push(() => {
                return <button>Видалити</button>
            })
        }
        return actions
    })

    return (
        <Page>
            <Header
                Icon={() => <BackButton />}
                title={isCreate() ? 'Нова папка' : 'Редагування папки'}
                subtitle={isCreate() && folder()?.name}
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
            <Footer actions={actions()} />
        </Page>
    )
}
