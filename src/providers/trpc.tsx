import { createTRPCReact, httpBatchLink } from '@trpc/react-query'
import { AppRouter } from '../../trpc'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const trpc = createTRPCReact<AppRouter>()

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    }
  }
})

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: '/api/tprc'
    })
  ]
})

export type TRPCQueryProviderProps = {
  children: React.ReactNode
}
export const TRPCQueryProvider = ({ children }: TRPCQueryProviderProps) => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  )
}
