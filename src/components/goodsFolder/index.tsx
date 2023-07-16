import { Component, createMemo } from 'solid-js'
import { IconChevronRight } from '@tabler/icons-solidjs'
import style from './style.module.css'
import { foldersStore } from '../../stores/goods'
import { A } from '@solidjs/router'

type Props = {
    id: string
}

export const GoodsFolder: Component<Props> = (props) => {
    const folder = createMemo(() => foldersStore[props.id])

    return (
        <A href={`/folder/${props.id}`}>
            <div class={style.folder}>
                <div class={style.labels}>
                    <span class={style.name}>{folder().name}</span>
                    <span class={style.itemsCount}>
                        {folder().itemsCount} товарів
                    </span>
                </div>
                <IconChevronRight size={48} />
            </div>
        </A>
    )
}
