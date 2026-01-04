import React from 'react'
import './styles/index.scss'
import App from "./app/App";
import { createRoot } from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import {SkeletonTheme} from "react-loading-skeleton";

const domNode = document.getElementById('root');

if (domNode) {
    const root = createRoot(domNode);
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <SkeletonTheme baseColor="#3a107e40" highlightColor="#88888888">
                    <App />
                </SkeletonTheme>
            </BrowserRouter>
        </React.StrictMode>
    )
}
