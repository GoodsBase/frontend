/* @refresh reload */
import { render } from 'solid-js/web'
import { Route, Router, Routes } from '@solidjs/router'

import './index.css'
import { FolderView } from './pages/folder/view'
import { FolderUpsert } from './pages/folder/upsert'
import { base } from './environment'
import { ItemUpsert } from './pages/item/upsert'

const root = document.getElementById('root')

render(
    () => (
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
            </Routes>
        </Router>
    ),
    root!,
)
