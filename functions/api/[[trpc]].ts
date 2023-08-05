import { appRouter } from '../../trpc'
import tRPCPlugin, { FetchCreateContextWithCloudflareEnvFnOptions } from 'cloudflare-pages-plugin-trpc'

import { parse } from 'cookie'

export type Env = {
  CLERK_SECRET_KEY: string
}

export type TRPCContext = ReturnType<typeof createContext>

const createContext = (ctx: FetchCreateContextWithCloudflareEnvFnOptions<Env>) => {
  const headerToken = ctx.req.headers.get('authorization')?.replace(`Bearer `, '')
  const cookieToken = parse(ctx.req.headers.get('Cookie') || '')['__session']

  return {
    env: ctx.env,
    jwt_token: headerToken || cookieToken,
  }
}

export const onRequest: PagesFunction<Env> = tRPCPlugin<Env>({
  router: appRouter,
  endpoint: "/api/trpc",
  createContext,
})
