/* @refresh reload */
import { render } from 'solid-js/web'
import { Route, Router, Routes } from '@solidjs/router'

import './index.css'
import { FolderView } from './pages/folder/view'
import { FolderUpsert } from './pages/folder/upsert'

const root = document.getElementById('root')

const base = import.meta.env.BASE_URL

render(
    () => (
        <Router base={base}>
            <Routes>
                <Route path="/" component={FolderView} />
                <Route path="/folder/:id" component={FolderView} />
                <Route path="/folder/create/:id" component={FolderUpsert} />
                <Route path="/folder/:id/edit" component={FolderUpsert} />
            </Routes>
        </Router>
    ),
    root!,
)
