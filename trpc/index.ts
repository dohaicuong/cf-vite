import { t } from './builder'
import { isAuth } from './middlewares/isAuth'
import { getClerkClient } from './services/clerk'

export const appRouter = t.router({
  greeting: t.procedure
    .use(isAuth())
    .query(async ({ ctx }) => {
      if (ctx.jwt_payload) {
        const clerk = getClerkClient(ctx.env.CLERK_SECRET_KEY)
        const user = await clerk.users.getUser(ctx.jwt_payload.sub)

        return `hello ${user.firstName}!`
      }

      return `hello world!`
    }),
  get_all_keys: t.procedure
    .query(async ({ ctx }) => {
      return ctx.db
        .selectFrom('kv')
        .selectAll()
        .execute()
    })
})

export type AppRouter = typeof appRouter
