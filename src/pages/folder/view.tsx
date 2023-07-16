import { Component, createMemo } from 'solid-js'
import { FolderHeader } from '../../components/folderHeader'

import { GoodsList } from '../../components/goodsList'
import { Footer } from '../../components/footer'
import { useNavigate, useParams } from '@solidjs/router'
import { Page } from '../../components/page'
import { PageContent } from '../../components/pageContent'

export const FolderView: Component = () => {
    const params = useParams<{ id?: string }>()
    const folderId = createMemo(() => params.id ?? null)

    const navigate = useNavigate()

    return (
        <Page>
            <FolderHeader id={folderId()} />
            <PageContent>
                <GoodsList folderId={folderId()} />
            </PageContent>
            <Footer
                actions={[
                    () => (
                        <>
                            <button
                                onclick={() => {
                                    navigate(`/folder/create/${folderId()}`)
                                }}
                            >
                                + Папка
                            </button>
                        </>
                    ),
                ]}
            />
        </Page>
    )
}
