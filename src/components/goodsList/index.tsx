import { Component, For, createEffect, createMemo } from 'solid-js'
import { GoodsItem } from '../goodsItem'
import { GoodsFolder } from '../goodsFolder'
import { foldersStore, itemsStore } from '../../stores/goods'

type Props = {
    folderId: string | null
}

export const GoodsList: Component<Props> = (props) => {
    const folders = createMemo(() =>
        Object.entries(foldersStore).filter(
            ([, folder]) => folder.folderId === props.folderId,
        ),
    )
    const items = createMemo(() =>
        Object.entries(itemsStore).filter(
            ([, item]) => item.folderId === props.folderId,
        ),
    )

    return (
        <>
            <For each={folders()}>
                {([id]) => {
                    return <GoodsFolder id={id} />
                }}
            </For>
            <For each={items()}>
                {([id]) => {
                    return <GoodsItem id={id} />
                }}
            </For>
        </>
    )
}
