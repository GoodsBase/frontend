import { ParentComponent } from 'solid-js'
import style from './style.module.css'

export const PageContent: ParentComponent = (props) => {
    return <div class={style.container}>{props.children}</div>
}
