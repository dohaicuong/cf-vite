import { appRouter } from '../../trpc'
import tRPCPlugin, { FetchCreateContextWithCloudflareEnvFnOptions } from 'cloudflare-pages-plugin-trpc'

import { parse } from 'cookie'

import { Kysely } from 'kysely'
import { D1Dialect } from 'kysely-d1'

export type Env = {
  CLERK_SECRET_KEY: string
  DB: D1Database
}

export type TRPCContext = ReturnType<typeof createContext>

const createContext = (ctx: FetchCreateContextWithCloudflareEnvFnOptions<Env>) => {
  const headerToken = ctx.req.headers.get('authorization')?.replace(`Bearer `, '')
  const cookieToken = parse(ctx.req.headers.get('Cookie') || '')['__session']

  const db = new Kysely<Database>({
    dialect: new D1Dialect({ database: ctx.env.DB })
  })

  return {
    env: ctx.env,
    jwt_token: headerToken || cookieToken,
    db,
  }
}

export const onRequest: PagesFunction<Env> = tRPCPlugin<Env>({
  router: appRouter,
  endpoint: "/api/trpc",
  createContext,
})

type Database = {
  kv: KvTable
}

type KvTable = {
  key: string
  value: string
}
