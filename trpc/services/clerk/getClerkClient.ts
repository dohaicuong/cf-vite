import Clerk from '@clerk/clerk-sdk-node/esm/instance'
import { clerkClient } from '@clerk/clerk-sdk-node'

// @ts-ignore
export const getClerkClient = (secretKey: string) => new Clerk({ secretKey }) as typeof clerkClient
