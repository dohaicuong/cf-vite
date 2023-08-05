import { appRouter } from '../../trpc'
import tRPCPlugin, { FetchCreateContextWithCloudflareEnvFnOptions } from 'cloudflare-pages-plugin-trpc'

export type Env = {

}

export type TRPCContext = ReturnType<typeof createContext>

const createContext = ({ req }: FetchCreateContextWithCloudflareEnvFnOptions<Env>) => {
  return { req }
}

export const onRequest: PagesFunction<Env> = tRPCPlugin<Env>({
  router: appRouter,
  endpoint: "/api/trpc",
  createContext,
})