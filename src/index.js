import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import { App } from './components'

import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './providers/AuthProvider'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Toaster />
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
)
