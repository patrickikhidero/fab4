import React, { useMemo } from 'react'
import { FormInput } from './FormInput'
import { FormSelect } from './FormSelect'

interface AcademicHistorySectionProps {
  formData: {
    previousSchool: string
    previousCourse: string
    previousGPA: string
    previousYear: string
    reasonForLeaving: string
  }
  onFormChange: (field: string, value: string | File | null) => void
}

export const AcademicHistorySection: React.FC<AcademicHistorySectionProps> = ({
  formData,
  onFormChange
}) => {
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear()
    return Array.from({ length: 10 }, (_, i) => ({
      value: (currentYear - i).toString(),
      label: (currentYear - i).toString()
    }))
  }, [])
  
  const reasons = [
    { value: 'academic-reasons', label: 'Academic reasons' },
    { value: 'financial-constraints', label: 'Financial constraints' },
    { value: 'personal-circumstances', label: 'Personal circumstances' },
    { value: 'transfer-institution', label: 'Transfer to another institution' },
    { value: 'health-reasons', label: 'Health reasons' },
    { value: 'other', label: 'Other' }
  ]

  return (
    <div className="content-stretch flex flex-col gap-5 items-start justify-start relative shrink-0 w-full">
      {/* Section Header */}
      <div className="bg-[#f9faf7] box-border content-stretch flex flex-col gap-5 items-start justify-start p-[20px] relative rounded-xl shrink-0 w-full">
        <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full">
          <div className="text-[#1f2937] font-semibold text-lg leading-6 relative shrink-0 w-full">
            Previous Academic History
          </div>
          <div className="text-[#6b7280] font-normal text-sm leading-5 relative shrink-0 w-full">
            Tell us about your previous academic experience
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="content-stretch flex flex-col gap-5 items-start justify-start relative shrink-0 w-full">
        <div className="grid grid-cols-2 gap-5 w-full">
          <FormInput
            label="Previous Institution"
            placeholder="Enter institution name"
            value={formData.previousSchool}
            onChange={(value) => onFormChange('previousSchool', value)}
            required
          />
          <FormInput
            label="Previous Course/Program"
            placeholder="Enter course name"
            value={formData.previousCourse}
            onChange={(value) => onFormChange('previousCourse', value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-5 w-full">
          <FormInput
            label="Previous GPA"
            placeholder="e.g., 3.5"
            value={formData.previousGPA}
            onChange={(value) => onFormChange('previousGPA', value)}
            type="number"
            {/* min="0"
            max="4" */}
            required
          />
          <FormSelect
            label="Year of Study"
            value={formData.previousYear}
            onChange={(value) => onFormChange('previousYear', value)}
            options={years}
            placeholder="Select year"
            required
          />
        </div>

        <FormSelect
          label="Reason for Leaving Previous Institution"
          value={formData.reasonForLeaving}
          onChange={(value) => onFormChange('reasonForLeaving', value)}
          options={reasons}
          placeholder="Select reason"
          required
        />
      </div>
    </div>
  )
}
