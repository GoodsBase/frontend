/* @refresh reload */
import { render } from 'solid-js/web'
import { Route, Router, Routes } from '@solidjs/router'

import './index.css'
import { FolderView } from './pages/folder/view'
import { FolderUpsert } from './pages/folder/upsert'
import { base } from './environment'
import { ItemUpsert } from './pages/item/upsert'
import { SearchPage } from './pages/search'
import { BarcodeDialog } from './components/barcodeScanner'
import { SettingsPage } from './pages/settings'

const root = document.getElementById('root')

render(
    () => (
        <>
            <BarcodeDialog />
            <Router base={base}>
                <Routes>
                    <Route path={['/', '/folder/:id']} component={FolderView} />
                    <Route
                        path={['/folder/create/:id?', '/folder/:id/edit']}
                        component={FolderUpsert}
                    />
                    <Route
                        path={['/item/create/:folderId?', '/item/:id']}
                        component={ItemUpsert}
                    />
                    <Route path={'/search'} component={SearchPage} />
                    <Route path={'/settings'} component={SettingsPage} />
                </Routes>
            </Router>
        </>
    ),
    root!,
)
