
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/toast/ToastProvider";
import { MainFormArea } from "./MainFormArea";
import { ApplicationStatusSection } from "./ApplicationStatusSection";
import { ApprovedApplicationStatus } from "./ApprovedApplicationStatus";
import {
  submitStudentProfile,
  uploadStudentDocument,
  submitGuarantor,
} from "@/lib/student/application";
import { getStoredUser, setAuthTokens } from "@/lib/auth/storage";

type DashboardSection = "application" | "campaign" | "wallet" | "conversations";

type StoredMe = {
  id?: number;
  email?: string;
  first_name?: string | null;
  last_name?: string | null;
  photo?: string | null;
  user_type?: string | null;
  student_profile?: {
    id?: number | string;
    is_verified?: boolean;
    is_flagged?: boolean;
    first_name?: string | null;
    last_name?: string | null;
    email?: string | null;
    phone_number?: string | null;
    date_of_birth?: string | null;
    country?: string | null;
    state?: string | null;
    residential_address?: string | null;
    verification_means?: string | null;
    student_entry?: string | null;
    institution?: string | null;
    course?: string | null;
    course_duration?: string | null;
    level?: string | null;
    course_state?: string | null;
    course_country?: string | null;
    application_status?: string | null;
    application_started_at?: string | null;
    application_terminated_at?: string | null;
    reminder_sequence_cancelled?: boolean;
    user?: number;
  } | null;
  wallet?: unknown;
};

type GuarantorForm = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  attestationLetter: File | null;
};

type ApplicationFormData = {
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

  guarantors: GuarantorForm[];
};

function mapStudentEntry(value: string) {
  switch (value) {
    case "returning-student":
      return "RETURNING_STUDENT";
    case "newly-admitted":
    default:
      return "NEWLY_ADMITTED";
  }
}

function mapIdentification(value: string) {
  return value;
}

function mapStoredIdentification(value?: string | null) {
  return value ?? "";
}

function buildStudentProfilePayload(formData: ApplicationFormData) {
  return {
    first_name: formData.firstName.trim(),
    last_name: formData.lastName.trim(),
    email: formData.email.trim(),
    phone_number: formData.phone.trim(),
    date_of_birth: formData.dateOfBirth,
    country: formData.country.trim(),
    state: formData.state.trim(),
    residential_address: formData.address.trim(),
    verification_means: mapIdentification(formData.identification),
    student_entry: mapStudentEntry(formData.applicationType),
    institution: formData.school.trim(),
    course: formData.course.trim(),
    course_duration: formData.courseDuration.trim(),
    level: formData.level.trim(),
    course_state: formData.institutionState.trim(),
    course_country: formData.institutionCountry.trim(),
  };
}

function isBlank(value?: string | null) {
  return !value || !String(value).trim();
}

function isStudentProfileIncomplete(profile?: StoredMe["student_profile"]) {
  if (!profile) return true;

  const requiredFields = [
    profile.first_name,
    profile.last_name,
    profile.email,
    profile.phone_number,
    profile.date_of_birth,
    profile.country,
    profile.state,
    profile.residential_address,
    profile.verification_means,
    profile.student_entry,
    profile.institution,
    profile.course,
    profile.course_duration,
    profile.level,
    profile.course_state,
    profile.course_country,
  ];

  return requiredFields.some(isBlank);
}

export function ProfileCompletionForm() {
  const router = useRouter();
  const { showToast } = useToast();

  const storedUser = (getStoredUser() as StoredMe | null) ?? null;
  const storedProfile = storedUser?.student_profile ?? null;

  const isVerified = !!storedProfile?.is_verified;
  const applicationStatus = storedProfile?.application_status ?? null;
  const profileIncomplete = isStudentProfileIncomplete(storedProfile);

  const shouldShowForm = !isVerified && profileIncomplete;
  const shouldShowApproved = isVerified;
  const shouldShowPendingStatus = !isVerified && !profileIncomplete;

  const [activeSection, setActiveSection] =
    useState<DashboardSection>("application");

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [profileId, setProfileId] = useState<string | null>(
    storedProfile?.id ? String(storedProfile.id) : null
  );

  const [uploadedDocuments, setUploadedDocuments] = useState<string[]>([]);

  const [formData, setFormData] = useState<ApplicationFormData>({
    firstName: storedProfile?.first_name ?? storedUser?.first_name ?? "",
    lastName: storedProfile?.last_name ?? storedUser?.last_name ?? "",
    email: storedProfile?.email ?? storedUser?.email ?? "",
    phone: storedProfile?.phone_number ?? "",
    dateOfBirth: storedProfile?.date_of_birth ?? "",
    country: storedProfile?.country ?? "",
    state: storedProfile?.state ?? "",
    address: storedProfile?.residential_address ?? "",
    identification: mapStoredIdentification(storedProfile?.verification_means),

    applicationType:
      storedProfile?.student_entry === "RETURNING_STUDENT"
        ? "returning-student"
        : "newly-admitted",

    school: storedProfile?.institution ?? "",
    course: storedProfile?.course ?? "",
    courseDuration: storedProfile?.course_duration ?? "",
    level: storedProfile?.level ?? "",
    institutionCountry: storedProfile?.course_country ?? "",
    institutionState: storedProfile?.course_state ?? "",

    admissionLetter: null,
    personalStatement: null,

    previousSchool: "",
    previousCourse: "",
    previousGPA: "",
    previousYear: "",
    reasonForLeaving: "",
    academicTranscript: null,
    withdrawalLetter: null,
    reenrollmentLetter: null,
    characterReference: null,

    guarantors: [
      {
        id: "guarantor-1",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
        state: "",
        attestationLetter: null,
      },
    ],
  });

  const userData = useMemo(() => {
    const nameFromUser =
      `${storedUser?.first_name ?? ""} ${storedUser?.last_name ?? ""}`.trim();
    const nameFromProfile =
      `${storedProfile?.first_name ?? ""} ${storedProfile?.last_name ?? ""}`.trim();

    return {
      name: nameFromUser || nameFromProfile || storedUser?.email || "User",
      email: storedUser?.email || storedProfile?.email || "",
      avatar: storedUser?.photo || "",
    };
  }, [storedProfile, storedUser]);

  const handleFormChange = (field: string, value: string | File | null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGuarantorsChange = (guarantors: GuarantorForm[]) => {
    setFormData((prev) => ({
      ...prev,
      guarantors,
    }));
  };

  const persistProfileToLocalStorage = (
    incomingProfile: Record<string, unknown>
  ) => {
    const latestUser = ((getStoredUser() as StoredMe | null) ??
      storedUser ??
      {}) as StoredMe;

    setAuthTokens({
      user: {
        ...latestUser,
        first_name:
          (incomingProfile.first_name as string | null | undefined) ??
          latestUser.first_name ??
          latestUser.student_profile?.first_name ??
          null,
        last_name:
          (incomingProfile.last_name as string | null | undefined) ??
          latestUser.last_name ??
          latestUser.student_profile?.last_name ??
          null,
        email:
          (incomingProfile.email as string | undefined) ??
          latestUser.email ??
          "",
        student_profile: {
          ...(latestUser.student_profile ?? {}),
          ...incomingProfile,
        },
      },
    });
  };

  const getApiErrorMessage = (err: any, fallback: string) => {
    const firstValidationError = err?.response?.data?.errors?.[0]?.detail;
    return (
      firstValidationError ||
      err?.response?.data?.message ||
      err?.response?.data?.detail ||
      fallback
    );
  };

  const saveOrCreateProfile = async () => {
    const payload: any = buildStudentProfilePayload(formData);
    const response = await submitStudentProfile(payload);
    const nextProfileId = String(response.id);

    setProfileId(nextProfileId);

    persistProfileToLocalStorage({
      id: response.id,
      is_verified: false,
      application_status:
        response.application_status ??
        storedProfile?.application_status ??
        "IN_PROGRESS",
      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email,
      phone_number: payload.phone_number,
      date_of_birth: payload.date_of_birth,
      country: payload.country,
      state: payload.state,
      residential_address: payload.residential_address,
      verification_means: payload.verification_means,
      student_entry: payload.student_entry,
      institution: payload.institution,
      course: payload.course,
      course_duration: payload.course_duration,
      level: payload.level,
      course_country: payload.course_country,
      course_state: payload.course_state,
    });

    return nextProfileId;
  };

  const handleContinue = async () => {
    setError(null);

    if (currentStep === 1) {
      setCurrentStep(2);
      return;
    }

    if (currentStep === 2) {
      setIsLoading(true);

      try {
        const nextProfileId = await saveOrCreateProfile();

        const documents: Array<{ file: File | null; docType: string }> = [];

        if (formData.applicationType === "newly-admitted") {
          if (formData.admissionLetter) {
            documents.push({
              file: formData.admissionLetter,
              docType: "admission_letter",
            });
          }

          if (formData.personalStatement) {
            documents.push({
              file: formData.personalStatement,
              docType: "personal_statement",
            });
          }
        } else {
          if (formData.academicTranscript) {
            documents.push({
              file: formData.academicTranscript,
              docType: "academic_transcript",
            });
          }

          if (formData.withdrawalLetter) {
            documents.push({
              file: formData.withdrawalLetter,
              docType: "withdrawal_letter",
            });
          }

          if (formData.reenrollmentLetter) {
            documents.push({
              file: formData.reenrollmentLetter,
              docType: "reenrollment_letter",
            });
          }

          if (formData.characterReference) {
            documents.push({
              file: formData.characterReference,
              docType: "character_reference",
            });
          }
        }

        const uploadPromises = documents.map(async (doc) => {
          if (doc.file && nextProfileId) {
            const res = await uploadStudentDocument(
              doc.file,
              doc.docType,
              nextProfileId
            );
            return String(res.id);
          }
          return null;
        });

        const uploadedIds = await Promise.all(uploadPromises);
        setUploadedDocuments(uploadedIds.filter(Boolean) as string[]);

        showToast(
          "success",
          "Your profile details were saved successfully.",
          "Profile saved"
        );

        setCurrentStep(3);
      } catch (err: any) {
        const apiError = getApiErrorMessage(
          err,
          "Failed to save profile and upload documents."
        );
        setError(apiError);
        showToast("error", apiError, "Unable to continue");
      } finally {
        setIsLoading(false);
      }

      return;
    }

    if (currentStep < 3) {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleSave = async () => {
    setError(null);

    if (currentStep === 1) {
      showToast(
        "info",
        "Please complete the academic information in step 2 before saving.",
        "More information required"
      );
      return;
    }

    setIsLoading(true);

    try {
      await saveOrCreateProfile();

      showToast(
        "success",
        "Your application progress has been saved.",
        "Saved successfully"
      );
    } catch (err: any) {
      const apiError = getApiErrorMessage(
        err,
        "Failed to save. Please try again."
      );
      setError(apiError);
      showToast("error", apiError, "Save failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!profileId) {
      const msg = "Please complete the previous steps first.";
      setError(msg);
      showToast("warning", msg, "Incomplete application");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      for (const guarantor of formData.guarantors) {
        const guarantorData = {
          first_name: guarantor.firstName.trim(),
          last_name: guarantor.lastName.trim(),
          email: guarantor.email.trim(),
          phone: guarantor.phone.trim(),
          country: guarantor.country.trim(),
          state: guarantor.state.trim(),
          student_profile: profileId,
        };

        await submitGuarantor(guarantorData);

        if (guarantor.attestationLetter) {
          await uploadStudentDocument(
            guarantor.attestationLetter,
            "attestation_letter",
            profileId
          );
        }
      }

      const latestUser = ((getStoredUser() as StoredMe | null) ??
        storedUser ??
        {}) as StoredMe;

      setAuthTokens({
        user: {
          ...latestUser,
          student_profile: {
            ...(latestUser.student_profile ?? {}),
            id: profileId,
            is_verified: false,
            application_status:
              latestUser.student_profile?.application_status ?? "IN_PROGRESS",
          },
        },
      });

      showToast(
        "success",
        "Your application has been submitted successfully.",
        "Application submitted"
      );

      router.refresh();
    } catch (err: any) {
      const apiError = getApiErrorMessage(
        err,
        "Failed to submit application. Please try again."
      );
      setError(apiError);
      showToast("error", apiError, "Submission failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigationChange = (section: DashboardSection) => {
    if (section === "campaign") {
      router.push("/student/dashboard/campaign");
      return;
    }
    if (section === "wallet") {
      router.push("/student/dashboard/wallet");
      return;
    }
    if (section === "conversations") {
      router.push("/student/dashboard/conversations");
      return;
    }
    setActiveSection(section);
  };

  const renderApplicationPage = () => {
    if (shouldShowForm) {
      return (
        <MainFormArea
          currentStep={currentStep}
          formData={formData}
          onFormChange={handleFormChange}
          onGuarantorsChange={handleGuarantorsChange}
          onContinue={handleContinue}
          onSave={handleSave}
          onSubmit={handleSubmit}
        />
      );
    }

    if (shouldShowApproved) {
      return (
        <div className="p-4 sm:p-6 lg:p-8">
          <ApprovedApplicationStatus />
        </div>
      );
    }

    if (shouldShowPendingStatus) {
      return (
        <div className="p-4 sm:p-6 lg:p-8">
          <ApplicationStatusSection />
        </div>
      );
    }

    return (
      <MainFormArea
        currentStep={currentStep}
        formData={formData}
        onFormChange={handleFormChange}
        onGuarantorsChange={handleGuarantorsChange}
        onContinue={handleContinue}
        onSave={handleSave}
        onSubmit={handleSubmit}
      />
    );
  };

  return (
    <div className="min-h-full min-w-0">
      <div className="w-full min-w-0">
        {activeSection === "application" ? (
          renderApplicationPage()
        ) : (
          <div className="p-4 text-[#272635] sm:p-6 lg:p-8">
            <div className="text-[15px] sm:text-[16px]">Select a section.</div>
          </div>
        )}
      </div>

      {error && (
        <div className="px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8">
          <div className="break-words rounded-lg border border-red-200 bg-white px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        </div>
      )}
    </div>
  );
}