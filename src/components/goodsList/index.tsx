import { Component, For } from 'solid-js'
import { GoodsItem } from '../goodsItem'
import { GoodsFolder } from '../goodsFolder'
import { foldersStore, itemsStore } from '../../stores/goods'

type Props = {
    folderId: string | null
}

export const GoodsList: Component<Props> = (props) => {
    return (
        <>
            <For
                each={foldersStore.filter(
                    (folder) => folder.folderId === props.folderId,
                )}
            >
                {(folder) => {
                    return <GoodsFolder id={folder.id} />
                }}
            </For>
            <For
                each={itemsStore.filter(
                    (item) => item.folderId === props.folderId,
                )}
            >
                {(item) => {
                    return <GoodsItem id={item.id} />
                }}
            </For>
        </>
    )
}
