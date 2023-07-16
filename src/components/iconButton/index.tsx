import { ParentComponent, JSX } from 'solid-js'
import style from './style.module.css'

type Props = JSX.IntrinsicElements['button']

export const IconButton: ParentComponent<Props> = (props) => {
    return <button class={style.button} {...props} />
}
