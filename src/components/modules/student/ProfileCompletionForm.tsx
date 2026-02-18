'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarNavigation } from './SidebarNavigation'
import { MainFormArea } from './MainFormArea'
import { ApplicationStatusSection } from './ApplicationStatusSection'
import { ApprovedApplicationStatus } from './ApprovedApplicationStatus'

export function ProfileCompletionForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [activeSection, setActiveSection] = useState<'application' | 'status' | 'campaign'>('application')
  const [applicationStatus, setApplicationStatus] = useState<'under-review' | 'approved'>('under-review')
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '',
    country: '', state: '', address: '', identification: '',
    
    // Step 2: Provide Evidence
    applicationType: 'newly-admitted', // Default to newly admitted
    // Newly admitted fields
    school: '', course: '', courseDuration: '', institutionCountry: '',
    institutionState: '', admissionLetter: null as File | null,
    personalStatement: null as File | null,
    // Returning student fields
    previousSchool: '', previousCourse: '', previousGPA: '', previousYear: '',
    reasonForLeaving: '', academicTranscript: null as File | null,
    withdrawalLetter: null as File | null, reenrollmentLetter: null as File | null,
    characterReference: null as File | null,
    
    // Step 3: Provide Guarantors
    guarantors: [
      {
        id: 'guarantor-1', firstName: 'Koulibaly', lastName: 'Koffi',
        email: 'example@email.com', phone: '874950345', country: '',
        state: '', attestationLetter: null
      }
    ] as Array<{
      id: string; firstName: string; lastName: string; email: string;
      phone: string; country: string; state: string; attestationLetter: File | null;
    }>
  })

  const handleFormChange = (field: string, value: string | File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleGuarantorsChange = (guarantors: Array<{
    id: string
    firstName: string
    lastName: string
    email: string
    phone: string
    country: string
    state: string
    attestationLetter: File | null
  }>) => {
    setFormData(prev => ({
      ...prev,
      guarantors
    }))
  }

  const handleContinue = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving form data:', formData)
  }

  const handleSubmit = () => {
    // Handle successful submission
    console.log('Application submitted successfully:', formData)
    // You can add additional logic here like redirecting to a success page
    // or showing additional confirmation messages
  }

  const handleNavigationChange = (section: 'application' | 'status' | 'campaign') => {
    if (section === 'campaign') {
      router.push('/student/dashboard/campaign')
    } else {
      setActiveSection(section)
    }
  }

  const handleStatusChange = (status: 'under-review' | 'approved') => {
    setApplicationStatus(status)
  }

  return (
    <div className="flex min-h-screen bg-[#eceee4]">
      <SidebarNavigation 
        currentStep={currentStep}
        userData={{
          name: 'Influence',
          email: 'talktome@fabfour.org',
          avatar: '/images/avatars/default-avatar.png'
        }}
        onNavigationChange={handleNavigationChange}
        activeSection={activeSection}
      />
      {activeSection === 'status' ? (
        <div className="flex-1 p-8">
          {applicationStatus === 'approved' ? (
            <ApprovedApplicationStatus />
          ) : (
            <ApplicationStatusSection />
          )}
        </div>
      ) : (
        <MainFormArea
          currentStep={currentStep}
          formData={formData}
          onFormChange={handleFormChange}
          onGuarantorsChange={handleGuarantorsChange}
          onContinue={handleContinue}
          onSave={handleSave}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  )
}
