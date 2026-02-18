import { FormInput } from './FormInput'
import { FormSelect } from './FormSelect'
import { PhoneInput } from './PhoneInput'

interface Guarantor {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  state: string
  attestationLetter: File | null
}

interface GuarantorFormProps {
  guarantor: Guarantor
  onGuarantorChange: (id: string, field: string, value: string | File | null) => void
  onDelete: (id: string) => void
  isCollapsible?: boolean
}

export function GuarantorForm({ guarantor, onGuarantorChange, onDelete, isCollapsible = false }: GuarantorFormProps) {
  // Sample countries and states (4 examples as requested)
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



  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    onGuarantorChange(guarantor.id, 'attestationLetter', file)
  }

  return (
    <div className="bg-[#f9faf7] box-border content-stretch flex flex-col gap-5 items-start justify-start p-[20px] relative rounded-xl shrink-0 w-full">
      {/* Guarantor Header with Delete Button */}
      <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="472:4009">
        <div className="leading-[0] not-italic relative shrink-0 text-[#272635] text-[16px] text-nowrap" data-node-id="472:4003">
          <p className="leading-[24px] whitespace-pre">Guarantor</p>
        </div>
        <div className="content-stretch flex gap-4 items-center justify-start relative shrink-0" data-node-id="472:4035">
          <button
            onClick={() => onDelete(guarantor.id)}
            className="content-stretch flex gap-2 items-center justify-center overflow-clip relative rounded-lg shrink-0 cursor-pointer"
            data-name="Button" 
            data-node-id="472:4014"
          >
            <div className="leading-[0] not-italic relative shrink-0 text-[#f04c4d] text-[14px] text-nowrap">
              <p className="leading-none whitespace-pre">Delete</p>
            </div>
          </button>
          
          {/* Collapsible Arrow Icon */}
          {isCollapsible && (
            <div className="flex items-center justify-center relative shrink-0">
              <div className="flex-none rotate-[180deg]">
                <div className="overflow-clip relative size-4" data-name="Filled Caret Down" data-node-id="472:4005">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6L8 10L12 6" stroke="#93939a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Name Fields */}
      <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full" data-node-id="472:3900">
        <div className="content-stretch flex gap-5 items-start justify-start relative shrink-0 w-full" data-node-id="472:3901">
          <FormInput
            label="First Name"
            placeholder="First Name"
            value={guarantor.firstName}
            onChange={(value) => onGuarantorChange(guarantor.id, 'firstName', value)}
            required
          />
          <FormInput
            label="Last Name"
            placeholder="Last Name"
            value={guarantor.lastName}
            onChange={(value) => onGuarantorChange(guarantor.id, 'lastName', value)}
            required
          />
        </div>
        <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(39,38,53,0.5)] w-full" data-node-id="472:3938">
          <p className="leading-[20px]">Use the name on your government issued ID card</p>
        </div>
      </div>

      {/* Contact Fields */}
      <div className="content-stretch flex gap-5 items-start justify-start relative shrink-0 w-full" data-node-id="472:3939">
        <FormInput
          label="Email Address"
          placeholder="Email Address"
          value={guarantor.email}
          onChange={(value) => onGuarantorChange(guarantor.id, 'email', value)}
          type="email"
          required
        />
        <PhoneInput
          label="Phone Number"
          value={guarantor.phone}
          onChange={(value) => onGuarantorChange(guarantor.id, 'phone', value)}
          required
        />
      </div>

      {/* Location Fields */}
      <div className="content-stretch flex gap-5 items-start justify-start relative shrink-0 w-full" data-node-id="472:3738">
        <div className="basis-0 content-stretch flex flex-col gap-2 grow items-start justify-start min-h-px min-w-px relative shrink-0">
          <div className="leading-[0] min-w-full not-italic relative shrink-0 text-[#272635] text-[16px]" style={{ width: "min-content" }}>
            <p className="leading-[1.4]">Country *</p>
          </div>
          <div className="bg-[#ffffff] box-border content-stretch flex gap-2 h-12 items-center justify-start min-w-60 pl-4 pr-3 py-3 relative rounded-lg shrink-0 w-full">
            <div aria-hidden="true" className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]" />
            <select
              value={guarantor.country}
              onChange={(e) => onGuarantorChange(guarantor.id, 'country', e.target.value)}
              className="basis-0 grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#93939a] text-[14px] bg-transparent border-none outline-none w-full appearance-none"
            >
              <option value="" disabled>Select Country</option>
              {countries.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="overflow-clip relative shrink-0 size-4" data-name="Filled Caret Down">
              <div className="absolute inset-0" data-name="Vector">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6L8 10L12 6" stroke="#93939a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div className="basis-0 content-stretch flex flex-col gap-2 grow items-start justify-start min-h-px min-w-px relative shrink-0">
          <div className="leading-[0] min-w-full not-italic relative shrink-0 text-[#272635] text-[16px]" style={{ width: "min-content" }}>
            <p className="leading-[1.4]">State *</p>
          </div>
          <div className="bg-[#ffffff] box-border content-stretch flex gap-2 h-12 items-center justify-start min-w-60 pl-4 pr-3 py-3 relative rounded-[8px] shrink-0 w-full">
            <div aria-hidden="true" className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]" />
            <select
              value={guarantor.state}
              onChange={(e) => onGuarantorChange(guarantor.id, 'state', e.target.value)}
              className="basis-0 grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#93939a] text-[14px] bg-transparent border-none outline-none w-full appearance-none"
            >
              <option value="" disabled>Select State</option>
              {states.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="overflow-clip relative shrink-0 size-4" data-name="Filled Caret Down">
              <div className="absolute inset-0" data-name="Vector">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6L8 10L12 6" stroke="#93939a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Attestation Letter Upload */}
      <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0" data-node-id="474:4472">
        <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[16px] text-nowrap" data-node-id="474:4467">
          <p className="leading-[24px] whitespace-pre">Attestation Letter</p>
        </div>
        <div className="content-stretch flex gap-2 items-center justify-center overflow-clip relative rounded-lg shrink-0" data-name="Button" data-node-id="473:4154">
          <input
            type="file"
            id={`attestation-${guarantor.id}`}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            className="hidden"
          />
          <label htmlFor={`attestation-${guarantor.id}`} className="flex gap-2 items-center cursor-pointer">
            <div className="overflow-clip relative shrink-0 size-[25px]" data-name="Add">
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12.5" cy="12.5" r="12.5" fill="#272635"/>
                <path d="M12.5 8V17M8 12.5H17" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[14px] text-nowrap">
              <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-none underline whitespace-pre">
                {guarantor.attestationLetter ? guarantor.attestationLetter.name : 'Attach attestation letter'}
              </p>
            </div>
          </label>
        </div>
      </div>
    </div>
  )
}
