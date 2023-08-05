import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TRPCQueryProvider } from './providers/trpc.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TRPCQueryProvider>
      <App />
    </TRPCQueryProvider>
  </React.StrictMode>,
)
