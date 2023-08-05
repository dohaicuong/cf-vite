import { FetchCreateContextWithCloudflareEnvFnOptions } from 'cloudflare-pages-plugin-trpc'
import { Env } from '../functions/api/[[trpc]]'
export type TRPCContext = ReturnType<typeof createContext>
export const createContext = (ctx: FetchCreateContextWithCloudflareEnvFnOptions<Env>) => {
  const jwt_token = jwtContext(ctx)
  const db = dbContext(ctx)

  return {
    env: ctx.env,
    jwt_token,
    db,
  }
}

// JWT CONTEXT
import { parse } from 'cookie'
const jwtContext = (ctx: FetchCreateContextWithCloudflareEnvFnOptions<Env>) => {
  const headerToken = ctx.req.headers.get('authorization')?.replace(`Bearer `, '')
  const cookieToken = parse(ctx.req.headers.get('Cookie') || '')['__session']

  return headerToken || cookieToken
}

// DB CONTEXT
import { Kysely } from 'kysely'
import { D1Dialect } from 'kysely-d1'
import { DB } from './services/db/types'
const dbContext = (ctx: FetchCreateContextWithCloudflareEnvFnOptions<Env>) => {
  return new Kysely<DB>({
    dialect: new D1Dialect({ database: ctx.env.DB })
  })
}
