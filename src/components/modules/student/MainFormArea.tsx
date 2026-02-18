import React from 'react'
import { PersonalInfoSection } from './PersonalInfoSection'
import { LocationSection } from './LocationSection'
import { IdentificationSection } from './IdentificationSection'
import { ProvideEvidenceForm } from './ProvideEvidenceForm'
import { GuarantorsSection } from './GuarantorsSection'
import { SuccessNotification } from './SuccessNotification'

interface FormData {
  // Step 1: Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  country: string
  state: string
  address: string
  identification: string
  
  // Step 2: Provide Evidence
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
  
  // Step 3: Provide Guarantors
  guarantors: Array<{
    id: string
    firstName: string
    lastName: string
    email: string
    phone: string
    country: string
    state: string
    attestationLetter: File | null
  }>
}

interface MainFormAreaProps {
  currentStep: number
  formData: FormData
  onFormChange: (field: string, value: string | File | null) => void
  onGuarantorsChange: (guarantors: Array<{
    id: string
    firstName: string
    lastName: string
    email: string
    phone: string
    country: string
    state: string
    attestationLetter: File | null
  }>) => void
  onContinue: () => void
  onSave: () => void
  onSubmit?: () => void
}

export function MainFormArea({ 
  currentStep, 
  formData, 
  onFormChange, 
  onGuarantorsChange,
  onContinue, 
  onSave,
  onSubmit
}: MainFormAreaProps) {
  // State for application type selection
  const [applicationType, setApplicationType] = React.useState<'newly-admitted' | 'returning-student'>('newly-admitted')
  
  // State for submission
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [showSuccessNotification, setShowSuccessNotification] = React.useState(false)
  // Image assets from local SVG files
  // UI Elements
  const imgVector = "/svg/ui/globe.svg"           // Globe icon for language selector
  const imgGroup = "/svg/ui/group.svg"            // Group icon
  const imgVector1 = "/svg/ui/vector1.svg"        // Vector element 1
  const imgVector2 = "/svg/ui/vector2.svg"        // Vector element 2
  const img = "/svg/ui/language.svg"              // Language icon base
  const img1 = "/svg/ui/language1.svg"            // Language icon variant 1
  const img2 = "/svg/ui/language2.svg"            // Language icon variant 2
  const img3 = "/svg/ui/language3.svg"            // Language icon variant 3
  const img4 = "/svg/ui/language4.svg"            // Language icon variant 4
  const img5 = "/svg/ui/language5.svg"            // Language icon variant 5
  const img6 = "/svg/ui/language6.svg"            // Language icon variant 6
  
  // Icons
  const img7 = "/svg/icons/dropdown-arrow.svg"    // Dropdown arrow for select fields
  const img8 = "/svg/icons/double-caret.svg"      // Double caret for step indicators
  const img9 = "/svg/icons/caret-active.svg"      // Active state caret (green)
  const img10 = "/svg/icons/caret-inactive.svg"   // Inactive state caret (gray)
  const img11 = "/svg/icons/checkmark.svg"        // Checkmark for form selections
  const img12 = "/svg/icons/plus.svg"             // Plus icon for add buttons
  const img13 = "/svg/icons/plus-detail1.svg"     // Plus icon detail layer 1
  const img14 = "/svg/icons/plus-detail2.svg"     // Plus icon detail layer 2
  
  // Decorative Elements
  const imgLine1 = "/svg/decoration/divider-line1.svg"  // Primary divider line
  const imgLine2 = "/svg/decoration/divider-line2.svg"  // Secondary divider line

  // Validation function for guarantors
  const areGuarantorsValid = () => {
    return formData.guarantors.every(guarantor => 
      guarantor.firstName.trim() !== '' &&
      guarantor.lastName.trim() !== '' &&
      guarantor.email.trim() !== '' &&
      guarantor.phone.trim() !== '' &&
      guarantor.country.trim() !== '' &&
      guarantor.state.trim() !== ''
    )
  }

  // Handle submit function
  const handleSubmit = async () => {
    if (!areGuarantorsValid()) {
      alert('Please fill in all required guarantor fields before submitting.')
      return
    }

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Show success notification
      setShowSuccessNotification(true)
      
      // Hide notification after 5 seconds
      setTimeout(() => {
        setShowSuccessNotification(false)
      }, 5000)
      
      // Call parent onSubmit if provided
      if (onSubmit) {
        onSubmit()
      }
    } catch (error) {
      console.error('Submission failed:', error)
      alert('Submission failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex p-[40px] flex-col items-start gap-[10px] flex-1 basis-0" data-node-id="448:1536">
      <div className="bg-[#ffffff] box-border content-stretch flex flex-col gap-20 items-center justify-start overflow-clip px-0 py-5 relative rounded-[20px] shadow-[0px_16px_32px_-8px_rgba(39,38,53,0.1)] shrink-0 w-full" data-name="Main" data-node-id="448:1537">
        
        {/* Top Language Selector */}
        <div className="box-border content-stretch flex flex-col gap-2.5 items-end justify-start px-5 py-0 relative shrink-0 w-full" data-node-id="448:1757">
          <div className="box-border content-stretch flex gap-2 items-center justify-center px-2 py-0 relative rounded-[999px] shrink-0" data-node-id="448:1758">
            <div className="overflow-clip relative shrink-0 size-4" data-name="Frame" data-node-id="448:1759">
              <div className="absolute inset-0" data-name="Vector" data-node-id="448:1760">
                <img alt="Globe Icon" className="block max-w-none size-full" src={imgVector2} />
              </div>
              <div className="absolute h-[11.5px] left-0.5 top-0.5 w-[13px]" data-name="Language" data-node-id="448:1761">
                <div className="absolute bottom-0 left-[46.15%] right-0 top-[39.13%]" data-name="Vector" id="node-I448_1761-435_2751">
                  <div className="absolute inset-[-7.14%]" style={{ "--stroke-0": "rgba(39, 38, 53, 1)" } as React.CSSProperties}>
                    <img alt="Language Icon" className="block max-w-none size-full" src={img} />
                  </div>
                </div>
                <div className="absolute inset-[82.61%_7.69%_17.39%_53.85%]" data-name="Vector" id="node-I448_1761-435_2752">
                  <div className="absolute inset-[-0.5px_-10%]" style={{ "--stroke-0": "rgba(39, 38, 53, 1)" } as React.CSSProperties}>
                    <img alt="Language Icon 2" className="block max-w-none size-full" src={img1} />
                  </div>
                </div>
                <div className="absolute bottom-[86.96%] left-[30.77%] right-[69.23%] top-0" data-name="Vector" id="node-I448_1761-435_2753">
                  <div className="absolute inset-[-33.33%_-0.5px]" style={{ "--stroke-0": "rgba(39, 38, 53, 1)" } as React.CSSProperties}>
                    <img alt="Language Icon 3" className="block max-w-none size-full" src={img2} />
                  </div>
                </div>
                <div className="absolute bottom-[86.96%] left-0 right-[38.46%] top-[13.04%]" data-name="Vector" id="node-I448_1761-435_2754">
                  <div className="absolute inset-[-0.5px_-6.25%]" style={{ "--stroke-0": "rgba(39, 38, 53, 1)" } as React.CSSProperties}>
                    <img alt="Language Icon 4" className="block max-w-none size-full" src={img3} />
                  </div>
                </div>
                <div className="absolute bottom-[34.78%] left-0 right-[53.85%] top-[13.04%]" data-name="Vector" id="node-I448_1761-435_2755">
                  <div className="absolute inset-[-8.333%]" style={{ "--stroke-0": "rgba(39, 38, 53, 1)" } as React.CSSProperties}>
                    <img alt="Language Icon 5" className="block max-w-none size-full" src={img4} />
                  </div>
                </div>
                <div className="absolute inset-[30.43%_38.46%_34.78%_18.02%]" data-name="Vector" id="node-I448_1761-435_2756">
                  <div className="absolute inset-[-12.5%_-8.84%]" style={{ "--stroke-0": "rgba(39, 38, 53, 1)" } as React.CSSProperties}>
                    <img alt="Language Icon 6" className="block max-w-none size-full" src={img5} />
                  </div>
                </div>
              </div>
            </div>
            <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[14px] text-nowrap" data-node-id="448:1762">
              <p className="leading-[20px] whitespace-pre">English</p>
            </div>
            <div className="overflow-clip relative shrink-0 size-4" data-name="Filled Caret Down" data-node-id="448:1763">
              <div className="absolute inset-0" data-name="Vector" id="node-I448_1763-284_1327">
                <img alt="Dropdown Arrow" className="block max-w-none size-full" src={img6} />
              </div>
              <div className="absolute inset-[34.38%_15.63%_28.12%_15.62%]" data-name="Vector" id="node-I448_1763-284_1328">
                <img alt="Dropdown Arrow Detail" className="block max-w-none size-full" src={img7} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="box-border content-stretch flex flex-col gap-5 items-center justify-start px-[200px] py-0 relative shrink-0 w-full" data-node-id="448:1756">
          
          {/* Page Title */}
          <div className="content-stretch flex flex-col gap-2 items-start justify-start leading-[0] not-italic relative shrink-0 text-[#272635] w-full" data-node-id="448:1678">
            <div className="font-['Neue_Montreal:Medium',_sans-serif] relative shrink-0 text-[32px] text-nowrap" data-node-id="448:1679">
              <p className="leading-[normal] whitespace-pre">Apply to become a FabFour</p>
            </div>
            <div className="font-['Neue_Montreal:Regular',_sans-serif] min-w-full relative shrink-0 text-[18px]" data-node-id="448:1680" style={{ width: "min-content" }}>
              <p className="leading-[28px]">Africa's trusted social fundraising platform to support smart minds through tertiary education.</p>
            </div>
          </div>
          
          {/* Divider Line */}
          <div className="h-0 relative shrink-0 w-full" data-node-id="466:2356">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <img alt="Divider Line" className="block max-w-none size-full" src={imgLine1} />
            </div>
          </div>
          
          {/* Progress Steps */}
          <div className="content-stretch flex flex-col gap-2.5 items-center justify-start relative shrink-0 w-full" data-node-id="448:1681">
            <div className="content-stretch flex items-start justify-start relative shrink-0 w-full" data-name="Progress steps / Progress text with line" data-node-id="448:1682">
              {/* Step 1 */}
              <div className={`basis-0 box-border content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px p-[20px] relative rounded-tl-[12px] rounded-tr-[12px] self-stretch shrink-0 ${
                currentStep === 1 ? 'bg-[#f9faf7]' : ''
              }`} data-name="_Step base" data-node-id="448:1683">
                {currentStep === 1 && (
                  <div aria-hidden="true" className="absolute border-[#198754] border-[0px_0px_1px] border-solid inset-0 pointer-events-none rounded-tl-[12px] rounded-tr-[12px]" />
                )}
                {currentStep !== 1 && (
                  <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(39,38,53,0.1)] border-solid inset-0 pointer-events-none rounded-tl-[12px] rounded-tr-[12px]" />
                )}
                <div className="content-stretch flex gap-2 items-center justify-center relative shrink-0 w-full" data-name="Content" data-node-id="448:1684">
                  <div className="overflow-clip relative shrink-0 size-5" data-name="Double right caret" data-node-id="448:1685">
                    <div className="absolute inset-0" data-name="Vector" id="node-I448_1685-385_662">
                      <img alt="Step Icon" className="block max-w-none size-full" src={img8} />
                    </div>
                    <div className="absolute inset-[18.75%_46.88%_18.75%_21.88%]" data-name="Vector" id="node-I448_1685-385_663">
                      <div className="absolute inset-[-4%_-8%]" style={{ "--stroke-0": currentStep === 1 ? "rgba(25, 135, 84, 1)" : "rgba(39, 38, 53, 1)" } as React.CSSProperties}>
                        <img alt="Step Icon Detail" className="block max-w-none size-full" src={currentStep === 1 ? img9 : img10} />
                      </div>
                    </div>
                    <div className="absolute inset-[18.75%_15.63%_18.75%_53.13%]" data-name="Vector" id="node-I448_1685-385_664">
                      <div className="absolute inset-[-4%_-8%]" style={{ "--stroke-0": currentStep === 1 ? "rgba(25, 135, 84, 1)" : "rgba(39, 38, 53, 1)" } as React.CSSProperties}>
                        <img alt="Step Icon Detail 2" className="block max-w-none size-full" src={currentStep === 1 ? img9 : img10} />
                      </div>
                    </div>
                  </div>
                  <div className={`leading-[0] not-italic relative shrink-0 text-[16px] text-center text-nowrap ${
                    currentStep === 1 ? 'text-[#272635]' : 'text-[rgba(39,38,53,0.5)]'
                  }`} data-node-id="448:1686">
                    <p className="leading-[24px] whitespace-pre">Tell us about yourself</p>
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className={`basis-0 box-border content-stretch flex flex-col grow items-center justify-start min-h-px min-w-px p-[20px] relative rounded-tl-[12px] rounded-tr-[12px] shrink-0 ${
                currentStep === 2 ? 'bg-[#f9faf7]' : ''
              }`} data-name="_Step base" data-node-id="448:1688">
                {currentStep === 2 && (
                  <div aria-hidden="true" className="absolute border-[#198754] border-[0px_0px_1px] border-solid inset-0 pointer-events-none rounded-tl-[12px] rounded-tr-[12px]" />
                )}
                {currentStep !== 2 && (
                  <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(39,38,53,0.1)] border-solid inset-0 pointer-events-none rounded-tl-[12px] rounded-tr-[12px]" />
                )}
                <div className="content-stretch flex gap-2 items-center justify-center relative shrink-0 w-full" data-name="Content" data-node-id="448:1689">
                  <div className="overflow-clip relative shrink-0 size-5" data-name="Double right caret" data-node-id="448:1690">
                    <div className="absolute inset-0" data-name="Vector" id="node-I448_1690-385_662">
                      <img alt="Step Icon" className="block max-w-none size-full" src={img8} />
                    </div>
                    <div className="absolute inset-[18.75%_46.88%_18.75%_21.88%]" data-name="Vector" id="node-I448_1685-385_663">
                      <div className="absolute inset-[-4%_-8%]" style={{ "--stroke-0": currentStep === 2 ? "rgba(25, 135, 84, 1)" : "rgba(39, 38, 53, 1)" } as React.CSSProperties}>
                        <img alt="Step Icon Detail" className="block max-w-none size-full" src={currentStep === 2 ? img9 : img10} />
                      </div>
                    </div>
                    <div className="absolute inset-[18.75%_15.63%_18.75%_53.13%]" data-name="Vector" id="node-I448_1690-385_664">
                      <div className="absolute inset-[-4%_-8%]" style={{ "--stroke-0": currentStep === 2 ? "rgba(25, 135, 84, 1)" : "rgba(39, 38, 53, 1)" } as React.CSSProperties}>
                        <img alt="Step Icon Detail 2" className="block max-w-none size-full" src={currentStep === 2 ? img9 : img10} />
                      </div>
                    </div>
                  </div>
                  <div className={`leading-[0] not-italic relative shrink-0 text-[16px] text-center text-nowrap ${
                    currentStep === 2 ? 'text-[#272635]' : 'text-[rgba(39,38,53,0.5)]'
                  }`} data-node-id="448:1691">
                    <p className="leading-[24px] whitespace-pre">Provide evidence</p>
                  </div>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className={`basis-0 box-border content-stretch flex flex-col grow items-center justify-start min-h-px min-w-px p-[20px] relative rounded-tl-[12px] rounded-tr-[12px] self-stretch shrink-0 ${
                currentStep === 3 ? 'bg-[#f9faf7]' : ''
              }`} data-name="_Step base" data-node-id="448:1693">
                <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(39,38,53,0.1)] border-solid inset-0 pointer-events-none rounded-tl-[12px] rounded-tr-[12px]" />
                <div className="content-stretch flex gap-2 items-center justify-center relative shrink-0 w-full" data-name="Content" data-node-id="448:1694">
                  <div className="overflow-clip relative shrink-0 size-5" data-name="Double right caret" data-node-id="448:1695">
                    <div className="absolute inset-0" data-name="Vector" id="node-I448_1695-385_662">
                      <img alt="Step Icon" className="block max-w-none size-full" src={img8} />
                    </div>
                    <div className="absolute inset-[18.75%_46.88%_18.75%_21.88%]" data-name="Vector" id="node-I448_1695-385_663">
                      <div className="absolute inset-[-4%_-8%]" style={{ "--stroke-0": currentStep === 3 ? "rgba(25, 135, 84, 1)" : "rgba(39, 38, 53, 1)" } as React.CSSProperties}>
                        <img alt="Step Icon Detail" className="block max-w-none size-full" src={currentStep === 3 ? img9 : img10} />
                      </div>
                    </div>
                    <div className="absolute inset-[18.75%_15.63%_18.75%_53.13%]" data-name="Vector" id="node-I448_1695-385_664">
                      <div className="absolute inset-[-4%_-8%]" style={{ "--stroke-0": currentStep === 3 ? "rgba(25, 135, 84, 1)" : "rgba(39, 38, 53, 1)" } as React.CSSProperties}>
                        <img alt="Step Icon Detail 2" className="block max-w-none size-full" src={currentStep === 3 ? img9 : img10} />
                      </div>
                    </div>
                  </div>
                  <div className={`leading-[0] not-italic relative shrink-0 text-[16px] text-center text-nowrap ${
                    currentStep === 3 ? 'text-[#272635]' : 'text-[rgba(39,38,53,0.5)]'
                  }`} data-node-id="448:1696">
                    <p className="leading-[24px] whitespace-pre">Provide Guarantors</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Form Content - Step-based Form Sections */}
          <div className="content-stretch flex flex-col gap-12 items-start justify-start relative shrink-0 w-full" data-node-id="448:1779">
            {currentStep === 1 && (
              <>
                <PersonalInfoSection 
                  formData={formData}
                  onFormChange={onFormChange}
                />
                <LocationSection 
                  formData={formData}
                  onFormChange={onFormChange}
                />
                <IdentificationSection 
                  formData={formData}
                  onFormChange={onFormChange}
                />
              </>
            )}
            
            {currentStep === 2 && (
              <div className="content-stretch flex flex-col gap-10 items-start justify-start relative shrink-0 w-full" data-node-id="477:6331">
                {/* Application Type Selection */}
                <div className="bg-[#f9faf7] box-border content-stretch flex flex-col gap-2 items-start justify-start p-[20px] relative rounded-[12px] shrink-0 w-full" data-node-id="477:6333">
                  <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[16px] w-full" data-node-id="477:6334">
                    <p className="leading-[1.4]">How are you applying to the FabFour Foundation?</p>
                  </div>
                  <div className="content-stretch flex gap-2 items-start justify-start relative shrink-0 w-full" data-node-id="477:6335">
                    <div 
                      className={`bg-[#ffffff] box-border content-stretch flex gap-1 items-start justify-start p-[12px] relative rounded-[12px] shrink-0 w-[201.333px] cursor-pointer ${applicationType === 'newly-admitted' ? 'border-[#272635]' : 'border-[rgba(39,38,53,0.1)]'}`} 
                      data-name="Checkbox group item" 
                      data-node-id="477:6341"
                      onClick={() => setApplicationType('newly-admitted')}
                    >
                      <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)] ${applicationType === 'newly-admitted' ? 'border-[#272635]' : 'border-[rgba(39,38,53,0.1)]'}`} />
                      <div className="basis-0 content-stretch flex gap-3 grow items-center justify-start min-h-px min-w-px relative shrink-0" data-name="Content" data-node-id="477:6342">
                        <div className={`basis-0 font-['Neue_Montreal:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[16px] ${applicationType === 'newly-admitted' ? 'text-[#272635]' : 'text-[rgba(39,38,53,0.5)]'}`} data-node-id="477:6343">
                          <p className="leading-[1.4]">Newly Admitted</p>
                        </div>
                      </div>
                      <div className={`relative rounded-[4px] shrink-0 size-4 ${applicationType === 'newly-admitted' ? 'bg-[#2c2c2c]' : ''}`} data-name="_Checkbox base" data-node-id="477:6344">
                        {applicationType === 'newly-admitted' && (
                          <div className="bg-[#2c2c2c] content-stretch flex gap-2.5 items-center justify-center overflow-clip relative rounded-[4px] shrink-0 size-4" data-name="Check" data-node-id="477:6340">
                            <div className="overflow-clip relative shrink-0 size-4" data-name="Check Icon" id="node-I477_6340-68_15642">
                              <div className="absolute bottom-[29.17%] left-[16.67%] right-[16.67%] top-1/4" style={{ "--stroke-0": "rgba(245, 245, 245, 1)" } as React.CSSProperties}>
                                <img alt="Check Icon" className="block max-w-none size-full" src={img11} />
                              </div>
                            </div>
                          </div>
                        )}
                        {applicationType !== 'newly-admitted' && (
                          <div aria-hidden="true" className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-0 pointer-events-none rounded-[4px]" />
                        )}
                      </div>
                    </div>
                    <div 
                      className={`bg-[#ffffff] box-border content-stretch flex gap-1 items-start justify-start p-[12px] relative rounded-[12px] shrink-0 w-[201.333px] cursor-pointer ${applicationType === 'returning-student' ? 'border-[#272635]' : 'border-[rgba(39,38,53,0.1)]'}`} 
                      data-name="Checkbox group item" 
                      data-node-id="477:6336"
                      onClick={() => setApplicationType('returning-student')}
                    >
                      <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)] ${applicationType === 'returning-student' ? 'border-[#272635]' : 'border-[rgba(39,38,53,0.1)]'}`} />
                      <div className="basis-0 content-stretch flex gap-3 grow items-center justify-start min-h-px min-w-px relative shrink-0" data-name="Content" data-node-id="477:6337">
                        <div className={`basis-0 font-['Neue_Montreal:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[16px] ${applicationType === 'returning-student' ? 'text-[#272635]' : 'text-[rgba(39,38,53,0.5)]'}`} data-node-id="477:6343">
                          <p className="leading-[1.4]">Returning Student</p>
                        </div>
                      </div>
                      <div className={`relative rounded-[4px] shrink-0 size-4 ${applicationType === 'returning-student' ? 'bg-[#2c2c2c]' : ''}`} data-name="_Checkbox base" data-node-id="477:6344">
                        {applicationType === 'returning-student' && (
                          <div className="bg-[#2c2c2c] content-stretch flex gap-2.5 items-center justify-center overflow-clip relative rounded-[4px] shrink-0 size-4" data-name="Check" data-node-id="477:6340">
                            <div className="overflow-clip relative shrink-0 size-4" data-name="Check Icon" id="node-I477_6340-68_15642">
                              <div className="absolute bottom-[29.17%] left-[16.67%] right-[16.67%] top-1/4" style={{ "--stroke-0": "rgba(245, 245, 245, 1)" } as React.CSSProperties}>
                                <img alt="Check Icon" className="block max-w-none size-full" src={img11} />
                              </div>
                            </div>
                          </div>
                        )}
                        {applicationType !== 'returning-student' && (
                          <div aria-hidden="true" className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-0 pointer-events-none rounded-[4px]" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Conditional Form Display based on Application Type */}
                {applicationType === 'newly-admitted' && (
                  <>
                    {/* Newly Admitted Form */}
                    <div className="bg-[#f9faf7] box-border content-stretch flex flex-col gap-5 items-start justify-start p-[20px] relative rounded-[12px] shrink-0 w-full" data-node-id="477:6345">
                      <div className="content-stretch flex flex-col font-['Neue_Montreal:Regular',_sans-serif] gap-2 items-start justify-start leading-[0] not-italic relative shrink-0 w-full" data-node-id="477:6346">
                        <div className="relative shrink-0 text-[#272635] text-[20px] w-full" data-node-id="477:6347">
                          <p className="leading-[28px]">High Institution</p>
                        </div>
                        <div className="relative shrink-0 text-[14px] text-[rgba(39,38,53,0.5)] w-full" data-node-id="477:6348">
                          <p className="leading-[20px]">Provide complete information about your admission</p>
                        </div>
                      </div>
                      <div className="content-stretch flex gap-5 items-start justify-start relative shrink-0 w-full" data-node-id="477:6349">
                        <div className="basis-0 content-stretch flex flex-col gap-2 grow items-start justify-start min-h-px min-w-px relative shrink-0" data-name="Input Field" data-node-id="477:6350">
                          <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[16px] text-[#272635]" data-node-id="477:6351" style={{ width: "min-content" }}>
                            <p className="leading-[1.4]">Which school are you attending?</p>
                          </div>
                          <div className="bg-[#ffffff] box-border content-stretch flex gap-2 h-12 items-center justify-start min-w-60 pl-4 pr-3 py-3 relative rounded-[8px] shrink-0 w-full" data-name="Select" data-node-id="477:6353">
                            <div aria-hidden="true" className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]" />
                            <div className="basis-0 font-['Neue_Montreal:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#93939a] text-[14px]" data-node-id="477:6354">
                              <p className="leading-none">Select High Institution</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex gap-5 items-start justify-start relative shrink-0 w-full" data-node-id="658:7027">
                        <div className="basis-0 content-stretch flex flex-col gap-2 grow items-start justify-start min-h-px min-w-px relative shrink-0" data-name="Input Field" data-node-id="658:7046">
                          <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[16px] text-[#272635]" data-node-id="658:7047" style={{ width: "min-content" }}>
                            <p className="leading-[1.4]">What course were you offered?</p>
                          </div>
                          <div className="bg-[#ffffff] box-border content-stretch flex gap-2 h-12 items-center justify-start min-w-60 pl-4 pr-3 py-3 relative rounded-[8px] shrink-0 w-full" data-name="Select" data-node-id="658:7049">
                            <div aria-hidden="true" className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]" />
                            <div className="basis-0 font-['Neue_Montreal:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#93939a] text-[14px]" data-node-id="658:7050">
                              <p className="leading-none">Ex. Bio Chemical Engineering</p>
                            </div>
                          </div>
                        </div>
                        <div className="content-stretch flex flex-col gap-2 h-[78px] items-start justify-start relative shrink-0 w-[300px]" data-name="Select Field" data-node-id="658:7064">
                          <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[16px] text-[#272635]" data-node-id="658:7065" style={{ width: "min-content" }}>
                            <p className="leading-[1.4]">What's your current course level?</p>
                          </div>
                          <div className="bg-[#ffffff] box-border content-stretch flex gap-2 h-12 items-center justify-start min-w-60 pl-4 pr-3 py-3 relative rounded-[8px] shrink-0 w-full" data-name="Select" data-node-id="658:7067">
                            <div aria-hidden="true" className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]" />
                            <div className="basis-0 font-['Neue_Montreal:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#93939a] text-[14px]" data-node-id="658:7068">
                              <p className="leading-none">Select level</p>
                            </div>
                            <div className="overflow-clip relative shrink-0 size-4" data-name="Filled Caret Down" data-node-id="658:7069">
                              <div className="absolute inset-0" data-name="Vector" id="node-I658_7069-284_1327">
                                <img alt="Dropdown Arrow" className="block max-w-none size-full" src={img6} />
                              </div>
                              <div className="absolute inset-[34.38%_15.63%_28.12%_15.62%]" data-name="Vector" id="node-I658_7069-284_1328">
                                <img alt="Dropdown Arrow Detail" className="block max-w-none size-full" src={img7} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex gap-5 items-start justify-start relative shrink-0 w-full" data-node-id="477:6386">
                        <div className="basis-0 content-stretch flex flex-col gap-2 grow items-start justify-start min-h-px min-w-px relative shrink-0" data-name="Select Field" data-node-id="477:6387">
                          <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[16px] text-[#272635]" data-node-id="477:6388" style={{ width: "min-content" }}>
                            <p className="leading-[1.4]">Country</p>
                          </div>
                          <div className="bg-[#ffffff] box-border content-stretch flex gap-2 h-12 items-center justify-start min-w-60 pl-4 pr-3 py-3 relative rounded-[8px] shrink-0 w-full" data-name="Select" data-node-id="477:6390">
                            <div aria-hidden="true" className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]" />
                            <div className="basis-0 font-['Neue_Montreal:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#93939a] text-[14px]" data-node-id="477:6391">
                              <p className="leading-none">Select Country</p>
                            </div>
                            <div className="overflow-clip relative shrink-0 size-4" data-name="Filled Caret Down" data-node-id="477:6392">
                              <div className="absolute inset-0" data-name="Vector" id="node-I477_6392-284_1327">
                                <img alt="Dropdown Arrow" className="block max-w-none size-full" src={img6} />
                              </div>
                              <div className="absolute inset-[34.38%_15.63%_28.12%_15.62%]" data-name="Vector" id="node-I477_6392-284_1328">
                                <img alt="Dropdown Arrow Detail" className="block max-w-none size-full" src={img7} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="basis-0 content-stretch flex flex-col gap-2 grow items-start justify-start min-h-px min-w-px relative shrink-0" data-name="Select Field" data-node-id="477:6405">
                          <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[16px] text-[#272635]" data-node-id="477:6406" style={{ width: "min-content" }}>
                            <p className="leading-[1.4]">State</p>
                          </div>
                          <div className="bg-[#ffffff] box-border content-stretch flex gap-2 h-12 items-center justify-start min-w-60 pl-4 pr-3 py-3 relative rounded-[8px] shrink-0 w-full" data-name="Select" data-node-id="477:6408">
                            <div aria-hidden="true" className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]" />
                            <div className="basis-0 font-['Neue_Montreal:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#93939a] text-[14px]" data-node-id="477:6409">
                              <p className="leading-none">Select State</p>
                            </div>
                            <div className="overflow-clip relative shrink-0 size-4" data-name="Filled Caret Down" data-node-id="477:6410">
                              <div className="absolute inset-0" data-name="Vector" id="node-I477_6410-284_1327">
                                <img alt="Dropdown Arrow" className="block max-w-none size-full" src={img6} />
                              </div>
                              <div className="absolute inset-[34.38%_15.63%_28.12%_15.62%]" data-name="Vector" id="node-I477_6410-284_1328">
                                <img alt="Dropdown Arrow Detail" className="block max-w-none size-full" src={img7} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Supporting Documents Section */}
                    <div className="bg-[#f9faf7] box-border content-stretch flex flex-col gap-5 items-start justify-start p-[20px] relative rounded-[12px] shrink-0 w-full" data-node-id="477:6423">
                      <div className="content-stretch flex flex-col font-['Neue_Montreal:Regular',_sans-serif] gap-2 items-start justify-start leading-[0] not-italic relative shrink-0 w-full" data-node-id="477:6424">
                        <div className="relative shrink-0 text-[#272635] text-[20px] w-full" data-node-id="477:6425">
                          <p className="leading-[28px]">Attach Supporting Documents</p>
                        </div>
                        <div className="relative shrink-0 text-[14px] text-[rgba(39,38,53,0.5)] w-full" data-node-id="477:6426">
                          <p className="leading-[20px]">Provide complete information about your admission</p>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full" data-node-id="477:6490">
                        <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[16px] text-[#272635] text-nowrap" data-node-id="477:6491">
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
                              <img alt="Plus Icon" className="block max-w-none size-full" src={img12} />
                            </div>
                            <div className="absolute bottom-1/2 left-[15.63%] right-[15.63%] top-1/2" data-name="Vector" id="node-I477_6493-34_12136-285_379">
                              <div className="absolute inset-[-0.5px_-4.55%]">
                                <img alt="Plus Icon Detail" className="block max-w-none size-full" src={img13} />
                              </div>
                            </div>
                            <div className="absolute bottom-[15.63%] left-1/2 right-1/2 top-[15.63%]" data-name="Vector" id="node-I477_6493-34_12136-285_380">
                              <div className="absolute inset-[-4.55%_-0.5px]">
                                <img alt="Plus Icon Detail 2" className="block max-w-none size-full" src={img14} />
                              </div>
                            </div>
                          </div>
                          <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[14px] text-nowrap" id="node-I477_6493-34_12137">
                            <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-none underline whitespace-pre">Attach Personal Statement</p>
                          </div>
                        </div>
                      </div>
                      <div className="h-0 relative shrink-0 w-full" data-node-id="477:6431">
                        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                          <img alt="Divider Line" className="block max-w-none size-full" src={imgLine2} />
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full" data-node-id="477:6427">
                        <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[16px] text-[#272635]" data-node-id="477:6428" style={{ width: "min-content" }}>
                          <p className="leading-[24px]">Provide a personal statement describing why you're fit for the FabFour Academic Scholarship</p>
                        </div>
                        <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[14px] text-[rgba(39,38,53,0.5)]" data-node-id="477:6429" style={{ width: "min-content" }}>
                          <p className="leading-[20px]">
                            <span>{`We recommend a minimum of 1000 word document showcasing why we should consider. See example `}</span>
                            <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid text-[#198754] underline">here</span>
                          </p>
                        </div>
                        <div className="content-stretch flex gap-2 items-center justify-center overflow-clip relative rounded-[8px] shrink-0" data-name="Button" data-node-id="477:6435">
                          <div className="overflow-clip relative shrink-0 size-[25px]" data-name="Add" id="node-I477_6435-34_12136">
                            <div className="absolute inset-0" data-name="Vector" id="node-I477_6435-34_12136-285_378">
                              <img alt="Plus Icon" className="block max-w-none size-full" src={img12} />
                            </div>
                            <div className="absolute bottom-1/2 left-[15.63%] right-[15.63%] top-1/2" data-name="Vector" id="node-I477_6435-34_12136-285_379">
                              <div className="absolute inset-[-0.5px_-4.55%]">
                                <img alt="Plus Icon Detail" className="block max-w-none size-full" src={img13} />
                              </div>
                            </div>
                            <div className="absolute bottom-[15.63%] left-1/2 right-1/2 top-[15.63%]" data-name="Vector" id="node-I477_6435-34_12136-285_380">
                              <div className="absolute inset-[-4.55%_-0.5px]">
                                <img alt="Plus Icon Detail 2" className="block max-w-none size-full" src={img14} />
                              </div>
                            </div>
                          </div>
                          <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[14px] text-nowrap" id="node-I477_6435-34_12137">
                            <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-none underline whitespace-pre">Attach Personal Statement</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {applicationType === 'returning-student' && (
                  <>
                    {/* Returning Student Form */}
                    <div className="bg-[#f9faf7] box-border content-stretch flex flex-col gap-5 items-start justify-start p-[20px] relative rounded-[12px] shrink-0 w-full">
                      <div className="content-stretch flex flex-col font-['Neue_Montreal:Regular',_sans-serif] gap-2 items-start justify-start leading-[0] not-italic relative shrink-0 w-full">
                        <div className="relative shrink-0 text-[#272635] text-[20px] w-full">
                          <p className="leading-[28px]">Returning Student Information</p>
                        </div>
                        <div className="relative shrink-0 text-[14px] text-[rgba(39,38,53,0.5)] w-full">
                          <p className="leading-[20px]">Provide information about your current academic status</p>
                        </div>
                      </div>
                      
                      {/* Current Institution */}
                      <div className="content-stretch flex gap-5 items-start justify-start relative shrink-0 w-full">
                        <div className="basis-0 content-stretch flex flex-col gap-2 grow items-start justify-start min-h-px min-w-px relative shrink-0">
                          <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[16px] text-[#272635]">
                            <p className="leading-[1.4]">Current Institution</p>
                          </div>
                          <div className="bg-[#ffffff] box-border content-stretch flex gap-2 h-12 items-center justify-start min-w-60 pl-4 pr-3 py-3 relative rounded-[8px] shrink-0 w-full">
                            <div aria-hidden="true" className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]" />
                            <div className="basis-0 font-['Neue_Montreal:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#93939a] text-[14px]">
                              <p className="leading-none">Select Current Institution</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Current Course and Level */}
                      <div className="content-stretch flex gap-5 items-start justify-start relative shrink-0 w-full">
                        <div className="basis-0 content-stretch flex flex-col gap-2 grow items-start justify-start min-h-px min-w-px relative shrink-0">
                          <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[16px] text-[#272635]">
                            <p className="leading-[1.4]">Current Course</p>
                          </div>
                          <div className="bg-[#ffffff] box-border content-stretch flex gap-2 h-12 items-center justify-start min-w-60 pl-4 pr-3 py-3 relative rounded-[8px] shrink-0 w-full">
                            <div aria-hidden="true" className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]" />
                            <div className="basis-0 font-['Neue_Montreal:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#93939a] text-[14px]">
                              <p className="leading-none">Ex. Bio Chemical Engineering</p>
                            </div>
                          </div>
                        </div>
                        <div className="content-stretch flex flex-col gap-2 h-[78px] items-start justify-start relative shrink-0 w-[300px]">
                          <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[16px] text-[#272635]">
                            <p className="leading-[1.4]">Current Level</p>
                          </div>
                          <div className="bg-[#ffffff] box-border content-stretch flex gap-2 h-12 items-center justify-start min-w-60 pl-4 pr-3 py-3 relative rounded-[8px] shrink-0 w-full">
                            <div aria-hidden="true" className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]" />
                            <div className="basis-0 font-['Neue_Montreal:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#93939a] text-[14px]">
                              <p className="leading-none">Select level</p>
                            </div>
                            <div className="overflow-clip relative shrink-0 size-4">
                              <div className="absolute inset-0">
                                <img alt="Dropdown Arrow" className="block max-w-none size-full" src={img6} />
                              </div>
                              <div className="absolute inset-[34.38%_15.63%_28.12%_15.62%]">
                                <img alt="Dropdown Arrow Detail" className="block max-w-none size-full" src={img7} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Previous Academic Results */}
                      <div className="bg-[#f9faf7] box-border content-stretch flex flex-col gap-5 items-start justify-start p-[20px] relative rounded-[12px] shrink-0 w-full">
                        <div className="content-stretch flex flex-col font-['Neue_Montreal:Regular',_sans-serif] gap-2 items-start justify-start leading-[0] not-italic relative shrink-0 w-full">
                          <div className="relative shrink-0 text-[#272635] text-[20px] w-full">
                            <p className="leading-[28px]">Previous Academic Results</p>
                          </div>
                          <div className="relative shrink-0 text-[14px] text-[rgba(39,38,53,0.5)] w-full">
                            <p className="leading-[20px]">Upload your previous academic year results</p>
                          </div>
                        </div>
                        
                        <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full">
                          <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[16px] text-[#272635] text-nowrap">
                            <p className="leading-[1.4] whitespace-pre">Upload previous academic year result</p>
                          </div>
                          <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[14px] text-[rgba(39,38,53,0.5)]">
                            <p className="leading-[20px]">
                              <span>{`We recommend a minimum of 1000 word document showcasing why we should consider. See example `}</span>
                              <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid text-[#198754] underline">here</span>
                            </p>
                          </div>
                          <div className="content-stretch flex gap-2 items-center justify-center overflow-clip relative rounded-[8px] shrink-0">
                            <div className="overflow-clip relative shrink-0 size-[25px]">
                              <div className="absolute inset-0">
                                <img alt="Plus Icon" className="block max-w-none size-full" src={img12} />
                              </div>
                              <div className="absolute bottom-1/2 left-[15.63%] right-[15.63%] top-1/2">
                                <div className="absolute inset-[-0.5px_-4.55%]">
                                  <img alt="Plus Icon Detail" className="block max-w-none size-full" src={img13} />
                                </div>
                              </div>
                              <div className="absolute bottom-[15.63%] left-1/2 right-1/2 top-[15.63%]">
                                <div className="absolute inset-[-4.55%_-0.5px]">
                                  <img alt="Plus Icon Detail 2" className="block max-w-none size-full" src={img14} />
                                </div>
                              </div>
                            </div>
                            <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[14px] text-nowrap">
                              <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-none underline whitespace-pre">Attach Previous Result</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="h-0 relative shrink-0 w-full">
                          <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                            <img alt="Divider Line" className="block max-w-none size-full" src={imgLine2} />
                          </div>
                        </div>
                        
                        <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full">
                          <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[16px] text-[#272635]">
                            <p className="leading-[24px]">Provide a personal statement describing why you're fit for the FabFour Academic Scholarship</p>
                          </div>
                          <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[14px] text-[rgba(39,38,53,0.5)]">
                            <p className="leading-[20px]">
                              <span>{`We recommend a minimum of 1000 word document showcasing why we should consider. See example `}</span>
                              <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid text-[#198754] underline">here</span>
                            </p>
                          </div>
                          <div className="content-stretch flex gap-2 items-center justify-center overflow-clip relative rounded-[8px] shrink-0">
                            <div className="overflow-clip relative shrink-0 size-[25px]">
                              <div className="absolute inset-0">
                                <img alt="Plus Icon" className="block max-w-none size-full" src={img12} />
                              </div>
                              <div className="absolute bottom-1/2 left-[15.63%] right-[15.63%] top-1/2">
                                <div className="absolute inset-[-0.5px_-4.55%]">
                                  <img alt="Plus Icon Detail" className="block max-w-none size-full" src={img13} />
                                </div>
                              </div>
                              <div className="absolute bottom-[15.63%] left-1/2 right-1/2 top-[15.63%]">
                                <div className="absolute inset-[-4.55%_-0.5px]">
                                  <img alt="Plus Icon Detail 2" className="block max-w-none size-full" src={img14} />
                                </div>
                              </div>
                            </div>
                            <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[14px] text-nowrap">
                              <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-none underline whitespace-pre">Attach Personal Statement</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
            
            {currentStep === 3 && (
              <GuarantorsSection 
                guarantors={formData.guarantors}
                onGuarantorsChange={onGuarantorsChange}
              />
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="content-stretch flex gap-4 items-center justify-end relative shrink-0 w-full" data-name="Actions" data-node-id="466:1687">
            <div className="content-stretch flex gap-2 items-center justify-center overflow-clip relative rounded-lg shrink-0" data-name="Button" data-node-id="466:1688">
              <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[16px] text-nowrap" id="node-I466_1688-34_12137">
                <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-none underline whitespace-pre cursor-pointer" onClick={onSave}>
                  Save To Continue Later
                </p>
              </div>
            </div>
            
            {currentStep === 3 ? (
              /* Submit Request Button for Guarantors Step */
              <div className={`h-14 relative rounded-lg shrink-0 ${areGuarantorsValid() && !isSubmitting ? 'bg-[#273125]' : 'bg-[#6b7280] cursor-not-allowed'}`} data-name="Button" data-node-id="473:4398">
                <div className="box-border content-stretch flex gap-2 h-14 items-center justify-center overflow-clip px-5 py-3 relative">
                  <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-nowrap" id="node-I473:4398-9762_429">
                    <p className="leading-none whitespace-pre cursor-pointer" onClick={areGuarantorsValid() && !isSubmitting ? handleSubmit : undefined}>
                      {isSubmitting ? 'Submitting...' : 'Submit Request'}
                    </p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-lg" />
              </div>
            ) : (
              /* Continue Button for other steps */
              <div className="bg-[#273125] h-14 relative rounded-lg shrink-0" data-name="Button" data-node-id="466:1689">
                <div className="box-border content-stretch flex gap-2 h-14 items-center justify-center overflow-clip px-5 py-3 relative">
                  <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-nowrap" id="node-I466_1689-9762_429">
                    <p className="leading-none whitespace-pre cursor-pointer" onClick={onContinue}>
                      Continue
                    </p>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-lg" />
              </div>
            )}
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="box-border content-stretch flex flex-col gap-2.5 h-px items-end justify-end px-5 py-0 relative shrink-0 w-full" data-node-id="448:1764">
          <div className="content-stretch flex font-['Neue_Montreal:Regular',_sans-serif] gap-5 items-center justify-start leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(39,38,53,0.5)] text-nowrap" data-node-id="448:1765">
            <div className="relative shrink-0" data-node-id="448:1766">
              <p className="leading-[normal] text-nowrap whitespace-pre">Terms</p>
            </div>
            <div className="relative shrink-0" data-node-id="448:1767">
              <p className="leading-[normal] text-nowrap whitespace-pre">Legal</p>
            </div>
            <div className="relative shrink-0" data-node-id="448:1768">
              <p className="leading-[normal] text-nowrap whitespace-pre">Privacy policy</p>
            </div>
            <div className="relative shrink-0" data-node-id="448:1769">
              <p className="leading-[normal] text-nowrap whitespace-pre">Cookie policy</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Success Notification */}
      <SuccessNotification
        isVisible={showSuccessNotification}
        message="Your application has been submitted successfully"
      />
    </div>
  )
}
