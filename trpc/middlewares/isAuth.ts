import { TRPCError } from '@trpc/server';
import { t } from '../builder';
import { getClerkJWKS, verifyClerkJwt } from '../services/clerk';

export const isAuth = (throwError?: boolean) => t.middleware(async ({ ctx, next }) => {
  let result = await parseJwt(
    ctx.env.CLERK_SECRET_KEY,
    ctx.jwt_token
  )

  if (throwError && !result.success) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      cause: {
        name: result.name,
        errors: result.errors,
      }
    })
  }

  const jwt_payload = result.success
    ? result.payload
    : undefined

  return next({
    ctx: {
      ...ctx,
      jwt_payload
    },
  })
})

const parseJwt = async (clerkSecret: string, token: string) => {
  const jwtsResponse = await getClerkJWKS(clerkSecret)
  if (!jwtsResponse.success) {
    return {
      success: false as const,
      name: 'FAILED_GETTING_JWTS' as const,
      errors: jwtsResponse.errors,
    }
  }

  const result = await verifyClerkJwt(jwtsResponse.keys[0], token)
  if (!result.success) {
    return {
      success: false as const,
      name: 'FAILED_VERIFY_JWT' as const,
      errors: [result?.error],
    }
  }

  return {
    success: true as const,
    payload: result.payload,
  }
}
