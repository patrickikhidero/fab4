import React from 'react'
import { FormSelect } from './FormSelect'

interface IdentificationSectionProps {
  formData: {
    identification: string
  }
  onFormChange: (field: string, value: string | File | null) => void
}

export const IdentificationSection: React.FC<IdentificationSectionProps> = ({
  formData,
  onFormChange
}) => {
  const identificationTypes = [
    { value: 'national-id', label: 'National ID Card' },
    { value: 'passport', label: 'International Passport' },
    { value: 'drivers-license', label: 'Driver\'s License' },
    { value: 'voters-card', label: 'Voter\'s Card' },
    { value: 'birth-certificate', label: 'Birth Certificate' }
  ]

  return (
    <div className="content-stretch flex flex-col gap-5 items-start justify-start relative shrink-0 w-full mt-8" data-node-id="466:2455">
      {/* Section Header */}
      <div className="bg-[#f9faf7] box-border content-stretch flex flex-col gap-5 items-start justify-start p-[20px] relative rounded-xl shrink-0 w-full" data-node-id="466:2456">
        <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full" data-node-id="466:2457">
          <div className="text-[#1f2937] font-semibold text-lg leading-6 relative shrink-0 w-full" data-node-id="466:2458">
            Identify Yourself
          </div>
          <div className="text-[#6b7280] font-normal text-sm leading-5 relative shrink-0 w-full" data-node-id="466:2459">
            Select your primary identification document
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="content-stretch flex flex-col gap-5 items-start justify-start relative shrink-0 w-full" data-node-id="466:2460">
        <FormSelect
          label="Identification Type"
          value={formData.identification}
          onChange={(value) => onFormChange('identification', value)}
          options={identificationTypes}
          placeholder="Select identification type"
          required
        />
      </div>
    </div>
  )
}
