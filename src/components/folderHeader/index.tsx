import { Component, Show, createMemo } from 'solid-js'
import { IconPackage, IconEdit, IconTrash } from '@tabler/icons-solidjs'
import { foldersStore, removeFolder } from '../../stores/goods'
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

    function remove() {
        if (!confirm(`Видалити папку "${folder()!.name}"?`)) return
        removeFolder(props.id!)
        navigate(-1)
    }

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
                          () => (
                              <IconButton onClick={remove}>
                                  <IconTrash size={48} />
                              </IconButton>
                          ),
                      ]
                    : undefined
            }
        />
    )
}
