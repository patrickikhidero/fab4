import React from 'react'

interface ReenrollmentDocumentsSectionProps {
  formData: {
    academicTranscript: File | null
    withdrawalLetter: File | null
    reenrollmentLetter: File | null
    characterReference: File | null
  }
  onFormChange: (field: string, value: string | File | null) => void
}

export const ReenrollmentDocumentsSection: React.FC<ReenrollmentDocumentsSectionProps> = ({
  formData,
  onFormChange
}) => {
  const handleFileChange = (field: string, file: File | null) => {
    onFormChange(field, file)
  }

  return (
    <div className="content-stretch flex flex-col gap-5 items-start justify-start relative shrink-0 w-full">
      {/* Section Header */}
      <div className="bg-[#f9faf7] box-border content-stretch flex flex-col gap-5 items-start justify-start p-[20px] relative rounded-xl shrink-0 w-full">
        <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full">
          <div className="text-[#1f2937] font-semibold text-lg leading-6 relative shrink-0 w-full">
            Re-enrollment Documents
          </div>
          <div className="text-[#6b7280] font-normal text-sm leading-5 relative shrink-0 w-full">
            Upload required documents for re-enrollment
          </div>
        </div>
      </div>

      {/* Document Upload Fields */}
      <div className="content-stretch flex flex-col gap-5 items-start justify-start relative shrink-0 w-full">
        <div className="grid grid-cols-2 gap-5 w-full">
          {/* Academic Transcript */}
          <div className="flex flex-col gap-2">
            <label className="text-[#1f2937] font-medium text-sm leading-5">
              Academic Transcript <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange('academicTranscript', e.target.files?.[0] || null)}
                className="hidden"
                id="academicTranscript"
              />
              <label
                htmlFor="academicTranscript"
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50 text-sm text-gray-700"
              >
                Choose File
              </label>
              <span className="text-sm text-gray-500">
                {formData.academicTranscript ? formData.academicTranscript.name : 'No file chosen'}
              </span>
            </div>
          </div>

          {/* Withdrawal Letter */}
          <div className="flex flex-col gap-2">
            <label className="text-[#1f2937] font-medium text-sm leading-5">
              Withdrawal Letter <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange('withdrawalLetter', e.target.files?.[0] || null)}
                className="hidden"
                id="withdrawalLetter"
              />
              <label
                htmlFor="withdrawalLetter"
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50 text-sm text-gray-700"
              >
                Choose File
              </label>
              <span className="text-sm text-gray-500">
                {formData.withdrawalLetter ? formData.withdrawalLetter.name : 'No file chosen'}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5 w-full">
          {/* Re-enrollment Letter */}
          <div className="flex flex-col gap-2">
            <label className="text-[#1f2937] font-medium text-sm leading-5">
              Re-enrollment Letter <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange('reenrollmentLetter', e.target.files?.[0] || null)}
                className="hidden"
                id="reenrollmentLetter"
              />
              <label
                htmlFor="reenrollmentLetter"
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50 text-sm text-gray-700"
              >
                Choose File
              </label>
              <span className="text-sm text-gray-500">
                {formData.reenrollmentLetter ? formData.reenrollmentLetter.name : 'No file chosen'}
              </span>
            </div>
          </div>

          {/* Character Reference */}
          <div className="flex flex-col gap-2">
            <label className="text-[#1f2937] font-medium text-sm leading-5">
              Character Reference
            </label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange('characterReference', e.target.files?.[0] || null)}
                className="hidden"
                id="characterReference"
              />
              <label
                htmlFor="characterReference"
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-50 text-sm text-gray-700"
              >
                Choose File
              </label>
              <span className="text-sm text-gray-500">
                {formData.characterReference ? formData.characterReference.name : 'No file chosen'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
