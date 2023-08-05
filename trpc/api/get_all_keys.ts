import { t } from '../builder'

export const get_all_keys = t.procedure
  .query(async ({ ctx }) => {
    return ctx.db
      .selectFrom('kv')
      .selectAll()
      .execute()
  })
