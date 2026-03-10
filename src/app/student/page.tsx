import Link from 'next/link'
import { Button } from '@/components/ui'
import { AuthLayout } from '@/components/layout/AuthLayout'

export default function StudentPage() {
  return (
    <AuthLayout 
      title="Student Portal" 
      subtitle="Access your academic support and campaign management"
    >
      <div className="space-y-4">
        <Link href="/student/signin" className="block">
          <Button className="w-full" size="lg">
            Sign In
          </Button>
        </Link>
        
        <Link href="/student/signup" className="block">
          <Button variant="outline" className="w-full" size="lg">
            Create Account
          </Button>
        </Link>
        
        <Link href="/student/dashboard" className="block">
          <Button variant="outline" className="w-full" size="lg">
            Go to Dashboard
          </Button>
        </Link>
        
        <div className="text-center text-sm text-muted-foreground">
          <p>Don't have an account? You'll receive a verification email.</p>
        </div>
      </div>
    </AuthLayout>
  )
}
