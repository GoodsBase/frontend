import { Component } from 'solid-js'
import { IconChevronRight } from '@tabler/icons-solidjs'
import style from './style.module.css'

type Props = {
    name: string
    itemsCount: number
}

export const GoodsFolder: Component<Props> = (props) => {
    return (
        <div class={style.folder}>
            <div class={style.labels}>
                <span class={style.name}>{props.name}</span>
                <span class={style.itemsCount}>{props.itemsCount} товарів</span>
            </div>
            <IconChevronRight size={48} />
        </div>
    )
}
