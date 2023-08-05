import { initTRPC } from '@trpc/server'
import { TRPCContext } from './createContext'

export const t = initTRPC.context<TRPCContext>().create()
