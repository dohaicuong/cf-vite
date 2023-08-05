import { ClerkProvider } from '@clerk/clerk-react'

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!clerkPubKey) {
  throw 'Missing Clerk Publishable Key'
}

type ClerkAuthProviderProps = {
  children: React.ReactNode
}
export const ClerkAuthProvider = ({ children }: ClerkAuthProviderProps) => {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      {children}
    </ClerkProvider>
  )
}
