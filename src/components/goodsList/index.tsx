import { Component, For, createMemo } from 'solid-js'
import { GoodsItem } from '../goodsItem'
import { GoodsFolder } from '../goodsFolder'
import { foldersStore, itemsStore } from '../../stores/goods'
import type * as goodsTypes from '../../types/goods'

type Props = {
    folderId?: string | null
    search?: string
}

export const GoodsList: Component<Props> = (props) => {
    function check(record: goodsTypes.GoodsFolder | goodsTypes.GoodsItem) {
        return (
            (props.folderId === undefined ||
                record.folderId === props.folderId) &&
            (props.search === undefined ||
                record.name.includes(props.search) ||
                ('barcode' in record && record.barcode.includes(props.search)))
        )
    }

    const folders = createMemo(() =>
        Object.entries(foldersStore).filter(([, folder]) => check(folder)),
    )
    const items = createMemo(() =>
        Object.entries(itemsStore).filter(([, item]) => check(item)),
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
