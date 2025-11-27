import {createRoot} from "react-dom/client";
import React from "react";
import App from "./App";
import './styles/globals.css'
import './styles/variables.css'
import './styles/typography.css'

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)