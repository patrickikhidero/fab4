'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function StudentDashboardPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to application profile by default
    router.push('/student/dashboard/application/profile')
  }, [router])

  return null
}
