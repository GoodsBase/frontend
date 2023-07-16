import { useNavigate } from '@solidjs/router'
import { IconChevronLeft } from '@tabler/icons-solidjs'
import { Component } from 'solid-js'

export const BackButton: Component = () => {
    const navigate = useNavigate()
    return <IconChevronLeft size={48} onclick={() => navigate(-1)} />
}
