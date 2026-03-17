"use client";

import React from "react";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { LocationSection } from "./LocationSection";
import { IdentificationSection } from "./IdentificationSection";
import { GuarantorsSection } from "./GuarantorsSection";
import { SuccessNotification } from "./SuccessNotification";
import { FormInput } from "./FormInput";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  country: string;
  state: string;
  address: string;
  identification: string;

  applicationType: string;
  school: string;
  course: string;
  courseDuration: string;
  level: string;
  institutionCountry: string;
  institutionState: string;
  admissionLetter: File | null;
  personalStatement: File | null;

  previousSchool: string;
  previousCourse: string;
  previousGPA: string;
  previousYear: string;
  reasonForLeaving: string;
  academicTranscript: File | null;
  withdrawalLetter: File | null;
  reenrollmentLetter: File | null;
  characterReference: File | null;

  guarantors: Array<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    state: string;
    attestationLetter: File | null;
  }>;
}

interface MainFormAreaProps {
  currentStep: number;
  formData: FormData;
  onFormChange: (field: string, value: string | File | null) => void;
  onGuarantorsChange: (
    guarantors: Array<{
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      country: string;
      state: string;
      attestationLetter: File | null;
    }>
  ) => void;
  onContinue: () => void;
  onSave: () => void;
  onSubmit?: () => void | Promise<void>;
}

export function MainFormArea({
  currentStep,
  formData,
  onFormChange,
  onGuarantorsChange,
  onContinue,
  onSave,
  onSubmit,
}: MainFormAreaProps) {
  const [applicationType, setApplicationType] = React.useState<
    "newly-admitted" | "returning-student"
  >(
    formData.applicationType === "returning-student"
      ? "returning-student"
      : "newly-admitted"
  );

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showSuccessNotification, setShowSuccessNotification] =
    React.useState(false);
  const [statusMessage, setStatusMessage] = React.useState<string | null>(null);
  const [statusType, setStatusType] = React.useState<"error" | "success" | null>(
    null
  );

  const areGuarantorsValid = () => {
    return formData.guarantors.every(
      (guarantor) =>
        guarantor.firstName.trim() !== "" &&
        guarantor.lastName.trim() !== "" &&
        guarantor.email.trim() !== "" &&
        guarantor.phone.trim() !== "" &&
        guarantor.country.trim() !== "" &&
        guarantor.state.trim() !== ""
    );
  };

  const selectApplicationType = (
    value: "newly-admitted" | "returning-student"
  ) => {
    setApplicationType(value);
    onFormChange("applicationType", value);
    setStatusMessage(null);
    setStatusType(null);
  };

  const handleSubmit = async () => {
    if (!areGuarantorsValid()) {
      setStatusType("error");
      setStatusMessage(
        "Please fill in all required guarantor fields before submitting."
      );
      return;
    }

    setStatusMessage(null);
    setStatusType(null);
    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit();
      }

      setShowSuccessNotification(true);
      setStatusType("success");
      setStatusMessage("Your application has been submitted successfully.");

      window.setTimeout(() => {
        setShowSuccessNotification(false);
      }, 5000);
    } catch (error) {
      console.error("Submission failed:", error);
      setStatusType("error");
      setStatusMessage("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveClick = () => {
    setStatusMessage(null);
    setStatusType(null);
    onSave();
  };

  const handleContinueClick = () => {
    setStatusMessage(null);
    setStatusType(null);
    onContinue();
  };

  const StepTab = ({
    step,
    label,
  }: {
    step: number;
    label: string;
  }) => {
    const active = currentStep === step;

    return (
      <div
        className={`relative min-w-[220px] flex-1 rounded-tl-[12px] rounded-tr-[12px] p-4 sm:p-5 ${
          active ? "bg-[#f9faf7]" : ""
        }`}
      >
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 rounded-tl-[12px] rounded-tr-[12px] border-b ${
            active ? "border-[#198754]" : "border-[rgba(39,38,53,0.1)]"
          }`}
        />

        <div className="relative flex w-full items-center justify-center gap-2">
          <div
            className={`text-[14px] font-medium sm:text-[16px] ${
              active ? "text-[#198754]" : "text-[rgba(39,38,53,0.5)]"
            }`}
          >
            &gt;&gt;
          </div>

          <div
            className={`text-center text-[14px] sm:text-[16px] ${
              active ? "text-[#272635]" : "text-[rgba(39,38,53,0.5)]"
            }`}
          >
            <p className="whitespace-nowrap leading-[22px] sm:leading-[24px]">
              {label}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const SelectField = ({
    label,
    field,
    value,
    options,
    placeholder,
  }: {
    label: string;
    field: string;
    value: string;
    options: Array<{ value: string; label: string }>;
    placeholder: string;
  }) => {
    return (
      <div className="basis-0 flex min-h-px min-w-px grow shrink-0 flex-col items-start justify-start gap-2">
        <div
          className="relative min-w-full shrink-0 text-[16px] text-[#272635]"
          style={{ width: "min-content" }}
        >
          <p className="leading-[1.4]">{label}</p>
        </div>

        <div className="relative flex h-12 w-full min-w-60 items-center justify-start gap-2 rounded-lg bg-[#ffffff] pl-4 pr-3 py-3">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-[-0.5px] rounded-[8.5px] border border-[rgba(39,38,53,0.1)] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]"
          />
          <select
            value={value}
            onChange={(e) => onFormChange(field, e.target.value)}
            className="relative w-full grow border-none bg-transparent text-[14px] text-[#272635] outline-none"
          >
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  const TextAreaField = ({
    label,
    field,
    value,
    placeholder,
  }: {
    label: string;
    field: string;
    value: string;
    placeholder: string;
  }) => {
    return (
      <div className="flex w-full flex-col gap-2">
        <div className="text-[16px] text-[#272635]">
          <p className="leading-[1.4]">{label}</p>
        </div>

        <div className="relative w-full">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[8.5px] border border-[rgba(39,38,53,0.1)] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]"
          />
          <textarea
            value={value}
            onChange={(e) => onFormChange(field, e.target.value)}
            placeholder={placeholder}
            rows={4}
            className="relative w-full resize-none rounded-lg bg-white px-4 py-3 text-[14px] text-[#272635] outline-none placeholder:text-[#93939a]"
          />
        </div>
      </div>
    );
  };

  const FileUploadField = ({
    label,
    description,
    field,
    accept,
    buttonLabel,
  }: {
    label: string;
    description?: string;
    field: string;
    accept?: string;
    buttonLabel?: string;
  }) => {
    const file = formData[field as keyof FormData] as File | null;

    return (
      <div className="flex w-full flex-col gap-2">
        <div className="text-[15px] text-[#272635] sm:text-[16px]">
          <p className="leading-[1.4]">{label}</p>
        </div>

        {description && (
          <div className="text-[13px] text-[rgba(39,38,53,0.5)] sm:text-[14px]">
            <p className="leading-[20px]">{description}</p>
          </div>
        )}

        <label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-[8px] text-left">
          <span className="grid h-[25px] w-[25px] place-items-center rounded-full border border-[rgba(39,38,53,0.15)] text-[#272635]">
            +
          </span>
          <span className="text-[13px] text-[#272635] underline sm:text-[14px]">
            {file ? "Replace file" : buttonLabel || "Attach file"}
          </span>
          <input
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => onFormChange(field, e.target.files?.[0] ?? null)}
          />
        </label>

        {file && (
          <div className="rounded-[8px] border border-[rgba(39,38,53,0.08)] bg-white px-3 py-2 text-[13px] text-[#272635]">
            {file.name}
          </div>
        )}
      </div>
    );
  };

  const levelOptions = [
    { value: "100L", label: "100L" },
    { value: "200L", label: "200L" },
    { value: "300L", label: "300L" },
    { value: "400L", label: "400L" },
    { value: "500L", label: "500L" },
    { value: "600L", label: "600L" },
  ];

  const countryOptions = [
    { value: "Nigeria", label: "Nigeria" },
    { value: "Ghana", label: "Ghana" },
    { value: "Kenya", label: "Kenya" },
    { value: "South Africa", label: "South Africa" },
  ];

  const stateOptions = [
    { value: "Lagos", label: "Lagos" },
    { value: "Abuja", label: "Abuja" },
    { value: "Ogun", label: "Ogun" },
    { value: "Rivers", label: "Rivers" },
    { value: "Accra", label: "Accra" },
    { value: "Nairobi", label: "Nairobi" },
    { value: "Johannesburg", label: "Johannesburg" },
  ];

  return (
    <div className="flex min-w-0 flex-1 basis-0 flex-col items-start gap-[10px] p-4 sm:p-6 lg:p-[40px]">
      <div className="relative w-full overflow-hidden rounded-[16px] bg-[#ffffff] px-0 py-5 shadow-[0px_16px_32px_-8px_rgba(39,38,53,0.1)] sm:rounded-[20px]">
        <div className="flex w-full items-end justify-end px-4 sm:px-5">
          <div className="flex items-center justify-center gap-2 rounded-[999px] px-2">
            <div className="text-[#272635] text-[13px] sm:text-[14px]">
              <p className="whitespace-pre leading-[20px]">English</p>
            </div>
            <div className="text-[#272635] text-[12px]">▾</div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-5 px-4 py-0 sm:px-6 lg:px-10 xl:px-[120px] 2xl:px-[200px]">
          <div className="w-full text-[#272635]">
            <div className="text-[24px] sm:text-[28px] lg:text-[32px]">
              <p className="leading-[1.15]">Apply to become a FabFour</p>
            </div>
            <div className="mt-2 text-[15px] sm:text-[16px] lg:text-[18px]">
              <p className="leading-[24px] sm:leading-[26px] lg:leading-[28px]">
                Africa&apos;s trusted social fundraising platform to support
                smart minds through tertiary education.
              </p>
            </div>
          </div>

          <div className="h-px w-full bg-[rgba(39,38,53,0.08)]" />

          {statusMessage && (
            <div
              className={`w-full rounded-[12px] border px-4 py-3 text-sm ${
                statusType === "error"
                  ? "border-red-200 bg-red-50 text-red-700"
                  : "border-green-200 bg-green-50 text-green-700"
              }`}
            >
              {statusMessage}
            </div>
          )}

          <div className="w-full">
            <div className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex min-w-max items-start justify-start">
                <StepTab step={1} label="Tell us about yourself" />
                <StepTab step={2} label="Provide evidence" />
                <StepTab step={3} label="Provide Guarantors" />
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col gap-8 sm:gap-10 lg:gap-12">
            {currentStep === 1 && (
              <>
                <PersonalInfoSection
                  formData={{
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    dateOfBirth: formData.dateOfBirth,
                  }}
                  onFormChange={onFormChange}
                />

                <LocationSection
                  formData={{
                    country: formData.country,
                    state: formData.state,
                    address: formData.address,
                  }}
                  onFormChange={onFormChange}
                />

                <IdentificationSection
                  formData={{
                    identification: formData.identification,
                  }}
                  onFormChange={onFormChange}
                />
              </>
            )}

            {currentStep === 2 && (
              <div className="flex w-full flex-col gap-8 sm:gap-10">
                <div className="w-full rounded-[12px] bg-[#f9faf7] p-4 sm:p-5">
                  <div className="text-[#272635] text-[15px] sm:text-[16px]">
                    <p className="leading-[1.4]">
                      How are you applying to the FabFour Foundation?
                    </p>
                  </div>

                  <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => selectApplicationType("newly-admitted")}
                      className={`flex w-full items-start justify-between gap-3 rounded-[12px] bg-white p-3 text-left shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)] ${
                        applicationType === "newly-admitted"
                          ? "border border-[#272635]"
                          : "border border-[rgba(39,38,53,0.1)]"
                      }`}
                    >
                      <span
                        className={`text-[15px] sm:text-[16px] ${
                          applicationType === "newly-admitted"
                            ? "text-[#272635]"
                            : "text-[rgba(39,38,53,0.5)]"
                        }`}
                      >
                        Newly Admitted
                      </span>

                      <span
                        className={`grid h-4 w-4 place-items-center rounded-[4px] text-[10px] ${
                          applicationType === "newly-admitted"
                            ? "bg-[#2c2c2c] text-white"
                            : "border border-[rgba(39,38,53,0.1)]"
                        }`}
                      >
                        {applicationType === "newly-admitted" ? "✓" : ""}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => selectApplicationType("returning-student")}
                      className={`flex w-full items-start justify-between gap-3 rounded-[12px] bg-white p-3 text-left shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)] ${
                        applicationType === "returning-student"
                          ? "border border-[#272635]"
                          : "border border-[rgba(39,38,53,0.1)]"
                      }`}
                    >
                      <span
                        className={`text-[15px] sm:text-[16px] ${
                          applicationType === "returning-student"
                            ? "text-[#272635]"
                            : "text-[rgba(39,38,53,0.5)]"
                        }`}
                      >
                        Returning Student
                      </span>

                      <span
                        className={`grid h-4 w-4 place-items-center rounded-[4px] text-[10px] ${
                          applicationType === "returning-student"
                            ? "bg-[#2c2c2c] text-white"
                            : "border border-[rgba(39,38,53,0.1)]"
                        }`}
                      >
                        {applicationType === "returning-student" ? "✓" : ""}
                      </span>
                    </button>
                  </div>
                </div>

                {applicationType === "newly-admitted" && (
                  <>
                    <div className="w-full rounded-[12px] bg-[#f9faf7] p-4 sm:p-5">
                      <div className="mb-5">
                        <div className="text-[#272635] text-[18px] sm:text-[20px]">
                          <p className="leading-[28px]">Higher Institution</p>
                        </div>
                        <div className="mt-2 text-[13px] text-[rgba(39,38,53,0.5)] sm:text-[14px]">
                          <p className="leading-[20px]">
                            Provide complete information about your admission.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-5">
                        <FormInput
                          label="Which school are you attending?"
                          placeholder="Enter institution name"
                          value={formData.school}
                          onChange={(value) => onFormChange("school", value)}
                          required
                        />

                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                          <FormInput
                            label="What course were you offered?"
                            placeholder="Ex. Computer Science"
                            value={formData.course}
                            onChange={(value) => onFormChange("course", value)}
                            required
                          />

                          <SelectField
                            label="What's your current course level?"
                            field="level"
                            value={formData.level}
                            placeholder="Select level"
                            options={levelOptions}
                          />
                        </div>

                        <FormInput
                          label="Course Duration"
                          placeholder={`Ex. ${new Date().getFullYear()} - ${new Date().getFullYear() + 4}`}
                          value={formData.courseDuration}
                          onChange={(value) =>
                            onFormChange("courseDuration", value)
                          }
                          required
                        />

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                          <SelectField
                            label="Country"
                            field="institutionCountry"
                            value={formData.institutionCountry}
                            placeholder="Select Country"
                            options={countryOptions}
                          />

                          <SelectField
                            label="State"
                            field="institutionState"
                            value={formData.institutionState}
                            placeholder="Select State"
                            options={stateOptions}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-full rounded-[12px] bg-[#f9faf7] p-4 sm:p-5">
                      <div className="mb-5">
                        <div className="text-[#272635] text-[18px] sm:text-[20px]">
                          <p className="leading-[28px]">
                            Attach Supporting Documents
                          </p>
                        </div>
                        <div className="mt-2 text-[13px] text-[rgba(39,38,53,0.5)] sm:text-[14px]">
                          <p className="leading-[20px]">
                            Upload the required supporting documents.
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-5">
                        <FileUploadField
                          label="Upload an original copy of your admission offer letter"
                          description="Accepted formats: PDF, DOC, DOCX, JPG, PNG."
                          field="admissionLetter"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          buttonLabel="Attach Admission Letter"
                        />

                        <div className="h-px w-full bg-[rgba(39,38,53,0.08)]" />

                        <FileUploadField
                          label="Provide a personal statement describing why you're fit for the FabFour Academic Scholarship"
                          description="We recommend a minimum of 1000 words."
                          field="personalStatement"
                          accept=".pdf,.doc,.docx"
                          buttonLabel="Attach Personal Statement"
                        />
                      </div>
                    </div>
                  </>
                )}

                {applicationType === "returning-student" && (
                  <>
                    <div className="w-full rounded-[12px] bg-[#f9faf7] p-4 sm:p-5">
                      <div className="mb-5">
                        <div className="text-[#272635] text-[18px] sm:text-[20px]">
                          <p className="leading-[28px]">
                            Returning Student Information
                          </p>
                        </div>
                        <div className="mt-2 text-[13px] text-[rgba(39,38,53,0.5)] sm:text-[14px]">
                          <p className="leading-[20px]">
                            Provide information about your current academic
                            status.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-5">
                        <FormInput
                          label="Current Institution"
                          placeholder="Enter current institution"
                          value={formData.school}
                          onChange={(value) => onFormChange("school", value)}
                          required
                        />

                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                          <FormInput
                            label="Current Course"
                            placeholder="Ex. Computer Science"
                            value={formData.course}
                            onChange={(value) => onFormChange("course", value)}
                            required
                          />

                          <SelectField
                            label="Current Level"
                            field="level"
                            value={formData.level}
                            placeholder="Select level"
                            options={levelOptions}
                          />
                        </div>

                        <FormInput
                          label="Course Duration"
                          placeholder="Ex. 2021 - 2025"
                          value={formData.courseDuration}
                          onChange={(value) =>
                            onFormChange("courseDuration", value)
                          }
                          required
                        />

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                          <SelectField
                            label="Country"
                            field="institutionCountry"
                            value={formData.institutionCountry}
                            placeholder="Select Country"
                            options={countryOptions}
                          />

                          <SelectField
                            label="State"
                            field="institutionState"
                            value={formData.institutionState}
                            placeholder="Select State"
                            options={stateOptions}
                          />
                        </div>

                        <FormInput
                          label="Previous School"
                          placeholder="Enter previous school"
                          value={formData.previousSchool}
                          onChange={(value) =>
                            onFormChange("previousSchool", value)
                          }
                        />

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                          <FormInput
                            label="Previous Course"
                            placeholder="Enter previous course"
                            value={formData.previousCourse}
                            onChange={(value) =>
                              onFormChange("previousCourse", value)
                            }
                          />

                          <FormInput
                            label="Previous GPA"
                            placeholder="Ex. 4.20"
                            value={formData.previousGPA}
                            onChange={(value) =>
                              onFormChange("previousGPA", value)
                            }
                            type="number"
                          />
                        </div>

                        <FormInput
                          label="Previous Academic Year"
                          placeholder="Ex. 2023/2024"
                          value={formData.previousYear}
                          onChange={(value) =>
                            onFormChange("previousYear", value)
                          }
                        />

                        <TextAreaField
                          label="Reason for Leaving / Interruption"
                          field="reasonForLeaving"
                          value={formData.reasonForLeaving}
                          placeholder="Explain the reason clearly"
                        />
                      </div>
                    </div>

                    <div className="w-full rounded-[12px] bg-[#f9faf7] p-4 sm:p-5">
                      <div className="mb-5">
                        <div className="text-[#272635] text-[18px] sm:text-[20px]">
                          <p className="leading-[28px]">
                            Previous Academic Results
                          </p>
                        </div>
                        <div className="mt-2 text-[13px] text-[rgba(39,38,53,0.5)] sm:text-[14px]">
                          <p className="leading-[20px]">
                            Upload your academic and supporting documents.
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-5">
                        <FileUploadField
                          label="Upload previous academic year result"
                          field="academicTranscript"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          buttonLabel="Attach Previous Result"
                        />

                        <div className="h-px w-full bg-[rgba(39,38,53,0.08)]" />

                        <FileUploadField
                          label="Upload withdrawal letter"
                          field="withdrawalLetter"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          buttonLabel="Attach Withdrawal Letter"
                        />

                        <div className="h-px w-full bg-[rgba(39,38,53,0.08)]" />

                        <FileUploadField
                          label="Upload re-enrollment letter"
                          field="reenrollmentLetter"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          buttonLabel="Attach Re-enrollment Letter"
                        />

                        <div className="h-px w-full bg-[rgba(39,38,53,0.08)]" />

                        <FileUploadField
                          label="Upload character reference"
                          field="characterReference"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          buttonLabel="Attach Character Reference"
                        />

                        <div className="h-px w-full bg-[rgba(39,38,53,0.08)]" />

                        <FileUploadField
                          label="Attach personal statement"
                          field="personalStatement"
                          accept=".pdf,.doc,.docx"
                          buttonLabel="Attach Personal Statement"
                        />
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

          <div className="flex w-full flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-4">
            <button
              type="button"
              onClick={handleSaveClick}
              className="w-full rounded-lg px-2 py-2 text-[14px] text-[#272635] sm:w-auto sm:text-[16px]"
            >
              <span className="underline leading-none cursor-pointer">
                Save To Continue Later
              </span>
            </button>

            {currentStep === 3 ? (
              <button
                type="button"
                disabled={!areGuarantorsValid() || isSubmitting}
                onClick={
                  areGuarantorsValid() && !isSubmitting
                    ? handleSubmit
                    : undefined
                }
                className={`h-12 w-full rounded-lg border border-[#2c2c2c] px-5 py-3 text-[15px] text-white sm:h-14 sm:w-auto sm:text-[16px] ${
                  areGuarantorsValid() && !isSubmitting
                    ? "bg-[#273125]"
                    : "cursor-not-allowed bg-[#6b7280]"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleContinueClick}
                className="h-12 w-full cursor-pointer rounded-lg border border-[#2c2c2c] bg-[#273125] px-5 py-3 text-[15px] text-white sm:h-14 sm:w-auto sm:text-[16px]"
              >
                Continue
              </button>
            )}
          </div>
        </div>

      </div>

      <SuccessNotification
        isVisible={showSuccessNotification}
        message="Your application has been submitted successfully"
      />
    </div>
  );
}