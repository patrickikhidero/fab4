// Student Application API Layer
import { api } from '@/lib/api/client'

// Types for API requests and responses
export interface StudentProfileData {
  // Personal Information (Step 1)
  first_name: string
  last_name: string
  email: string
  phone: string
  date_of_birth: string
  country: string
  state: string
  address: string
  identification: string
  
  // Application Info (Step 2)
  application_type: 'newly-admitted' | 'returning-student'
  school?: string
  course?: string
  course_duration?: string
  institution_country?: string
  institution_state?: string
  // Returning student fields
  previous_school?: string
  previous_course?: string
  previous_gpa?: string
  previous_year?: string
  reason_for_leaving?: string
}

export interface StudentProfileResponse {
  application_status: string | null | undefined
  id: string
  user: number
  first_name: string | null
  last_name: string | null
  email: string | null
  phone_number: string | null
  date_of_birth: string
  country: string
  state: string
  residential_address: string
  verification_means: string
  is_verified: boolean
  is_flagged: boolean
  flag_count: number
  student_entry: 'NEWLY_ADMITTED' | 'RETURNING_STUDENT'
  institution: string | null
  course: string | null
  course_duration: string | null
  level: string | null
  course_state: string | null
  course_country: string | null
}

export interface DocumentUploadData {
  file: File
  doc_type: string
  student_profile: string // Profile ID
}

export interface DocumentUploadResponse {
  id: string
  file_name: string
  file_url: string
  doc_type: string
}

export interface GuarantorData {
  first_name: string
  last_name: string
  email: string
  phone: string
  country: string
  state: string
  student_profile: string // Profile ID
}

export interface GuarantorResponse {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
}

/**
 * Step 1: Submit student profile
 * POST /students/student-profile/
 */
export async function submitStudentProfile(data: StudentProfileData): Promise<StudentProfileResponse> {
  const response = await api.post<StudentProfileResponse>('/students/student-profile/', data)
  return response.data
}

/**
 * Step 2: Upload student document
 * POST /students/student-profile-document/
 * Multipart upload with file, doc_type, student_profile
 */
export async function uploadStudentDocument(
  file: File,
  docType: string,
  studentProfileId: string
): Promise<DocumentUploadResponse> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('doc_type', docType)
  formData.append('student_profile', studentProfileId)

  const response = await api.post<DocumentUploadResponse>(
    '/students/student-profile-document/',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )
  return response.data
}

/**
 * Step 3: Submit guarantor
 * POST /students/student-guarantor/
 */
export async function submitGuarantor(data: GuarantorData): Promise<GuarantorResponse> {
  const response = await api.post<GuarantorResponse>('/students/student-guarantor/', data)
  return response.data
}

/**
 * Get current user's student profile
 * GET /students/student-profile/?user={user_id}
 */
export async function getStudentProfile(userId: number | null): Promise<StudentProfileResponse | null> {
  try {
    const response = await api.get<{ results: StudentProfileResponse[] }>(
      `/students/student-profile/`,
      { params: { user: userId } }
    )
    if (response.data.results && response.data.results.length > 0) {
      return response.data.results[0]
    }
    return null
  } catch (error) {
    console.error('Error fetching student profile:', error)
    return null
  }
}

