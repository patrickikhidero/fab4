import React from "react";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { LocationSection } from "./LocationSection";
import { IdentificationSection } from "./IdentificationSection";
import { ProvideEvidenceForm } from "./ProvideEvidenceForm";
import { GuarantorsSection } from "./GuarantorsSection";
import { SuccessNotification } from "./SuccessNotification";

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
  onSubmit?: () => void;
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

  const imgVector = "/svg/ui/globe.svg";
  const imgGroup = "/svg/ui/group.svg";
  const imgVector1 = "/svg/ui/vector1.svg";
  const imgVector2 = "/svg/ui/vector2.svg";
  const img = "/svg/ui/language.svg";
  const img1 = "/svg/ui/language1.svg";
  const img2 = "/svg/ui/language2.svg";
  const img3 = "/svg/ui/language3.svg";
  const img4 = "/svg/ui/language4.svg";
  const img5 = "/svg/ui/language5.svg";
  const img6 = "/svg/ui/language6.svg";

  const img7 = "/svg/icons/dropdown-arrow.svg";
  const img8 = "/svg/icons/double-caret.svg";
  const img9 = "/svg/icons/caret-active.svg";
  const img10 = "/svg/icons/caret-inactive.svg";
  const img11 = "/svg/icons/checkmark.svg";
  const img12 = "/svg/icons/plus.svg";
  const img13 = "/svg/icons/plus-detail1.svg";
  const img14 = "/svg/icons/plus-detail2.svg";

  const imgLine1 = "/svg/decoration/divider-line1.svg";
  const imgLine2 = "/svg/decoration/divider-line2.svg";

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
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setShowSuccessNotification(true);
      setStatusType("success");
      setStatusMessage("Your application has been submitted successfully.");

      setTimeout(() => {
        setShowSuccessNotification(false);
      }, 5000);

      if (onSubmit) {
        await onSubmit();
      }
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
        className={`min-w-[220px] flex-1 rounded-tl-[12px] rounded-tr-[12px] p-4 sm:p-5 ${
          active ? "bg-[#f9faf7]" : ""
        } relative`}
      >
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 rounded-tl-[12px] rounded-tr-[12px] border-solid ${
            active
              ? "border-[#198754] border-[0px_0px_1px]"
              : "border-[rgba(39,38,53,0.1)] border-[0px_0px_1px]"
          }`}
        />

        <div className="relative flex w-full items-center justify-center gap-2">
          <div className="relative h-5 w-5 shrink-0 overflow-clip">
            <div className="absolute inset-0">
              <img alt="Step Icon" className="block size-full max-w-none" src={img8} />
            </div>
            <div className="absolute inset-[18.75%_46.88%_18.75%_21.88%]">
              <div
                className="absolute inset-[-4%_-8%]"
                style={{
                  ["--stroke-0" as any]: active
                    ? "rgba(25, 135, 84, 1)"
                    : "rgba(39, 38, 53, 1)",
                }}
              >
                <img
                  alt="Step Icon Detail"
                  className="block size-full max-w-none"
                  src={active ? img9 : img10}
                />
              </div>
            </div>
            <div className="absolute inset-[18.75%_15.63%_18.75%_53.13%]">
              <div
                className="absolute inset-[-4%_-8%]"
                style={{
                  ["--stroke-0" as any]: active
                    ? "rgba(25, 135, 84, 1)"
                    : "rgba(39, 38, 53, 1)",
                }}
              >
                <img
                  alt="Step Icon Detail 2"
                  className="block size-full max-w-none"
                  src={active ? img9 : img10}
                />
              </div>
            </div>
          </div>

          <div
            className={`text-center text-[14px] sm:text-[16px] ${
              active ? "text-[#272635]" : "text-[rgba(39,38,53,0.5)]"
            }`}
          >
            <p className="leading-[22px] sm:leading-[24px] whitespace-nowrap">
              {label}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const UploadButton = ({ label }: { label: string }) => (
    <button
      type="button"
      className="flex items-center justify-center gap-2 rounded-[8px] text-left"
    >
      <div className="relative h-[25px] w-[25px] shrink-0 overflow-clip">
        <div className="absolute inset-0">
          <img alt="Plus Icon" className="block size-full max-w-none" src={img12} />
        </div>
        <div className="absolute bottom-1/2 left-[15.63%] right-[15.63%] top-1/2">
          <div className="absolute inset-[-0.5px_-4.55%]">
            <img
              alt="Plus Icon Detail"
              className="block size-full max-w-none"
              src={img13}
            />
          </div>
        </div>
        <div className="absolute bottom-[15.63%] left-1/2 right-1/2 top-[15.63%]">
          <div className="absolute inset-[-4.55%_-0.5px]">
            <img
              alt="Plus Icon Detail 2"
              className="block size-full max-w-none"
              src={img14}
            />
          </div>
        </div>
      </div>
      <div className="text-[#272635] text-[13px] sm:text-[14px]">
        <p className="underline leading-none">{label}</p>
      </div>
    </button>
  );

  return (
    <div className="flex flex-1 basis-0 flex-col items-start gap-[10px] p-4 sm:p-6 lg:p-[40px] min-w-0">
      <div className="relative w-full shrink-0 overflow-hidden rounded-[16px] sm:rounded-[20px] bg-[#ffffff] px-0 py-5 shadow-[0px_16px_32px_-8px_rgba(39,38,53,0.1)]">
        {/* Top Language Selector */}
        <div className="flex w-full items-end justify-end px-4 sm:px-5">
          <div className="flex items-center justify-center gap-2 rounded-[999px] px-2">
            <div className="relative h-4 w-4 shrink-0 overflow-clip">
              <div className="absolute inset-0">
                <img
                  alt="Globe Icon"
                  className="block size-full max-w-none"
                  src={imgVector2}
                />
              </div>
              <div className="absolute left-0.5 top-0.5 h-[11.5px] w-[13px]">
                <div className="absolute bottom-0 left-[46.15%] right-0 top-[39.13%]">
                  <div
                    className="absolute inset-[-7.14%]"
                    style={{ ["--stroke-0" as any]: "rgba(39, 38, 53, 1)" }}
                  >
                    <img
                      alt="Language Icon"
                      className="block size-full max-w-none"
                      src={img}
                    />
                  </div>
                </div>
                <div className="absolute inset-[82.61%_7.69%_17.39%_53.85%]">
                  <div
                    className="absolute inset-[-0.5px_-10%]"
                    style={{ ["--stroke-0" as any]: "rgba(39, 38, 53, 1)" }}
                  >
                    <img
                      alt="Language Icon 2"
                      className="block size-full max-w-none"
                      src={img1}
                    />
                  </div>
                </div>
                <div className="absolute bottom-[86.96%] left-[30.77%] right-[69.23%] top-0">
                  <div
                    className="absolute inset-[-33.33%_-0.5px]"
                    style={{ ["--stroke-0" as any]: "rgba(39, 38, 53, 1)" }}
                  >
                    <img
                      alt="Language Icon 3"
                      className="block size-full max-w-none"
                      src={img2}
                    />
                  </div>
                </div>
                <div className="absolute bottom-[86.96%] left-0 right-[38.46%] top-[13.04%]">
                  <div
                    className="absolute inset-[-0.5px_-6.25%]"
                    style={{ ["--stroke-0" as any]: "rgba(39, 38, 53, 1)" }}
                  >
                    <img
                      alt="Language Icon 4"
                      className="block size-full max-w-none"
                      src={img3}
                    />
                  </div>
                </div>
                <div className="absolute bottom-[34.78%] left-0 right-[53.85%] top-[13.04%]">
                  <div
                    className="absolute inset-[-8.333%]"
                    style={{ ["--stroke-0" as any]: "rgba(39, 38, 53, 1)" }}
                  >
                    <img
                      alt="Language Icon 5"
                      className="block size-full max-w-none"
                      src={img4}
                    />
                  </div>
                </div>
                <div className="absolute inset-[30.43%_38.46%_34.78%_18.02%]">
                  <div
                    className="absolute inset-[-12.5%_-8.84%]"
                    style={{ ["--stroke-0" as any]: "rgba(39, 38, 53, 1)" }}
                  >
                    <img
                      alt="Language Icon 6"
                      className="block size-full max-w-none"
                      src={img5}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="shrink-0 text-[#272635] text-[13px] sm:text-[14px]">
              <p className="leading-[20px] whitespace-pre">English</p>
            </div>

            <div className="relative h-4 w-4 shrink-0 overflow-clip">
              <div className="absolute inset-0">
                <img
                  alt="Dropdown Arrow"
                  className="block size-full max-w-none"
                  src={img6}
                />
              </div>
              <div className="absolute inset-[34.38%_15.63%_28.12%_15.62%]">
                <img
                  alt="Dropdown Arrow Detail"
                  className="block size-full max-w-none"
                  src={img7}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex w-full flex-col items-center gap-5 px-4 py-0 sm:px-6 lg:px-10 xl:px-[120px] 2xl:px-[200px]">
          {/* Page Title */}
          <div className="w-full text-[#272635]">
            <div className="text-[24px] sm:text-[28px] lg:text-[32px]">
              <p className="leading-[1.15]">Apply to become a FabFour</p>
            </div>
            <div className="mt-2 text-[15px] sm:text-[16px] lg:text-[18px]">
              <p className="leading-[24px] sm:leading-[26px] lg:leading-[28px]">
                Africa&apos;s trusted social fundraising platform to support smart
                minds through tertiary education.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="relative h-0 w-full">
            <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
              <img
                alt="Divider Line"
                className="block size-full max-w-none"
                src={imgLine1}
              />
            </div>
          </div>

          {/* Status Banner */}
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

          {/* Progress Steps */}
          <div className="w-full">
            <div className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex min-w-max items-start justify-start">
                <StepTab step={1} label="Tell us about yourself" />
                <StepTab step={2} label="Provide evidence" />
                <StepTab step={3} label="Provide Guarantors" />
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex w-full flex-col gap-8 sm:gap-10 lg:gap-12">
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
              <div className="flex w-full flex-col gap-8 sm:gap-10">
                {/* Application Type */}
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
                      className={`relative flex w-full items-start justify-between gap-3 rounded-[12px] bg-[#ffffff] p-3 text-left shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)] ${
                        applicationType === "newly-admitted"
                          ? "border border-[#272635]"
                          : "border border-[rgba(39,38,53,0.1)]"
                      }`}
                    >
                      <div className="min-w-0 flex-1 text-[15px] sm:text-[16px]">
                        <p
                          className={`leading-[1.4] ${
                            applicationType === "newly-admitted"
                              ? "text-[#272635]"
                              : "text-[rgba(39,38,53,0.5)]"
                          }`}
                        >
                          Newly Admitted
                        </p>
                      </div>

                      <div
                        className={`relative h-4 w-4 shrink-0 rounded-[4px] ${
                          applicationType === "newly-admitted"
                            ? "bg-[#2c2c2c]"
                            : ""
                        }`}
                      >
                        {applicationType === "newly-admitted" ? (
                          <div className="flex h-4 w-4 items-center justify-center rounded-[4px] bg-[#2c2c2c] overflow-hidden">
                            <div className="relative h-4 w-4 overflow-clip">
                              <div
                                className="absolute bottom-[29.17%] left-[16.67%] right-[16.67%] top-1/4"
                                style={{
                                  ["--stroke-0" as any]:
                                    "rgba(245, 245, 245, 1)",
                                }}
                              >
                                <img
                                  alt="Check Icon"
                                  className="block size-full max-w-none"
                                  src={img11}
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 rounded-[4px] border border-[rgba(39,38,53,0.1)]"
                          />
                        )}
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => selectApplicationType("returning-student")}
                      className={`relative flex w-full items-start justify-between gap-3 rounded-[12px] bg-[#ffffff] p-3 text-left shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)] ${
                        applicationType === "returning-student"
                          ? "border border-[#272635]"
                          : "border border-[rgba(39,38,53,0.1)]"
                      }`}
                    >
                      <div className="min-w-0 flex-1 text-[15px] sm:text-[16px]">
                        <p
                          className={`leading-[1.4] ${
                            applicationType === "returning-student"
                              ? "text-[#272635]"
                              : "text-[rgba(39,38,53,0.5)]"
                          }`}
                        >
                          Returning Student
                        </p>
                      </div>

                      <div
                        className={`relative h-4 w-4 shrink-0 rounded-[4px] ${
                          applicationType === "returning-student"
                            ? "bg-[#2c2c2c]"
                            : ""
                        }`}
                      >
                        {applicationType === "returning-student" ? (
                          <div className="flex h-4 w-4 items-center justify-center rounded-[4px] bg-[#2c2c2c] overflow-hidden">
                            <div className="relative h-4 w-4 overflow-clip">
                              <div
                                className="absolute bottom-[29.17%] left-[16.67%] right-[16.67%] top-1/4"
                                style={{
                                  ["--stroke-0" as any]:
                                    "rgba(245, 245, 245, 1)",
                                }}
                              >
                                <img
                                  alt="Check Icon"
                                  className="block size-full max-w-none"
                                  src={img11}
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 rounded-[4px] border border-[rgba(39,38,53,0.1)]"
                          />
                        )}
                      </div>
                    </button>
                  </div>
                </div>

                {applicationType === "newly-admitted" && (
                  <>
                    {/* Newly admitted */}
                    <div className="w-full rounded-[12px] bg-[#f9faf7] p-4 sm:p-5">
                      <div className="mb-5">
                        <div className="text-[#272635] text-[18px] sm:text-[20px]">
                          <p className="leading-[28px]">High Institution</p>
                        </div>
                        <div className="mt-2 text-[13px] sm:text-[14px] text-[rgba(39,38,53,0.5)]">
                          <p className="leading-[20px]">
                            Provide complete information about your admission
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-5">
                        <div>
                          <div className="mb-2 text-[15px] sm:text-[16px] text-[#272635]">
                            <p className="leading-[1.4]">
                              Which school are you attending?
                            </p>
                          </div>
                          <div className="relative flex h-12 w-full items-center rounded-[8px] bg-[#ffffff] pl-4 pr-3 py-3">
                            <div
                              aria-hidden="true"
                              className="absolute inset-[-0.5px] rounded-[8.5px] border border-[rgba(39,38,53,0.1)] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]"
                            />
                            <div className="relative min-w-0 flex-1 text-[#93939a] text-[14px]">
                              <p className="leading-none">
                                Select High Institution
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
                          <div>
                            <div className="mb-2 text-[15px] sm:text-[16px] text-[#272635]">
                              <p className="leading-[1.4]">
                                What course were you offered?
                              </p>
                            </div>
                            <div className="relative flex h-12 w-full items-center rounded-[8px] bg-[#ffffff] pl-4 pr-3 py-3">
                              <div
                                aria-hidden="true"
                                className="absolute inset-[-0.5px] rounded-[8.5px] border border-[rgba(39,38,53,0.1)] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]"
                              />
                              <div className="relative min-w-0 flex-1 text-[#93939a] text-[14px]">
                                <p className="leading-none">
                                  Ex. Bio Chemical Engineering
                                </p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="mb-2 text-[15px] sm:text-[16px] text-[#272635]">
                              <p className="leading-[1.4]">
                                What&apos;s your current course level?
                              </p>
                            </div>
                            <div className="relative flex h-12 w-full items-center rounded-[8px] bg-[#ffffff] pl-4 pr-3 py-3">
                              <div
                                aria-hidden="true"
                                className="absolute inset-[-0.5px] rounded-[8.5px] border border-[rgba(39,38,53,0.1)] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]"
                              />
                              <div className="relative min-w-0 flex-1 text-[#93939a] text-[14px]">
                                <p className="leading-none">Select level</p>
                              </div>
                              <div className="relative h-4 w-4 shrink-0 overflow-clip">
                                <div className="absolute inset-0">
                                  <img
                                    alt="Dropdown Arrow"
                                    className="block size-full max-w-none"
                                    src={img6}
                                  />
                                </div>
                                <div className="absolute inset-[34.38%_15.63%_28.12%_15.62%]">
                                  <img
                                    alt="Dropdown Arrow Detail"
                                    className="block size-full max-w-none"
                                    src={img7}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                          <div>
                            <div className="mb-2 text-[15px] sm:text-[16px] text-[#272635]">
                              <p className="leading-[1.4]">Country</p>
                            </div>
                            <div className="relative flex h-12 w-full items-center rounded-[8px] bg-[#ffffff] pl-4 pr-3 py-3">
                              <div
                                aria-hidden="true"
                                className="absolute inset-[-0.5px] rounded-[8.5px] border border-[rgba(39,38,53,0.1)] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]"
                              />
                              <div className="relative min-w-0 flex-1 text-[#93939a] text-[14px]">
                                <p className="leading-none">Select Country</p>
                              </div>
                              <div className="relative h-4 w-4 shrink-0 overflow-clip">
                                <div className="absolute inset-0">
                                  <img
                                    alt="Dropdown Arrow"
                                    className="block size-full max-w-none"
                                    src={img6}
                                  />
                                </div>
                                <div className="absolute inset-[34.38%_15.63%_28.12%_15.62%]">
                                  <img
                                    alt="Dropdown Arrow Detail"
                                    className="block size-full max-w-none"
                                    src={img7}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="mb-2 text-[15px] sm:text-[16px] text-[#272635]">
                              <p className="leading-[1.4]">State</p>
                            </div>
                            <div className="relative flex h-12 w-full items-center rounded-[8px] bg-[#ffffff] pl-4 pr-3 py-3">
                              <div
                                aria-hidden="true"
                                className="absolute inset-[-0.5px] rounded-[8.5px] border border-[rgba(39,38,53,0.1)] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]"
                              />
                              <div className="relative min-w-0 flex-1 text-[#93939a] text-[14px]">
                                <p className="leading-none">Select State</p>
                              </div>
                              <div className="relative h-4 w-4 shrink-0 overflow-clip">
                                <div className="absolute inset-0">
                                  <img
                                    alt="Dropdown Arrow"
                                    className="block size-full max-w-none"
                                    src={img6}
                                  />
                                </div>
                                <div className="absolute inset-[34.38%_15.63%_28.12%_15.62%]">
                                  <img
                                    alt="Dropdown Arrow Detail"
                                    className="block size-full max-w-none"
                                    src={img7}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Supporting documents */}
                    <div className="w-full rounded-[12px] bg-[#f9faf7] p-4 sm:p-5">
                      <div className="mb-5">
                        <div className="text-[#272635] text-[18px] sm:text-[20px]">
                          <p className="leading-[28px]">
                            Attach Supporting Documents
                          </p>
                        </div>
                        <div className="mt-2 text-[13px] sm:text-[14px] text-[rgba(39,38,53,0.5)]">
                          <p className="leading-[20px]">
                            Provide complete information about your admission
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="text-[15px] sm:text-[16px] text-[#272635]">
                          <p className="leading-[1.4]">
                            Upload a original copy of your admission offer letter
                          </p>
                        </div>
                        <div className="text-[13px] sm:text-[14px] text-[rgba(39,38,53,0.5)]">
                          <p className="leading-[20px]">
                            <span>
                              We recommend a minimum of 1000 word document
                              showcasing why we should consider. See example{" "}
                            </span>
                            <span className="text-[#198754] underline">here</span>
                          </p>
                        </div>
                        <UploadButton label="Attach Personal Statement" />
                      </div>

                      <div className="relative mt-5 h-0 w-full">
                        <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                          <img
                            alt="Divider Line"
                            className="block size-full max-w-none"
                            src={imgLine2}
                          />
                        </div>
                      </div>

                      <div className="mt-5 flex flex-col gap-2">
                        <div className="text-[15px] sm:text-[16px] text-[#272635]">
                          <p className="leading-[24px]">
                            Provide a personal statement describing why
                            you&apos;re fit for the FabFour Academic Scholarship
                          </p>
                        </div>
                        <div className="text-[13px] sm:text-[14px] text-[rgba(39,38,53,0.5)]">
                          <p className="leading-[20px]">
                            <span>
                              We recommend a minimum of 1000 word document
                              showcasing why we should consider. See example{" "}
                            </span>
                            <span className="text-[#198754] underline">here</span>
                          </p>
                        </div>
                        <UploadButton label="Attach Personal Statement" />
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
                        <div className="mt-2 text-[13px] sm:text-[14px] text-[rgba(39,38,53,0.5)]">
                          <p className="leading-[20px]">
                            Provide information about your current academic status
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-5">
                        <div>
                          <div className="mb-2 text-[15px] sm:text-[16px] text-[#272635]">
                            <p className="leading-[1.4]">Current Institution</p>
                          </div>
                          <div className="relative flex h-12 w-full items-center rounded-[8px] bg-[#ffffff] pl-4 pr-3 py-3">
                            <div
                              aria-hidden="true"
                              className="absolute inset-[-0.5px] rounded-[8.5px] border border-[rgba(39,38,53,0.1)] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]"
                            />
                            <div className="relative min-w-0 flex-1 text-[#93939a] text-[14px]">
                              <p className="leading-none">
                                Select Current Institution
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
                          <div>
                            <div className="mb-2 text-[15px] sm:text-[16px] text-[#272635]">
                              <p className="leading-[1.4]">Current Course</p>
                            </div>
                            <div className="relative flex h-12 w-full items-center rounded-[8px] bg-[#ffffff] pl-4 pr-3 py-3">
                              <div
                                aria-hidden="true"
                                className="absolute inset-[-0.5px] rounded-[8.5px] border border-[rgba(39,38,53,0.1)] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]"
                              />
                              <div className="relative min-w-0 flex-1 text-[#93939a] text-[14px]">
                                <p className="leading-none">
                                  Ex. Bio Chemical Engineering
                                </p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="mb-2 text-[15px] sm:text-[16px] text-[#272635]">
                              <p className="leading-[1.4]">Current Level</p>
                            </div>
                            <div className="relative flex h-12 w-full items-center rounded-[8px] bg-[#ffffff] pl-4 pr-3 py-3">
                              <div
                                aria-hidden="true"
                                className="absolute inset-[-0.5px] rounded-[8.5px] border border-[rgba(39,38,53,0.1)] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]"
                              />
                              <div className="relative min-w-0 flex-1 text-[#93939a] text-[14px]">
                                <p className="leading-none">Select level</p>
                              </div>
                              <div className="relative h-4 w-4 shrink-0 overflow-clip">
                                <div className="absolute inset-0">
                                  <img
                                    alt="Dropdown Arrow"
                                    className="block size-full max-w-none"
                                    src={img6}
                                  />
                                </div>
                                <div className="absolute inset-[34.38%_15.63%_28.12%_15.62%]">
                                  <img
                                    alt="Dropdown Arrow Detail"
                                    className="block size-full max-w-none"
                                    src={img7}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 rounded-[12px] bg-[#f9faf7] p-0">
                        <div className="mb-5">
                          <div className="text-[#272635] text-[18px] sm:text-[20px]">
                            <p className="leading-[28px]">
                              Previous Academic Results
                            </p>
                          </div>
                          <div className="mt-2 text-[13px] sm:text-[14px] text-[rgba(39,38,53,0.5)]">
                            <p className="leading-[20px]">
                              Upload your previous academic year results
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="text-[15px] sm:text-[16px] text-[#272635]">
                            <p className="leading-[1.4]">
                              Upload previous academic year result
                            </p>
                          </div>
                          <div className="text-[13px] sm:text-[14px] text-[rgba(39,38,53,0.5)]">
                            <p className="leading-[20px]">
                              <span>
                                We recommend a minimum of 1000 word document
                                showcasing why we should consider. See example{" "}
                              </span>
                              <span className="text-[#198754] underline">here</span>
                            </p>
                          </div>
                          <UploadButton label="Attach Previous Result" />
                        </div>

                        <div className="relative mt-5 h-0 w-full">
                          <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                            <img
                              alt="Divider Line"
                              className="block size-full max-w-none"
                              src={imgLine2}
                            />
                          </div>
                        </div>

                        <div className="mt-5 flex flex-col gap-2">
                          <div className="text-[15px] sm:text-[16px] text-[#272635]">
                            <p className="leading-[24px]">
                              Provide a personal statement describing why
                              you&apos;re fit for the FabFour Academic Scholarship
                            </p>
                          </div>
                          <div className="text-[13px] sm:text-[14px] text-[rgba(39,38,53,0.5)]">
                            <p className="leading-[20px]">
                              <span>
                                We recommend a minimum of 1000 word document
                                showcasing why we should consider. See example{" "}
                              </span>
                              <span className="text-[#198754] underline">here</span>
                            </p>
                          </div>
                          <UploadButton label="Attach Personal Statement" />
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

          {/* Actions */}
          <div className="flex w-full flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-4">
            <button
              type="button"
              onClick={handleSaveClick}
              className="flex items-center justify-center rounded-lg px-2 py-2 text-[#272635] text-[14px] sm:text-[16px] w-full sm:w-auto"
            >
              <span className="underline leading-none">
                Save To Continue Later
              </span>
            </button>

            {currentStep === 3 ? (
              <button
                type="button"
                disabled={!areGuarantorsValid() || isSubmitting}
                onClick={areGuarantorsValid() && !isSubmitting ? handleSubmit : undefined}
                className={`h-12 sm:h-14 rounded-lg border border-[#2c2c2c] px-5 py-3 text-[15px] sm:text-[16px] text-white w-full sm:w-auto ${
                  areGuarantorsValid() && !isSubmitting
                    ? "bg-[#273125]"
                    : "bg-[#6b7280] cursor-not-allowed"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleContinueClick}
                className="h-12 sm:h-14 rounded-lg border border-[#2c2c2c] bg-[#273125] px-5 py-3 text-[15px] sm:text-[16px] text-white w-full sm:w-auto"
              >
                Continue
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex w-full items-end justify-end px-4 pt-8 sm:px-5">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[12px] sm:text-[14px] text-[rgba(39,38,53,0.5)] sm:justify-end sm:gap-5">
            <div>
              <p className="whitespace-pre">Terms</p>
            </div>
            <div>
              <p className="whitespace-pre">Legal</p>
            </div>
            <div>
              <p className="whitespace-pre">Privacy policy</p>
            </div>
            <div>
              <p className="whitespace-pre">Cookie policy</p>
            </div>
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