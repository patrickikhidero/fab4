'use client'

import { ApplicationStatusSection } from '@/components/modules/student/ApplicationStatusSection'
import { SidebarNavigation } from '@/components/modules/student/SidebarNavigation'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface UserData {
  name: string
  email: string
  avatar: string
}

export default function ApplicationStatusPage() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState<'application' | 'status' | 'campaign'>('status')
  
  const userData: UserData = {
    name: 'Influence',
    email: 'talktome@fabfour.org',
    avatar: '/images/avatars/default-avatar.png'
  }

  const handleNavigationChange = (section: 'application' | 'status' | 'campaign') => {
    if (section === 'application') {
      router.push('/student/dashboard/application/profile')
    } else if (section === 'status') {
      router.push('/student/application-status')
    } else if (section === 'campaign') {
      router.push('/student/dashboard/campaign')
    }
    setActiveSection(section)
  }

  return (
    <div className="flex min-h-screen bg-[#eceee4]">
      <SidebarNavigation 
        currentStep={1}
        userData={userData}
        onNavigationChange={handleNavigationChange}
        activeSection={activeSection}
      />
      <div className="flex-1 p-8">
        <div className="min-h-screen bg-[#eceee4]">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-[20px] shadow-[0px_16px_32px_-8px_rgba(39,38,53,0.1)] p-8">
              <ApplicationStatusSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
