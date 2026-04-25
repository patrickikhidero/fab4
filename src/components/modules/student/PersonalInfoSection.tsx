import { FormInput } from "./FormInput";
import { PhoneInput } from "./PhoneInput";
import { DatePicker } from "./DatePicker";

interface PersonalInfoSectionProps {
  formData: {
    firstName: string
    lastName: string
    email: string
    phone: string
    dateOfBirth: string
  }
  onFormChange: (field: string, value: string | File | null) => void
}

export function PersonalInfoSection({
  formData,
  onFormChange,
}: PersonalInfoSectionProps) {
  return (
    <div className="bg-[#f9faf7] box-border content-stretch flex flex-col gap-5 items-start justify-start p-[20px] relative rounded-xl shrink-0 w-full mb-8" data-node-id="466:2634">
      {/* Section Header */}
      <div className="content-stretch flex flex-col gap-2 items-start justify-start leading-[0] not-italic relative shrink-0 w-full" data-node-id="474:4502">
        <div className="relative shrink-0 text-[#272635] text-[20px] w-full" data-node-id="474:4503">
          <p className="leading-[28px]">Personal Information</p>
        </div>

        <div className="w-full text-[13px] text-[rgba(39,38,53,0.5)] sm:text-[14px]">
          <p className="leading-[20px]">
            Please identify yourself using legible information about yourself
            across social media and government systems.
          </p>
        </div>
      </div>

      {/* First Name + Last Name */}
      <div className="flex w-full flex-col gap-4 sm:gap-5 md:flex-row">
        <div className="w-full">
          <FormInput
            label="First Name"
            placeholder="Koulibaly"
            value={formData.firstName}
            onChange={(value) => onFormChange("firstName", value)}
            required
          />
        </div>

        <div className="w-full">
          <FormInput
            label="Last Name"
            placeholder="Koffi"
            value={formData.lastName}
            onChange={(value) => onFormChange("lastName", value)}
            required
          />
        </div>
      </div>

      <div className="w-full text-[13px] text-[rgba(39,38,53,0.5)] sm:text-[14px]">
        <p className="leading-[20px]">
          Use the name on your government issued ID card
        </p>
      </div>

      {/* Email + Phone */}
      <div className="flex w-full flex-col gap-4 sm:gap-5 md:flex-row">
        <div className="w-full">
          <FormInput
            label="Email Address"
            placeholder="example@email.com"
            value={formData.email}
            onChange={(value) => onFormChange("email", value)}
            type="email"
            required
          />
        </div>
        <div className="leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(39,38,53,0.5)] w-full" data-node-id="466:2673">
          <p className="leading-[20px]">Use the name on your government issued ID card</p>
        </div>
      </div>

      {/* DOB */}
      <div className="w-full">
        <DatePicker
          label="Date of Birth"
          value={formData.dateOfBirth}
          onChange={(value) => onFormChange("dateOfBirth", value)}
          required
        />
      </div>
    </div>
  );
}
