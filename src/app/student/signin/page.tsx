'use client'

import { useState } from 'react'
import { LoginForm } from '@/components/modules/student/LoginForm'

export default function StudentSignInPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (email: string) => {
    if (!email) return
    
    setIsLoading(true)
    
    try {
      // TODO: Implement actual email token sending logic
      console.log('Sending login token to:', email)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // await sendLoginToken(email)
      alert(`Login token sent to ${email}. Please check your email.`)
    } catch (error) {
      console.error('Failed to send login token:', error)
      alert('Failed to send login token. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
}
