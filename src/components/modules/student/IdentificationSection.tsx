import React from "react";
import { FormSelect } from "./FormSelect";

interface IdentificationSectionProps {
  formData: {
    identification: string;
  };
  onFormChange: (field: string, value: string | File | null) => void;
}

export const IdentificationSection: React.FC<IdentificationSectionProps> = ({
  formData,
  onFormChange,
}) => {
  const identificationTypes = [
    { value: "NATIONAL_IDENTITY", label: "National ID Card" },
    { value: "PASSPORT", label: "International Passport" },
    { value: "DRIVERS_LICENCE", label: "Driver's License" },
    { value: "VOTERS_CARD", label: "Voter's Card" },
    { value: "BIRTH_CERTIFICATE", label: "Birth Certificate" },
  ];

  return (
    <div className="mt-8 flex w-full flex-col gap-5">
      <div className="flex w-full flex-col gap-5 rounded-xl bg-[#f9faf7] p-4 sm:p-5">
        <div className="flex w-full flex-col gap-2">
          <div className="w-full text-[17px] font-semibold leading-6 text-[#1f2937] sm:text-lg">
            Identify Yourself
          </div>

          <div className="w-full text-[13px] font-normal leading-5 text-[#6b7280] sm:text-sm">
            Select your primary identification document
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-5">
        <div className="w-full">
          <FormSelect
            label="Identification Type"
            value={formData.identification}
            onChange={(value) => onFormChange("identification", value)}
            options={identificationTypes}
            placeholder="Select identification type"
            required
          />
        </div>
      </div>
    </div>
  );
};

