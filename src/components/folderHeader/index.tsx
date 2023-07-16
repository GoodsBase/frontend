import { Component, Show, createMemo } from 'solid-js'
import { IconPackage } from '@tabler/icons-solidjs'
import { foldersStore } from '../../stores/goods'
import { Header } from '../header'
import { BackButton } from '../backButton'

type Props = {
    folderId: string | null
}

export const FolderHeader: Component<Props> = (props) => {
    const folder = createMemo(() =>
        props.folderId
            ? foldersStore.find((folder) => folder.id === props.folderId)!
            : undefined,
    )

    return (
        <Header
            Icon={() => (
                <Show when={props.folderId === null} fallback={<BackButton />}>
                    <IconPackage size={48} />
                </Show>
            )}
            title={folder()?.name ?? 'GoodsBase'}
            subtitle={`${folder()?.itemsCount} товарів`}
        />
    )
}
