import { generateToken } from './utils'

export interface EmailToken {
  token: string
  email: string
  type: 'signin' | 'signup'
  expiresAt: Date
  userId?: string
}

// In-memory storage for tokens (replace with database in production)
const tokenStore = new Map<string, EmailToken>()

export function createEmailToken(email: string, type: 'signin' | 'signup', userId?: string): EmailToken {
  const token = generateToken()
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
  
  const emailToken: EmailToken = {
    token,
    email,
    type,
    expiresAt,
    userId
  }
  
  tokenStore.set(token, emailToken)
  
  // Clean up expired tokens
  setTimeout(() => {
    tokenStore.delete(token)
  }, 15 * 60 * 1000)
  
  return emailToken
}

export function validateEmailToken(token: string): EmailToken | null {
  const emailToken = tokenStore.get(token)
  
  if (!emailToken) {
    return null
  }
  
  if (emailToken.expiresAt < new Date()) {
    tokenStore.delete(token)
    return null
  }
  
  return emailToken
}

export function consumeEmailToken(token: string): EmailToken | null {
  const emailToken = validateEmailToken(token)
  if (emailToken) {
    tokenStore.delete(token)
  }
  return emailToken
}

export function sendEmailToken(email: string, token: string, type: 'signin' | 'signup'): Promise<boolean> {
  // TODO: Implement actual email service
  // For now, just log the token
  console.log(`Email token for ${email}: ${token} (${type})`)
  
  return Promise.resolve(true)
}
