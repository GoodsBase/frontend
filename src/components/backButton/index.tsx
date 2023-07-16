import { useNavigate } from '@solidjs/router'
import { IconChevronLeft } from '@tabler/icons-solidjs'
import { Component } from 'solid-js'
import { IconButton } from '../iconButton'

export const BackButton: Component = () => {
    const navigate = useNavigate()
    return (
        <IconButton onClick={() => navigate(-1)}>
            <IconChevronLeft size={48} />
        </IconButton>
    )
}
