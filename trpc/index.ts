import { get_all_keys } from './api/get_all_keys'
import { greeting } from './api/greeting'
import { t } from './builder'

export const appRouter = t.router({
  greeting: greeting,
  get_all_keys: get_all_keys
})

export type AppRouter = typeof appRouter
