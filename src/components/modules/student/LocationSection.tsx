import React from "react";
import { FormSelect } from "./FormSelect";
import { FormInput } from "./FormInput";

interface LocationSectionProps {
  formData: {
    country: string;
    state: string;
    address: string;
  };
  onFormChange: (field: string, value: string | File | null) => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  formData,
  onFormChange,
}) => {
  const countries = [
    { value: "nigeria", label: "Nigeria" },
    { value: "ghana", label: "Ghana" },
    { value: "kenya", label: "Kenya" },
    { value: "south-africa", label: "South Africa" },
  ];

  const states = [
    { value: "lagos", label: "Lagos" },
    { value: "accra", label: "Accra" },
    { value: "nairobi", label: "Nairobi" },
    { value: "johannesburg", label: "Johannesburg" },
  ];

  return (
    <div className="mb-8 flex w-full flex-col gap-5">
      <div className="flex w-full flex-col gap-5 rounded-xl bg-[#f9faf7] p-4 sm:p-5">
        <div className="flex w-full flex-col gap-2">
          <div className="w-full text-[17px] font-semibold leading-6 text-[#1f2937] sm:text-lg">
            Where to find you
          </div>

          <div className="w-full text-[13px] font-normal leading-5 text-[#6b7280] sm:text-sm">
            Provide your location information
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-5">
        <div className="grid w-full grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
          <FormSelect
            label="Country"
            placeholder="Select Country"
            value={formData.country}
            onChange={(value) => onFormChange("country", value)}
            options={countries}
            required
          />

          <FormSelect
            label="State/Province"
            placeholder="Select State"
            value={formData.state}
            onChange={(value) => onFormChange("state", value)}
            options={states}
            required
          />
        </div>

        <div className="w-full">
          <FormInput
            label="Address"
            placeholder="Enter your full address"
            value={formData.address}
            onChange={(value) => onFormChange("address", value)}
            required
          />
        </div>
      </div>
    </div>
  );
};
