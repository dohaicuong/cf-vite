import { Suspense, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { trpc } from './providers/trpc'
import { useUser, SignInButton, SignOutButton } from '@clerk/clerk-react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { TRPCClientError } from '@trpc/client'
import { AppRouter } from '../trpc'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <hr />
      <ClerkUser />

      <hr />
      <TrpcErrorBoundary>
        <Suspense fallback='Loading....'>
          <GreetingFromFunction />
        </Suspense>
      </TrpcErrorBoundary>
    </>
  )
}

export default App

const GreetingFromFunction = () => {
  const { data } = trpc.greeting.useQuery()

  return (
    <p>{data}</p>
  )
}

const ClerkUser = () => {
  const payload = useUser()

  if (!payload.isLoaded) return <p>Loading...</p>

  if (!payload.isSignedIn) return <SignInButton />

  return (
    <>
      <p>user: {payload.user.fullName}</p>
      <p>
        <img style={{ width: 40 }} src={payload.user.imageUrl} />
      </p>
      <SignOutButton />
    </>
  )
}

const TrpcErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundary FallbackComponent={TrpcErrorFallback}>
      {children}
    </ErrorBoundary>
  )
}

const TrpcErrorFallback = ({ error }: FallbackProps) => {
  const trpcError = error as TRPCClientError<AppRouter>
  console.log(trpcError.message)

  return <p>Something went wrong!</p>
}
