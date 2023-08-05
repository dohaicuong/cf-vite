import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TRPCQueryProvider } from './providers/trpc.tsx'
import { ClerkAuthProvider } from './providers/clerk.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkAuthProvider>
      <TRPCQueryProvider>
        <App />
      </TRPCQueryProvider>
    </ClerkAuthProvider>
  </React.StrictMode>,
)
