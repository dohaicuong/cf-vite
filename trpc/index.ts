import { t } from './builder'

export const appRouter = t.router({
  greeting: t.procedure.query(() => {
    return 'hello tRPC v10!'
  }),
})

export type AppRouter = typeof appRouter
