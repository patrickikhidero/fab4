import { FormInput } from './FormInput'
import { FormSelect } from './FormSelect'

interface InstitutionInfoSectionProps {
  formData: {
    school: string
    course: string
    courseDuration: string
    institutionCountry: string
    institutionState: string
  }
  onFormChange: (field: string, value: string | File | null) => void
}

export function InstitutionInfoSection({ formData, onFormChange }: InstitutionInfoSectionProps) {
  // Sample institutions - this would typically come from an API
  const institutions = [
    { value: 'university-of-lagos', label: 'University of Lagos' },
    { value: 'university-of-ibadan', label: 'University of Ibadan' },
    { value: 'obafemi-awolowo-university', label: 'Obafemi Awolowo University' },
    { value: 'ahmadu-bello-university', label: 'Ahmadu Bello University' },
    { value: 'university-of-nigeria', label: 'University of Nigeria, Nsukka' },
    { value: 'covenant-university', label: 'Covenant University' },
    { value: 'babcock-university', label: 'Babcock University' },
    { value: 'american-university-nigeria', label: 'American University of Nigeria' },
    { value: 'lagos-business-school', label: 'Lagos Business School' },
    { value: 'pan-atlantic-university', label: 'Pan-Atlantic University' }
  ]

  // Sample course durations
  const courseDurations = [
    { value: '2-years', label: '2 Years' },
    { value: '3-years', label: '3 Years' },
    { value: '4-years', label: '4 Years' },
    { value: '5-years', label: '5 Years' },
    { value: '6-years', label: '6 Years' },
    { value: '7-years', label: '7 Years' }
  ]

  // Sample countries (4 examples as requested)
  const countries = [
    { value: 'nigeria', label: 'Nigeria' },
    { value: 'ghana', label: 'Ghana' },
    { value: 'kenya', label: 'Kenya' },
    { value: 'south-africa', label: 'South Africa' }
  ]

  // Sample states (4 examples as requested)
  const states = [
    { value: 'lagos', label: 'Lagos' },
    { value: 'accra', label: 'Accra' },
    { value: 'nairobi', label: 'Nairobi' },
    { value: 'johannesburg', label: 'Johannesburg' }
  ]

  return (
    <div className="bg-[#f9faf7] box-border content-stretch flex flex-col gap-5 items-start justify-start p-[20px] relative rounded-[12px] shrink-0 w-full" data-node-id="477:6345">
      {/* Section Header */}
      <div className="content-stretch flex flex-col font-['Neue_Montreal:Regular',_sans-serif] gap-2 items-start justify-start leading-[0] not-italic relative shrink-0 w-full" data-node-id="477:6346">
        <div className="relative shrink-0 text-[#272635] text-[20px] w-full" data-node-id="477:6347">
          <p className="leading-[28px]">High Institution</p>
        </div>
        <div className="relative shrink-0 text-[14px] text-[rgba(39,38,53,0.5)] w-full" data-node-id="477:6348">
          <p className="leading-[20px]">Provide complete information about your admission</p>
        </div>
      </div>
      
      {/* School Selection */}
      <div className="content-stretch flex gap-5 items-start justify-start relative shrink-0 w-full" data-node-id="473:4192">
        <FormSelect
          label="Which school are you attending?"
          placeholder="Select High Institution"
          value={formData.school}
          onChange={(value) => onFormChange('school', value)}
          options={institutions}
          required
        />
      </div>
      
      {/* Course and Duration Row */}
      <div className="content-stretch flex gap-5 items-start justify-start relative shrink-0 w-full" data-node-id="654:6453">
        <FormInput
          label="What course were you offered?"
          placeholder="Ex. Bio Chemical Engineering"
          value={formData.course}
          onChange={(value) => onFormChange('course', value)}
          required
        />
        <FormSelect
          label="What's your current course level?"
          placeholder="Select level"
          value={formData.courseDuration}
          onChange={(value) => onFormChange('courseDuration', value)}
          options={courseDurations}
          required
        />
      </div>
      
      {/* Country and State Row */}
      <div className="content-stretch flex gap-5 items-start justify-start relative shrink-0 w-full" data-node-id="477:6386">
        <FormSelect
          label="Country"
          placeholder="Select Country"
          value={formData.institutionCountry}
          onChange={(value) => onFormChange('institutionCountry', value)}
          options={countries}
          required
        />
        <FormSelect
          label="State"
          placeholder="Select State"
          value={formData.institutionState}
          onChange={(value) => onFormChange('institutionState', value)}
          options={states}
          required
        />
      </div>
    </div>
  )
}
