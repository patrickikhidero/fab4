import React from 'react'
import { FormSelect } from './FormSelect'
import { FormInput } from './FormInput'

interface LocationSectionProps {
  formData: {
    country: string
    state: string
    address: string
  }
  onFormChange: (field: string, value: string | File | null) => void
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  formData,
  onFormChange
}) => {
  const countries = [
    { value: 'nigeria', label: 'Nigeria' },
    { value: 'ghana', label: 'Ghana' },
    { value: 'kenya', label: 'Kenya' },
    { value: 'south-africa', label: 'South Africa' }
  ]

  const states = [
    { value: 'lagos', label: 'Lagos' },
    { value: 'accra', label: 'Accra' },
    { value: 'nairobi', label: 'Nairobi' },
    { value: 'johannesburg', label: 'Johannesburg' }
  ]

  return (
    <div className="content-stretch flex flex-col gap-5 items-start justify-start relative shrink-0 w-full mb-8" data-node-id="466:2449">
      {/* Section Header */}
      <div className="bg-[#f9faf7] box-border content-stretch flex flex-col gap-5 items-start justify-start p-[20px] relative rounded-xl shrink-0 w-full" data-node-id="466:2450">
        <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full" data-node-id="466:2451">
          <div className="text-[#1f2937] font-semibold text-lg leading-6 relative shrink-0 w-full" data-node-id="466:2452">
            Where to find you
          </div>
          <div className="text-[#6b7280] font-normal text-sm leading-5 relative shrink-0 w-full" data-node-id="466:2453">
            Provide your location information
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="content-stretch flex flex-col gap-5 items-start justify-start relative shrink-0 w-full" data-node-id="466:2454">
        <div className="grid grid-cols-2 gap-5 w-full">
          <FormSelect
            label="Country"
            value={formData.country}
            onChange={(value) => onFormChange('country', value)}
            options={countries}
            placeholder="Select Country"
            required
          />
          <FormSelect
            label="State/Province"
            value={formData.state}
            onChange={(value) => onFormChange('state', value)}
            options={states}
            placeholder="Select State"
            required
          />
        </div>

        <FormInput
          label="Address"
          placeholder="Enter your full address"
          value={formData.address}
          onChange={(value) => onFormChange('address', value)}
          required
        />
      </div>
    </div>
  )
}
