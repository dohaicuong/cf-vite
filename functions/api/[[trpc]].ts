import { appRouter } from '../../trpc'
import tRPCPlugin, { FetchCreateContextWithCloudflareEnvFnOptions } from 'cloudflare-pages-plugin-trpc'

export type Env = {
  CLERK_SECRET_KEY: string
}

export type TRPCContext = ReturnType<typeof createContext>

const createContext = (ctx: FetchCreateContextWithCloudflareEnvFnOptions<Env>) => {
  console.log({ clerk_key: ctx.env.CLERK_SECRET_KEY })

  return { req: ctx.req }
}

export const onRequest: PagesFunction<Env> = tRPCPlugin<Env>({
  router: appRouter,
  endpoint: "/api/trpc",
  createContext,
})
