import { Component } from 'solid-js'
import { TablerIcon } from '../../types/tabler-icons'
import style from './style.module.css'
import { IconChevronLeft } from '@tabler/icons-solidjs'

type Props = {
    backButton?: boolean
    Icon?: TablerIcon
    text: string
}

export const Header: Component<Props> = (props) => {
    return (
        <div class={style.container}>
            {props.backButton && <IconChevronLeft size={48} />}
            {props.Icon && <props.Icon size={48} />}
            <span class={style.title}>{props.text}</span>
        </div>
    )
}
