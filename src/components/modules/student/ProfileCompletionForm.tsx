'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarNavigation } from './SidebarNavigation'
import { MainFormArea } from './MainFormArea'
import { ApplicationStatusSection } from './ApplicationStatusSection'
import { ApprovedApplicationStatus } from './ApprovedApplicationStatus'
import { 
  submitStudentProfile, 
  uploadStudentDocument, 
  submitGuarantor,
  getStudentProfile,
  StudentProfileResponse
} from '@/lib/student/application'
import { getCampaignOverview, listMyCampaigns } from '@/lib/student/campaign'
import { getStoredUser, getUserIdFromToken } from '@/lib/auth/storage'

export function ProfileCompletionForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [activeSection, setActiveSection] = useState<'application' | 'status' | 'campaign' | 'wallet'>('application')
  const [applicationStatus, setApplicationStatus] = useState<'under-review' | 'approved'>('under-review')
  const [isVerified, setIsVerified] = useState(false)
  const [isLoadingProfile, setIsLoadingProfile] = useState(true)
  const [studentProfile, setStudentProfile] = useState<StudentProfileResponse | null>(null)
  const [campaignSummary, setCampaignSummary] = useState<{
  currentAmount: number
  weekAmount: number
  monthAmount: number
  progress: number
} | null>(null)
  
  // Fetch student profile on mount to check verification status
  useEffect(() => {
    const fetchProfile = async () => {
      // Try to get user ID from localStorage or JWT token
      let userId: number | null = null;
      
      // First, try to get from stored user object
      const storedUser = getStoredUser();
      if (storedUser?.id) {
        userId = storedUser.id;
      } else {
        // Fallback: decode from JWT token
        userId = getUserIdFromToken();
      }
      
      // For demo/development: fallback to 224 if no user found
      if (!userId) {
        console.warn('No user ID found in localStorage, using default 224 for demo');
        userId = 224;
      }
      
      const profile = await getStudentProfile(userId)
      if (profile) {
        setStudentProfile(profile)
        setIsVerified(profile.is_verified)
        
        // If verified, set applicationStatus to approved
        if (profile.is_verified) {
          setApplicationStatus('approved')
        }
        
        // If verified, set default section to status or campaign
        if (profile.is_verified) {
          setActiveSection('status')
        }

        if(profile.is_verified) {
          try {
            const [overview, myCampaigns] = await Promise.all([
              getCampaignOverview(),
              listMyCampaigns()
            ])

            const current = myCampaigns?.results?.[0] ?? null

            const currentAmount =
              overview?.current_campaign_amount ??
              overview?.total_raised ??
              current?.amount_raised ??
              0

            const weekAmount =
              overview?.this_week ??
              overview?.week_raised ??
              0

            const monthAmount =
              overview?.this_month ??
              overview?.month_raised ??
              0

            const progress =
              overview?.progress_percent ??
              (current?.amount_target
                ? Math.round((currentAmount / current.amount_target) * 100)
                : 0)

            setCampaignSummary({
              currentAmount: Number(currentAmount),
              weekAmount: Number(weekAmount),
              monthAmount: Number(monthAmount),
              progress: Number(progress)
            })
          } catch (err) {
            console.error('Failed to fetch campaign summary', err)
          }
        }
      }
      setIsLoadingProfile(false)
    }
    
    fetchProfile()
  }, [])
  
  // API state management
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [profileId, setProfileId] = useState<string | null>(null)
  const [uploadedDocuments, setUploadedDocuments] = useState<string[]>([])
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

  const handleContinue = async () => {
    setError(null)
    
    if (currentStep === 1) {
      // Step 1: Submit student profile
      setIsLoading(true)
      try {
        const profileData = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          date_of_birth: formData.dateOfBirth,
          country: formData.country,
          state: formData.state,
          address: formData.address,
          identification: formData.identification,
          application_type: formData.applicationType as 'newly-admitted' | 'returning-student',
          school: formData.school,
          course: formData.course,
          course_duration: formData.courseDuration,
          institution_country: formData.institutionCountry,
          institution_state: formData.institutionState,
          previous_school: formData.previousSchool,
          previous_course: formData.previousCourse,
          previous_gpa: formData.previousGPA,
          previous_year: formData.previousYear,
          reason_for_leaving: formData.reasonForLeaving,
        }
        
        const response = await submitStudentProfile(profileData)
        setProfileId(response.id)
        
        // Move to next step
        setCurrentStep(2)
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to submit profile. Please try again.')
        console.error('Profile submission error:', err)
      } finally {
        setIsLoading(false)
      }
    } else if (currentStep === 2) {
      // Step 2: Upload documents (if any files exist)
      setIsLoading(true)
      try {
        const documents: Array<{ file: File | null; docType: string }> = []
        
        if (formData.applicationType === 'newly-admitted') {
          if (formData.admissionLetter) documents.push({ file: formData.admissionLetter, docType: 'admission_letter' })
          if (formData.personalStatement) documents.push({ file: formData.personalStatement, docType: 'personal_statement' })
        } else {
          if (formData.academicTranscript) documents.push({ file: formData.academicTranscript, docType: 'academic_transcript' })
          if (formData.withdrawalLetter) documents.push({ file: formData.withdrawalLetter, docType: 'withdrawal_letter' })
          if (formData.reenrollmentLetter) documents.push({ file: formData.reenrollmentLetter, docType: 'reenrollment_letter' })
          if (formData.characterReference) documents.push({ file: formData.characterReference, docType: 'character_reference' })
        }
        
        // Upload all documents
        const uploadPromises = documents.map(async (doc) => {
          if (doc.file && profileId) {
            const response = await uploadStudentDocument(doc.file, doc.docType, profileId)
            return response.id
          }
          return null
        })
        
        const uploadedIds = await Promise.all(uploadPromises)
        setUploadedDocuments(uploadedIds.filter(Boolean) as string[])
        
        // Move to next step
        setCurrentStep(3)
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to upload documents. Please try again.')
        console.error('Document upload error:', err)
      } finally {
        setIsLoading(false)
      }
    } else {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const handleSave = async () => {
    setError(null)
    setIsLoading(true)
    try {
      // If we have a profile ID, update it; otherwise create it
      if (!profileId && currentStep === 1) {
        const profileData = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          date_of_birth: formData.dateOfBirth,
          country: formData.country,
          state: formData.state,
          address: formData.address,
          identification: formData.identification,
          application_type: formData.applicationType as 'newly-admitted' | 'returning-student',
          school: formData.school,
          course: formData.course,
          course_duration: formData.courseDuration,
          institution_country: formData.institutionCountry,
          institution_state: formData.institutionState,
          previous_school: formData.previousSchool,
          previous_course: formData.previousCourse,
          previous_gpa: formData.previousGPA,
          previous_year: formData.previousYear,
          reason_for_leaving: formData.reasonForLeaving,
        }
        
        const response = await submitStudentProfile(profileData)
        setProfileId(response.id)
      }
      
      console.log('Form data saved successfully')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save. Please try again.')
      console.error('Save error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async () => {
    if (!profileId) {
      setError('Please complete previous steps first.')
      return
    }
    
    setError(null)
    setIsLoading(true)
    
    try {
      // Submit all guarantors
      for (const guarantor of formData.guarantors) {
        const guarantorData = {
          first_name: guarantor.firstName,
          last_name: guarantor.lastName,
          email: guarantor.email,
          phone: guarantor.phone,
          country: guarantor.country,
          state: guarantor.state,
          student_profile: profileId,
        }
        
        await submitGuarantor(guarantorData)
        
        // Upload attestation letter if exists
        if (guarantor.attestationLetter) {
          await uploadStudentDocument(
            guarantor.attestationLetter, 
            'attestation_letter', 
            profileId
          )
        }
      }
      
      console.log('Application submitted successfully:', formData)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit application. Please try again.')
      console.error('Submission error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNavigationChange = (section: 'application' | 'status' | 'campaign' | 'wallet') => {
    if (section === 'campaign') {
      router.push('/student/dashboard/campaign')
    } else {
      setActiveSection(section)
    }
  }

  const handleStatusChange = (status: 'under-review' | 'approved') => {
    setApplicationStatus(status)
  }

  // Show loading while fetching profile
  if (isLoadingProfile) {
    return (
      <div className="flex min-h-screen bg-[#eceee4] items-center justify-center">
        <div className="text-[#272635]">Loading...</div>
      </div>
    )
  }

  const storedUser = getStoredUser();

  const nameFromUser = `${storedUser?.first_name ?? ""} ${storedUser?.last_name ?? ""}`.trim();
  const nameFromProfile = `${studentProfile?.first_name ?? ""} ${studentProfile?.last_name ?? ""}`.trim();

  const userData = {
    name: nameFromUser || nameFromProfile || "User",
    email: storedUser?.email || studentProfile?.email || "",
    avatar: storedUser?.photo || ""
  };

  return (
    <div className="flex min-h-screen bg-[#eceee4]">
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
