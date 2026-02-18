import React from 'react'
import { ApplicationTypeSection } from './ApplicationTypeSection'
import { InstitutionInfoSection } from './InstitutionInfoSection'
import { DocumentsSection } from './DocumentsSection'
import { AcademicHistorySection } from './AcademicHistorySection'
import { ReenrollmentDocumentsSection } from './ReenrollmentDocumentsSection'

interface ProvideEvidenceFormProps {
  formData: {
    applicationType: string
    // Newly admitted fields
    school: string
    course: string
    courseDuration: string
    institutionCountry: string
    institutionState: string
    admissionLetter: File | null
    personalStatement: File | null
    // Returning student fields
    previousSchool: string
    previousCourse: string
    previousGPA: string
    previousYear: string
    reasonForLeaving: string
    academicTranscript: File | null
    withdrawalLetter: File | null
    reenrollmentLetter: File | null
    characterReference: File | null
  }
  onFormChange: (field: string, value: string | File | null) => void
}

export const ProvideEvidenceForm: React.FC<ProvideEvidenceFormProps> = ({
  formData,
  onFormChange
}) => {
  return (
    <div className="box-border content-stretch flex flex-col gap-10 items-start justify-start px-[200px] py-0 relative shrink-0 w-full" data-node-id="477:6331">
      <div className="content-stretch flex flex-col gap-5 items-start justify-start relative shrink-0 w-full" data-node-id="477:6332">
        {/* Application Type Selection */}
        <ApplicationTypeSection
          applicationType={formData.applicationType}
          onFormChange={onFormChange}
        />

        {/* Conditional Form Rendering */}
        {formData.applicationType === 'newly-admitted' && (
          <>
            <InstitutionInfoSection formData={formData} onFormChange={onFormChange} />
            <DocumentsSection formData={formData} onFormChange={onFormChange} />
          </>
        )}

        {formData.applicationType === 'returning-student' && (
          <>
            <AcademicHistorySection formData={formData} onFormChange={onFormChange} />
            <ReenrollmentDocumentsSection formData={formData} onFormChange={onFormChange} />
          </>
        )}
      </div>
    </div>
  )
}
