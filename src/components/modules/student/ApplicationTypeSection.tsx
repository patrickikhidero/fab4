import React from 'react'

interface ApplicationTypeSectionProps {
  applicationType: string
  onFormChange: (field: string, value: string | File | null) => void
}

export const ApplicationTypeSection: React.FC<ApplicationTypeSectionProps> = ({
  applicationType,
  onFormChange
}) => {
  const handleTypeChange = (type: string) => {
    onFormChange('applicationType', type)
  }

  return (
    <div className="bg-[#f9faf7] box-border content-stretch flex flex-col gap-2 items-start justify-start p-[20px] relative rounded-[12px] shrink-0 w-full" data-node-id="477:6333">
      <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[16px] w-full" data-node-id="477:6334">
        <p className="leading-[1.4]">How are you applying to the FabFour Foundation?</p>
      </div>
      <div className="content-stretch flex gap-2 items-start justify-start relative shrink-0 w-full" data-node-id="477:6335">
        {/* Newly Admitted Option */}
        <div 
          className={`bg-[#ffffff] box-border content-stretch flex gap-1 items-start justify-start p-[12px] relative rounded-[12px] shrink-0 w-[201.333px] cursor-pointer ${
            applicationType === 'newly-admitted' 
              ? 'border border-[#272635] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]' 
              : 'border border-[rgba(39,38,53,0.1)] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]'
          }`}
          onClick={() => handleTypeChange('newly-admitted')}
          data-name="Checkbox group item" 
          data-node-id="477:6341"
        >
          <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[12px] ${
            applicationType === 'newly-admitted' 
              ? 'border-[#272635]' 
              : 'border-[rgba(39,38,53,0.1)]'
          } shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]`} />
          <div className="basis-0 content-stretch flex gap-3 grow items-center justify-start min-h-px min-w-px relative shrink-0" data-name="Content" data-node-id="477:6342">
            <div className={`basis-0 font-['Neue_Montreal:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[16px] ${
              applicationType === 'newly-admitted' ? 'text-[#272635]' : 'text-[rgba(39,38,53,0.5)]'
            }`} data-node-id="477:6343">
              <p className="leading-[1.4]">Newly Admitted</p>
            </div>
          </div>
          <div className={`relative rounded-[4px] shrink-0 size-4 ${
            applicationType === 'newly-admitted' 
              ? 'bg-[#2c2c2c]' 
              : 'bg-transparent border border-[rgba(39,38,53,0.1)]'
          }`} data-name="_Checkbox base" data-node-id="477:6344">
            {applicationType === 'newly-admitted' && (
              <div className="overflow-clip relative shrink-0 size-4" data-name="Check" data-node-id="477:6340">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 4.5L6 12L2.5 8.5" stroke="#f5f5f5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Returning Student Option */}
        <div 
          className={`bg-[#ffffff] box-border content-stretch flex gap-1 items-start justify-start p-[12px] relative rounded-[12px] shrink-0 w-[201.333px] cursor-pointer ${
            applicationType === 'returning-student' 
              ? 'border border-[#272635] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]' 
              : 'border border-[rgba(39,38,53,0.1)] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]'
          }`}
          onClick={() => handleTypeChange('returning-student')}
          data-name="Checkbox group item" 
          data-node-id="477:6336"
        >
          <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[12px] ${
            applicationType === 'returning-student' 
              ? 'border-[#272635]' 
              : 'border-[rgba(39,38,53,0.1)]'
          } shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]`} />
          <div className="basis-0 content-stretch flex gap-3 grow items-center justify-start min-h-px min-w-px relative shrink-0" data-name="Content" data-node-id="477:6337">
            <div className={`basis-0 font-['Neue_Montreal:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[16px] ${
              applicationType === 'returning-student' ? 'text-[#272635]' : 'text-[rgba(39,38,53,0.5)]'
            }`} data-node-id="477:6338">
              <p className="leading-[1.4]">Returning Student</p>
            </div>
          </div>
          <div className={`content-stretch flex gap-2.5 items-center justify-center overflow-clip relative rounded-[4px] shrink-0 size-4 ${
            applicationType === 'returning-student' 
              ? 'bg-[#2c2c2c]' 
              : 'bg-transparent border border-[rgba(39,38,53,0.1)]'
          }`} data-name="Checkbox" data-node-id="477:6339">
            {applicationType === 'returning-student' && (
              <div className="overflow-clip relative shrink-0 size-4" data-name="Check" data-node-id="477:6340">
                <div className="absolute bottom-[29.17%] left-[16.67%] right-[16.67%] top-1/4" data-name="Icon" id="node-I477_6340-68_15642">
                  <div className="absolute inset-[-10.91%_-7.5%]" style={{ "--stroke-0": "rgba(245, 245, 245, 1)" } as React.CSSProperties}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.5 4.5L6 12L2.5 8.5" stroke="#f5f5f5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
