import Link from 'next/link'
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from '@/components/ui'
import { AuthLayout } from '@/components/layout/AuthLayout'

export default function StudentSignUpPage() {
  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Tell us about yourself to get started"
    >
      <Card>
        <CardHeader>
          <CardTitle>Student Registration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              required
            />
            
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email address"
              required
            />
            
            <Input
              label="Institution"
              type="text"
              placeholder="Your school or university"
              required
            />
            
            <Input
              label="Course of Study"
              type="text"
              placeholder="e.g., Computer Science"
              required
            />
            
            <Input
              label="Year of Study"
              type="number"
              placeholder="1, 2, 3, 4..."
              min="1"
              max="10"
              required
            />
            
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>
          
          <div className="text-center text-sm">
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Link href="/student/signin" className="text-primary hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
