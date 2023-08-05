import { appRouter } from '../../trpc'
import tRPCPlugin from 'cloudflare-pages-plugin-trpc'

import { createContext } from '../../trpc/createContext'

export type Env = {
  CLERK_SECRET_KEY: string
  DB: D1Database
}

export const onRequest: PagesFunction<Env> = tRPCPlugin<Env>({
  router: appRouter,
  endpoint: "/api/trpc",
  createContext,
})
