import jwt from '@tsndr/cloudflare-worker-jwt'
import { JWKSKey } from './types'

export type ClerkClaims = {
  azp: string
  exp: number
  iat: number
  iss: string
  nbf: number
  sid: string
  sub: string
}

export const verifyClerkJwt = async (jwts_key: JWKSKey, jwt_token: string) => {
  try {
    await jwt.verify(jwt_token, jwts_key, {
      algorithm: 'RS256',
      throwError: true
    })

    const { payload } = jwt.decode(jwt_token)
    return {
      success: true as const,
      payload: payload as ClerkClaims
    }
  }
  catch (error) {
    console.log('verifyClerkJwt', error)
    return {
      success: false as const,
      error: error as Error
    }
  }
}
