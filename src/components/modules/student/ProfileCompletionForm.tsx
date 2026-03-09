"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
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
    course_state?: string | null;
    course_country?: string | null;
    user?: number;
  } | null;
  wallet?: unknown;
};

export function ProfileCompletionForm() {
  const router = useRouter();

  const storedUser = (getStoredUser() as StoredMe | null) ?? null;
  const storedProfile = storedUser?.student_profile ?? null;

  const hasProfile = !!storedProfile;
  const isVerified = !!storedProfile?.is_verified;

  const [activeSection, setActiveSection] =
    useState<DashboardSection>("application");

  const [currentStep, setCurrentStep] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [profileId, setProfileId] = useState<string | null>(
    storedProfile?.id ? String(storedProfile.id) : null
  );

  const [uploadedDocuments, setUploadedDocuments] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    firstName: storedProfile?.first_name ?? storedUser?.first_name ?? "",
    lastName: storedProfile?.last_name ?? storedUser?.last_name ?? "",
    email: storedProfile?.email ?? storedUser?.email ?? "",
    phone: storedProfile?.phone_number ?? "",
    dateOfBirth: storedProfile?.date_of_birth ?? "",
    country: storedProfile?.country ?? "",
    state: storedProfile?.state ?? "",
    address: storedProfile?.residential_address ?? "",
    identification: storedProfile?.verification_means ?? "",

    applicationType:
      storedProfile?.student_entry === "RETURNING_STUDENT"
        ? "returning-student"
        : "newly-admitted",

    school: storedProfile?.institution ?? "",
    course: storedProfile?.course ?? "",
    courseDuration: storedProfile?.course_duration ?? "",
    institutionCountry: storedProfile?.course_country ?? "",
    institutionState: storedProfile?.course_state ?? "",
    admissionLetter: null as File | null,
    personalStatement: null as File | null,

    previousSchool: "",
    previousCourse: "",
    previousGPA: "",
    previousYear: "",
    reasonForLeaving: "",
    academicTranscript: null as File | null,
    withdrawalLetter: null as File | null,
    reenrollmentLetter: null as File | null,
    characterReference: null as File | null,

    guarantors: [
      {
        id: "guarantor-1",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
        state: "",
        attestationLetter: null as File | null,
      },
    ] as Array<{
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      country: string;
      state: string;
      attestationLetter: File | null;
    }>,
  });

  const userData = useMemo(() => {
    const nameFromUser = `${storedUser?.first_name ?? ""} ${storedUser?.last_name ?? ""}`.trim();
    const nameFromProfile = `${storedProfile?.first_name ?? ""} ${storedProfile?.last_name ?? ""}`.trim();

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

  const handleGuarantorsChange = (
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
  ) => {
    setFormData((prev) => ({
      ...prev,
      guarantors,
    }));
  };

  const persistProfileToLocalStorage = (incomingProfile: Record<string, any>) => {
    const latestUser = ((getStoredUser() as StoredMe | null) ?? storedUser ?? {}) as StoredMe;

    setAuthTokens({
      user: {
        ...latestUser,
        first_name:
          latestUser.first_name ??
          incomingProfile.first_name ??
          latestUser.student_profile?.first_name ??
          null,
        last_name:
          latestUser.last_name ??
          incomingProfile.last_name ??
          latestUser.student_profile?.last_name ??
          null,
        email: latestUser.email ?? incomingProfile.email ?? "",
        student_profile: {
          ...(latestUser.student_profile ?? {}),
          ...incomingProfile,
        },
      },
    });
  };

  const handleContinue = async () => {
    setError(null);

    if (currentStep === 1) {
      setIsLoading(true);
      try {
        const profileData = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          date_of_birth: formData.dateOfBirth,
          country: formData.country,
          state: formData.state,
          address: formData.address,
          identification: formData.identification,

          application_type: formData.applicationType as
            | "newly-admitted"
            | "returning-student",
          school: formData.school,
          course: formData.course,
          course_duration: formData.courseDuration,
          institution_country: formData.institutionCountry,
          institution_state: formData.institutionState,

          previous_school: formData.previousSchool,
          previous_course: formData.previousCourse,
          previous_gpa: formData.previousGPA,
          previous_year: formData.previousYear,
          reason_for_leaving: formData.reasonForLeaving,
        };

        const response = await submitStudentProfile(profileData);

        const nextProfileId = String(response.id);
        setProfileId(nextProfileId);

        persistProfileToLocalStorage({
          id: response.id,
          is_verified: false,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone_number: formData.phone,
          date_of_birth: formData.dateOfBirth,
          country: formData.country,
          state: formData.state,
          residential_address: formData.address,
          verification_means: formData.identification,
          institution: formData.school,
          course: formData.course,
          course_duration: formData.courseDuration,
          course_country: formData.institutionCountry,
          course_state: formData.institutionState,
          student_entry:
            formData.applicationType === "returning-student"
              ? "RETURNING_STUDENT"
              : "NEWLY_ADMITTED",
        });

        setCurrentStep(2);
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
            err?.response?.data?.detail ||
            "Failed to submit profile. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
      return;
    }

    if (currentStep === 2) {
      setIsLoading(true);
      try {
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
          if (doc.file && profileId) {
            const res = await uploadStudentDocument(
              doc.file,
              doc.docType,
              profileId
            );
            return String(res.id);
          }
          return null;
        });

        const uploadedIds = await Promise.all(uploadPromises);
        setUploadedDocuments(uploadedIds.filter(Boolean) as string[]);

        setCurrentStep(3);
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
            err?.response?.data?.detail ||
            "Failed to upload documents. Please try again."
        );
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
    setIsLoading(true);

    try {
      if (!profileId && currentStep === 1) {
        const profileData = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          date_of_birth: formData.dateOfBirth,
          country: formData.country,
          state: formData.state,
          address: formData.address,
          identification: formData.identification,
          application_type: formData.applicationType as
            | "newly-admitted"
            | "returning-student",
          school: formData.school,
          course: formData.course,
          course_duration: formData.courseDuration,
          institution_country: formData.institutionCountry,
          institution_state: formData.institutionState,
          previous_school: formData.previousSchool,
          previous_course: formData.previousCourse,
          previous_gpa: formData.previousGPA,
          previous_year: formData.previousYear,
          reason_for_leaving: formData.reasonForLeaving,
        };

        const response = await submitStudentProfile(profileData);

        const nextProfileId = String(response.id);
        setProfileId(nextProfileId);

        persistProfileToLocalStorage({
          id: response.id,
          is_verified: false,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone_number: formData.phone,
          date_of_birth: formData.dateOfBirth,
          country: formData.country,
          state: formData.state,
          residential_address: formData.address,
          verification_means: formData.identification,
          institution: formData.school,
          course: formData.course,
          course_duration: formData.courseDuration,
          course_country: formData.institutionCountry,
          course_state: formData.institutionState,
          student_entry:
            formData.applicationType === "returning-student"
              ? "RETURNING_STUDENT"
              : "NEWLY_ADMITTED",
        });
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.detail ||
          "Failed to save. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!profileId) {
      setError("Please complete previous steps first.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      for (const guarantor of formData.guarantors) {
        const guarantorData = {
          first_name: guarantor.firstName,
          last_name: guarantor.lastName,
          email: guarantor.email,
          phone: guarantor.phone,
          country: guarantor.country,
          state: guarantor.state,
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

      const latestUser = ((getStoredUser() as StoredMe | null) ?? storedUser ?? {}) as StoredMe;

      setAuthTokens({
        user: {
          ...latestUser,
          student_profile: {
            ...(latestUser.student_profile ?? {}),
            id: profileId,
            is_verified: false,
          },
        },
      });

      router.refresh();
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.detail ||
          "Failed to submit application. Please try again."
      );
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
    if (!hasProfile) {
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

    if (isVerified) {
      return (
        <div className="p-4 sm:p-6 lg:p-8">
          <ApprovedApplicationStatus />
        </div>
      );
    }

    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <ApplicationStatusSection />
      </div>
    );
  };

  return (
    <div className="min-h-full min-w-0">
      <div className="w-full min-w-0">
        {activeSection === "application" ? (
          renderApplicationPage()
        ) : (
          <div className="p-4 sm:p-6 lg:p-8 text-[#272635]">
            <div className="text-[15px] sm:text-[16px]">Select a section.</div>
          </div>
        )}
      </div>

      {error && (
        <div className="px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8">
          <div className="rounded-lg border border-red-200 bg-white px-4 py-3 text-sm text-red-700 break-words">
            {error}
          </div>
        </div>
      )}
    </div>
  );
}