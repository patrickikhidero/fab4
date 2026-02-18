import React from 'react'

interface DocumentsSectionProps {
  formData: {
    admissionLetter: File | null
    personalStatement: File | null
  }
  onFormChange: (field: string, value: string | File | null) => void
}

export function DocumentsSection({ formData, onFormChange }: DocumentsSectionProps) {
  const handleFileChange = (field: string, file: File | null) => {
    onFormChange(field, file)
  }

  return (
    <div className="bg-[#f9faf7] box-border content-stretch flex flex-col gap-5 items-start justify-start p-[20px] relative rounded-[12px] shrink-0 w-full" data-node-id="477:6423">
      {/* Section Header */}
      <div className="content-stretch flex flex-col font-['Neue_Montreal:Regular',_sans-serif] gap-2 items-start justify-start leading-[0] not-italic relative shrink-0 w-full" data-node-id="477:6424">
        <div className="relative shrink-0 text-[#272635] text-[20px] w-full" data-node-id="477:6425">
          <p className="leading-[28px]">Attach Supporting Documents</p>
        </div>
        <div className="relative shrink-0 text-[14px] text-[rgba(39,38,53,0.5)] w-full" data-node-id="477:6426">
          <p className="leading-[20px]">Provide complete information about your admission</p>
        </div>
      </div>

      {/* Document Upload Fields */}
      <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full" data-node-id="477:6490">
        <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[16px] text-nowrap" data-node-id="477:6491">
          <p className="leading-[1.4] whitespace-pre">Upload a original copy of your admission offer letter</p>
        </div>
        <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[14px] text-[rgba(39,38,53,0.5)]" data-node-id="477:6492" style={{ width: "min-content" }}>
          <p className="leading-[20px]">
            <span>{`We recommend a minimum of 1000 word document showcasing why we should consider. See example `}</span>
            <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid text-[#198754] underline">here</span>
          </p>
        </div>
        <div className="content-stretch flex gap-2 items-center justify-center overflow-clip relative rounded-[8px] shrink-0" data-name="Button" data-node-id="477:6493">
          <div className="overflow-clip relative shrink-0 size-[25px]" data-name="Add" id="node-I477_6493-34_12136">
            <div className="absolute inset-0" data-name="Vector" id="node-I477_6493-34_12136-285_378">
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 2.5V22.5M2.5 12.5H22.5" stroke="#198754" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[14px] text-nowrap" id="node-I477_6493-34_12137">
            <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-none underline whitespace-pre">Attach Personal Statement</p>
          </div>
        </div>
      </div>

      <div className="h-0 relative shrink-0 w-full" data-node-id="477:6431">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg width="100%" height="1" viewBox="0 0 100 1" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="rgba(39,38,53,0.1)" strokeWidth="1"/>
          </svg>
        </div>
      </div>

      <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full" data-node-id="477:6427">
        <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[16px] text-nowrap" data-node-id="477:6428">
          <p className="leading-[1.4] whitespace-pre">Upload a copy of your previous academic year result</p>
        </div>
        <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[14px] text-[rgba(39,38,53,0.5)]" data-node-id="477:6429" style={{ width: "min-content" }}>
          <p className="leading-[20px]">
            <span>{`We recommend a minimum of 1000 word document showcasing why we should consider. See example `}</span>
            <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid text-[#198754] underline">here</span>
          </p>
        </div>
        <div className="content-stretch flex gap-2 items-center justify-center overflow-clip relative rounded-[8px] shrink-0" data-name="Button" data-node-id="477:6430">
          <div className="overflow-clip relative shrink-0 size-[25px]" data-name="Add" id="node-I477_6430-34_12136">
            <div className="absolute inset-0" data-name="Vector" id="node-I477_6430-34_12136-285_378">
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 2.5V22.5M2.5 12.5H22.5" stroke="#198754" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[14px] text-nowrap" id="node-I477_6430-34_12137">
            <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-none underline whitespace-pre">Attach result</p>
          </div>
        </div>
      </div>

      <div className="h-0 relative shrink-0 w-full" data-node-id="477:6494">
        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
          <svg width="100%" height="1" viewBox="0 0 100 1" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="rgba(39,38,53,0.1)" strokeWidth="1"/>
          </svg>
        </div>
      </div>

      <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full" data-node-id="477:6432">
        <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#272635] text-[16px]" data-node-id="477:6433" style={{ width: "min-content" }}>
          <p className="leading-[24px]">Provide a personal statement describing why you're fit for the FabFour Academic Scholarship</p>
        </div>
        <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[14px] text-[rgba(39,38,53,0.5)]" data-node-id="477:6434" style={{ width: "min-content" }}>
          <p className="leading-[20px]">
            <span>{`We recommend a minimum of 1000 word document showcasing why we should consider. See example `}</span>
            <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid text-[#198754] underline">here</span>
          </p>
        </div>
        <div className="content-stretch flex gap-2 items-center justify-center overflow-clip relative rounded-[8px] shrink-0" data-name="Button" data-node-id="477:6435">
          <div className="overflow-clip relative shrink-0 size-[25px]" data-name="Add" id="node-I477_6435-34_12136">
            <div className="absolute inset-0" data-name="Vector" id="node-I477_6435-34_12136-285_378">
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 2.5V22.5M2.5 12.5H22.5" stroke="#198754" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[14px] text-nowrap" id="node-I477_6435-34_12137">
            <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-none underline whitespace-pre">Attach Personal Statement</p>
          </div>
        </div>
      </div>
    </div>
  )
}
