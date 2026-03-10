import { FormInput } from './FormInput'
import { PhoneInput } from './PhoneInput'
import { DatePicker } from './DatePicker'

interface PersonalInfoSectionProps {
  formData: {
    firstName: string
    lastName: string
    email: string
    phone: string
    course: string
    courseDuration: string
    dateOfBirth: string
  }
  onFormChange: (field: string, value: string | File | null) => void
}

export function PersonalInfoSection({ formData, onFormChange }: PersonalInfoSectionProps) {
  return (
    <div className="bg-[#f9faf7] box-border content-stretch flex flex-col gap-5 items-start justify-start p-[20px] relative rounded-xl shrink-0 w-full mb-8" data-node-id="466:2634">
      {/* Section Header */}
      <div className="content-stretch flex flex-col gap-2 items-start justify-start leading-[0] not-italic relative shrink-0 w-full" data-node-id="474:4502">
        <div className="relative shrink-0 text-[#272635] text-[20px] w-full" data-node-id="474:4503">
          <p className="leading-[28px]">Personal Information</p>
        </div>
        <div className="relative shrink-0 text-[14px] text-[rgba(39,38,53,0.5)] w-full" data-node-id="474:4504">
          <p className="leading-[20px]">Please identify yourself using legible information about yourself across social media and government systems.</p>
        </div>
      </div>
      
      {/* First Name and Last Name Row */}
      <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full" data-node-id="466:2635">
        <div className="content-stretch flex gap-5 items-start justify-start relative shrink-0 w-full" data-node-id="466:2636">
          <FormInput
            label="First Name"
            placeholder="Koulibaly"
            value={formData.firstName}
            onChange={(value) => onFormChange('firstName', value)}
            required
          />
          <FormInput
            label="Last Name"
            placeholder="Koffi"
            value={formData.lastName}
            onChange={(value) => onFormChange('lastName', value)}
            required
          />
        </div>
        <div className="content-stretch flex gap-5 items-start justify-start relative shrink-0 w-full" data-node-id="466:2636">
          <FormInput
            label="Course of Study"
            placeholder="Computer Science"
            value={formData.course}
            onChange={(value) => onFormChange('course', value)}
            required
          />
          <FormInput
            label="Course Duration"
            placeholder="2019 - 2023"
            value={formData.courseDuration}
            onChange={(value) => onFormChange('courseDuration', value)}
            required
          />
        </div>
        <div className="leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(39,38,53,0.5)] w-full" data-node-id="466:2673">
          <p className="leading-[20px]">Use the name on your government issued ID card</p>
        </div>
      </div>
      
      {/* Email and Phone Row */}
      <div className="content-stretch flex gap-5 items-start justify-start relative shrink-0 w-full" data-node-id="466:2674">
        <FormInput
          label="Email Address"
          placeholder="example@email.com"
          value={formData.email}
          onChange={(value) => onFormChange('email', value)}
          type="email"
          required
        />
        <PhoneInput
          label="Phone Number"
          value={formData.phone}
          onChange={(value) => onFormChange('phone', value)}
          required
        />
      </div>
      
      {/* Date of Birth */}
      <DatePicker
        label="Date of Birth"
        value={formData.dateOfBirth}
        onChange={(value) => onFormChange('dateOfBirth', value)}
        required
      />
    </div>
  )
}
