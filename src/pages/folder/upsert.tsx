import { useMatch, useParams, useRouteData } from '@solidjs/router'
import { Component, createEffect, createMemo, createSignal } from 'solid-js'
import { Page } from '../../components/page'
import { Header } from '../../components/header'
import { BackButton } from '../../components/backButton'
import { foldersStore } from '../../stores/goods'
import { Footer } from '../../components/footer'
import { PageContent } from '../../components/pageContent'

export const FolderUpsert: Component = () => {
    const params = useParams<{ folderId?: string }>()
    const folder = createMemo(() =>
        foldersStore.find((folder) => folder.id === params.folderId),
    )

    const isCreate = useMatch(() => '/folder/create/:id')

    const actions = createMemo(() => {
        const actions: Component[] = [
            () => {
                return <button>{isCreate() ? 'Додати' : 'Зберегти'}</button>
            },
        ]
        if (!isCreate()) {
            actions.push(() => {
                return <button>Видалити</button>
            })
        }
        return actions
    })

    const [name, setName] = createSignal<string>('')

    createEffect(() => console.log(name()))

    return (
        <Page>
            <Header
                Icon={() => <BackButton />}
                title="Нова папка"
                subtitle={folder()?.name}
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
