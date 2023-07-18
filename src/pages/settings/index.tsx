import { Component } from 'solid-js'
import { Page } from '../../components/page'
import { Header } from '../../components/header'
import { BackButton } from '../../components/backButton'
import { PageContent } from '../../components/pageContent'
import {
    State,
    getState,
    saveToStorage,
    setFoldersStore,
    setItemsStore,
    setRootItemCount,
    setState,
} from '../../stores/goods'
import { reconcile } from 'solid-js/store'
import { useNavigate } from '@solidjs/router'

export const SettingsPage: Component = () => {
    const navigate = useNavigate()

    function exportData() {
        const state = getState()
        const json = JSON.stringify(state)
        const blob = new Blob([json], { type: 'application/json' })

        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')

        link.href = url
        link.download = 'goods'
        link.click()

        URL.revokeObjectURL(url)
    }

    let fileInputRef!: HTMLInputElement

    function importData() {
        debugger
        console.log(fileInputRef)
        if (!fileInputRef.files?.[0]) {
            alert('Оберіть файл в полі вище')
            return
        }

        if (
            !confirm(
                'Імпортувати дані? Ця операція замінить всі поточні дані на зміст файлу!',
            )
        ) {
            return
        }

        const selectedFile = fileInputRef.files[0]
        const fileReader = new FileReader()
        fileReader.addEventListener('load', (event) => {
            const fileContent = event.target!.result as string
            const state: State = JSON.parse(fileContent)
            setState(state)
            saveToStorage()
            navigate(-1)
        })
        fileReader.readAsText(selectedFile)
    }

    function removeData() {
        if (!confirm('Видалити всі дані?')) {
            return
        }
        setItemsStore(reconcile({}))
        setFoldersStore(reconcile({}))
        setRootItemCount(0)
        saveToStorage()
        navigate(-1)
    }

    return (
        <Page>
            <Header Icon={() => <BackButton />} title="Налаштування" />
            <PageContent>
                <button onClick={exportData}>Вивантажити дані у файл</button>
                <hr />
                <input type="file" ref={fileInputRef} />
                <button onClick={importData}>Завантажити дані з файлу</button>
                <hr />
                <button onClick={removeData}>Видалити всі дані</button>
            </PageContent>
        </Page>
    )
}
