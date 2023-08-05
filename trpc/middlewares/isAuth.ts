import { t } from '../builder';
import { ClerkClaims, getClerkJWKS, verifyClerkJwt } from '../services/clerk';

export const isAuth = t.middleware(async ({ ctx, next }) => {
  let jwt_payload: ClerkClaims | undefined = undefined

  const jwtsResponse = await getClerkJWKS(ctx.env.CLERK_SECRET_KEY)
  if (jwtsResponse.success) {
    jwt_payload = await verifyClerkJwt(jwtsResponse.keys[0], ctx.jwt_token)
  }

  return next({
    ctx: {
      ...ctx,
      jwt_payload
    },
  })
})
