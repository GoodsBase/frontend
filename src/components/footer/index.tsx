import { Component, For } from 'solid-js'
import style from './style.module.css'

type Props = {
    actions: Component[]
}

export const Footer: Component<Props> = (props) => {
    return (
        <div class={style.container}>
            <For each={props.actions}>
                {(Action) => {
                    return <Action />
                }}
            </For>
        </div>
    )
}
