/* @refresh reload */
import { render } from 'solid-js/web'
import { Route, Router, Routes } from '@solidjs/router'

import './index.css'
import { Root } from './pages/root'

const root = document.getElementById('root')

render(
    () => (
        <Router>
            <Routes>
                <Route path="/" component={Root} />
            </Routes>
        </Router>
    ),
    root!,
)
