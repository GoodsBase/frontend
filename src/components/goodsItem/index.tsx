import { Component, createMemo } from 'solid-js'
import style from './style.module.css'
import { itemsStore } from '../../stores/goods'

type Props = {
    id: string
}

export const GoodsItem: Component<Props> = (props) => {
    const item = createMemo(() => itemsStore[props.id])

    return (
        <div class={style.item}>
            <span class={style.name}>{item().name}</span>
            <div class={style.bottomRow}>
                <span class={style.barcode}>{item().barcode}</span>
                <span class={style.price}>
                    {item().price.toFixed(2)}/{item().measurmentUnit}
                </span>
            </div>
        </div>
    )
}
