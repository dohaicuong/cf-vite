import { JWKSKey } from './types'

export type ClerkJWKSPayload = {
  keys: JWKSKey[]
}

export type ClerkJWKSError = {
  clerk_trace_id: string
  errors: Array<{
    code: string
    message: string
    long_message: string
  }>
}

export const getClerkJWKS = async (clerkSecretKey: string) => {
  return fetch('https://api.clerk.com/v1/jwks', {
    headers: {
      authorization: `Bearer ${clerkSecretKey}`
    }
  })
    .then(async res => {
      if (res.status === 200) {
        const payload = await res.json<ClerkJWKSPayload>()
        return {
          success: true as const,
          ...payload
        }
      }

      const payload = await res.json<ClerkJWKSError>()
      return {
        success: false as const,
        ...payload
      }
    })
}
