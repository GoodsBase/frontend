import { Component } from 'solid-js'
import style from './style.module.css'

type Props = {
    name: string
    price: number
    barcode: string
    measurmentUnit: string
}

export const GoodsItem: Component<Props> = (props) => {
    return (
        <div class={style.item}>
            <span class={style.name}>{props.name}</span>
            <div class={style.bottomRow}>
                <span class={style.barcode}>{props.barcode}</span>
                <span class={style.price}>
                    {props.price}/{props.measurmentUnit}
                </span>
            </div>
        </div>
    )
}
