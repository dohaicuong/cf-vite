import { initTRPC } from '@trpc/server'
import { TRPCContext } from '../functions/api/[[trpc]]'

export const t = initTRPC.context<TRPCContext>().create()
