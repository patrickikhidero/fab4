import React from 'react'
import { cn } from '@/lib/utils'

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {subtitle && (
            <p className="text-muted-foreground">{subtitle}</p>
          )}
        </div>
        
        <div className="space-y-4">
          {children}
        </div>
        
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2024 FabFour Foundation. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
