import { Component, For } from 'solid-js'
import style from './style.module.css'

type Props = {
    leftActions?: Component[]
    rightActions?: Component[]
}

export const Footer: Component<Props> = (props) => {
    return (
        <div class={style.container}>
            <div class={style.group}>
                <For each={props.leftActions}>
                    {(Action) => {
                        return <Action />
                    }}
                </For>
            </div>
            <div class={style.group}>
                <For each={props.rightActions}>
                    {(Action) => {
                        return <Action />
                    }}
                </For>
            </div>
        </div>
    )
}
