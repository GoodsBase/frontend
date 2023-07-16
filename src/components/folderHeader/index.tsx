import { Component, Show, createMemo } from 'solid-js'
import { IconPackage, IconEdit } from '@tabler/icons-solidjs'
import { foldersStore } from '../../stores/goods'
import { Header } from '../header'
import { BackButton } from '../backButton'
import { IconButton } from '../iconButton'
import { useNavigate } from '@solidjs/router'

type Props = {
    id: string | null
}

export const FolderHeader: Component<Props> = (props) => {
    const folder = createMemo(() => (props.id ? foldersStore[props.id] : null))

    const navigate = useNavigate()

    return (
        <Header
            Icon={() => (
                <Show when={props.id === null} fallback={<BackButton />}>
                    <IconPackage size={48} />
                </Show>
            )}
            title={folder()?.name ?? 'GoodsBase'}
            subtitle={`${folder()?.itemsCount} товарів`}
            actions={
                folder()
                    ? [
                          () => (
                              <IconButton
                                  onClick={() =>
                                      navigate(`/folder/${props.id}/edit`)
                                  }
                              >
                                  <IconEdit size={48} />
                              </IconButton>
                          ),
                      ]
                    : undefined
            }
        />
    )
}
