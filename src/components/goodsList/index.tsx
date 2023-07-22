import { Component, Match, Show, Switch, createMemo } from 'solid-js'
import { GoodsFolder } from '../goodsFolder'
import { foldersStore, itemsStore } from '../../stores/goods'
import type * as goodsTypes from '../../types/goods'
import { createVirtualizer } from '@tanstack/solid-virtual'
import { GoodsItem } from '../goodsItem'
import style from './style.module.css'
import { IconCornerLeftDown } from '@tabler/icons-solidjs'

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
                record.name
                    .toLowerCase()
                    .includes(props.search.toLowerCase()) ||
                ('barcode' in record && record.barcode.includes(props.search)))
        )
    }

    let parentRef!: HTMLDivElement

    const folders = createMemo(() =>
        Object.entries(foldersStore).filter(([, folder]) => check(folder)),
    )

    const items = createMemo(() =>
        Object.entries(itemsStore).filter(([, item]) => check(item)),
    )

    const listLength = () => folders().length + items().length

    const rowVirtualizer = createMemo(() => {
        const list = [...folders(), ...items()]
        return createVirtualizer({
            count: listLength(),
            getScrollElement: () => parentRef,
            estimateSize: () => 70,
            getItemKey: (index) => {
                const [id] = list[index]
                return id
            },
        })
    })

    const List: Component = () => {
        return (
            <div ref={parentRef}>
                <div
                    style={{
                        height: `${rowVirtualizer().getTotalSize()}px`,
                        width: '100%',
                        position: 'relative',
                    }}
                >
                    {rowVirtualizer()
                        .getVirtualItems()
                        .map((virtualItem) => (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: `${virtualItem.size}px`,
                                    transform: `translateY(${virtualItem.start}px)`,
                                }}
                            >
                                <Show
                                    when={virtualItem.index < folders().length}
                                    fallback={
                                        <GoodsItem
                                            id={virtualItem.key as string}
                                        />
                                    }
                                >
                                    <GoodsFolder
                                        id={virtualItem.key as string}
                                    />
                                </Show>
                            </div>
                        ))}
                </div>
            </div>
        )
    }

    return (
        <>
            <Switch>
                <Match
                    when={listLength() === 0 && props.folderId !== undefined}
                >
                    <div class={style.center}>
                        <h2>Товари відстутні</h2>
                        <div class={style.createItem}>
                            <IconCornerLeftDown size={36} />
                            Додати новий
                        </div>
                    </div>
                </Match>
                <Match when={listLength() === 0 && props.search !== undefined}>
                    <div class={style.center}>
                        <h2>Нічого не знайдено</h2>
                    </div>
                </Match>
                <Match when={listLength() > 0}>
                    <List />
                </Match>
            </Switch>
        </>
    )
}
