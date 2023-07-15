import { Component } from 'solid-js'

export type TablerIconsProps = {
    key?: string | number
    ref?: string | ((component: any) => any)
    color?: string
    size?: string | number
    strokeWidth?: string | number
    class?: string
}

export type TablerIcon = Component<TablerIconsProps>
