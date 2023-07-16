import { ParentComponent } from 'solid-js'
import style from './style.module.css'

export const Page: ParentComponent = (props) => {
    return <div class={style.page}>{props.children}</div>
}
