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
    const isValid = await jwt.verify(jwt_token, jwts_key, {
      algorithm: 'RS256'
    })
    if (!isValid) return undefined

    const { payload } = jwt.decode(jwt_token)
    return payload as ClerkClaims
  }
  catch (error) {
    console.log('verifyClerkJwt', error)
    return undefined
  }
}
