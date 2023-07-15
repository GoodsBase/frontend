import { Component, For } from 'solid-js'
import { GoodsTree } from '../../types/goods'
import { GoodsItem } from '../goodsItem'
import { GoodsFolder } from '../goodsFolder'
import style from './style.module.css'

type Props = {
    tree: GoodsTree
}

export const GoodsList: Component<Props> = (props) => {
    return (
        <div class={style.container}>
            <For each={props.tree}>
                {(element) => {
                    return (
                        <>
                            {element.type === 'item' && (
                                <GoodsItem {...element} />
                            )}
                            {element.type === 'folder' && (
                                <GoodsFolder {...element} />
                            )}
                        </>
                    )
                }}
            </For>
        </div>
    )
}
