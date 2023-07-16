import { Component } from 'solid-js'
import style from './style.module.css'

type Props = {
    Icon?: Component
    title: string
    subtitle?: string
}

export const Header: Component<Props> = (props) => {
    return (
        <div class={style.container}>
            {props.Icon && <props.Icon />}
            <div class={style.labels}>
                <span class={style.title}>{props.title}</span>
                {props.subtitle && (
                    <span class={style.subtitle}>{props.subtitle}</span>
                )}
            </div>
        </div>
    )
}
