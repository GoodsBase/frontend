import { Component, createMemo } from 'solid-js'
import { FolderHeader } from '../../components/folderHeader'

import { GoodsList } from '../../components/goodsList'
import { Footer } from '../../components/footer'
import { useNavigate, useParams } from '@solidjs/router'
import { Page } from '../../components/page'
import { PageContent } from '../../components/pageContent'
import { IconButton } from '../../components/iconButton'
import {
    IconCubePlus,
    IconFolderPlus,
    IconListSearch,
} from '@tabler/icons-solidjs'

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
                leftActions={[
                    () => (
                        <IconButton
                            onClick={() => {
                                navigate(`/folder/create/${folderId() ?? ''}`)
                            }}
                        >
                            <IconFolderPlus size={48} />
                        </IconButton>
                    ),
                    () => (
                        <IconButton
                            onClick={() => {
                                navigate(`/item/create/${folderId() ?? ''}`)
                            }}
                        >
                            <IconCubePlus size={48} />
                        </IconButton>
                    ),
                ]}
                rightActions={[
                    () => (
                        <IconButton
                            onClick={() => {
                                navigate(`/search`)
                            }}
                        >
                            <IconListSearch size={48} />
                        </IconButton>
                    ),
                ]}
            />
        </Page>
    )
}
