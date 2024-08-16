import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { ContextProvider } from './context/userContext.jsx'


export const server = "https://backend-digipay.onrender.com/api/v1"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </ContextProvider>
  </React.StrictMode>,
)
