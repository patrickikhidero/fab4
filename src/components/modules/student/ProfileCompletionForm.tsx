
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarNavigation } from './SidebarNavigation'
import { MainFormArea } from './MainFormArea'
import { ApplicationStatusSection } from './ApplicationStatusSection'
import { ApprovedApplicationStatus } from './ApprovedApplicationStatus'

export function ProfileCompletionForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [activeSection, setActiveSection] = useState<'application' | 'status' | 'campaign'>('application')
  const [applicationStatus, setApplicationStatus] = useState<'under-review' | 'approved'>('under-review')
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '',
    country: '', state: '', address: '', identification: '',
    
    // Step 2: Provide Evidence
    applicationType: 'newly-admitted', // Default to newly admitted
    // Newly admitted fields
    school: '', course: '', courseDuration: '', institutionCountry: '',
    institutionState: '', admissionLetter: null as File | null,
    personalStatement: null as File | null,
    // Returning student fields
    previousSchool: '', previousCourse: '', previousGPA: '', previousYear: '',
    reasonForLeaving: '', academicTranscript: null as File | null,
    withdrawalLetter: null as File | null, reenrollmentLetter: null as File | null,
    characterReference: null as File | null,
    
    // Step 3: Provide Guarantors
    guarantors: [
      {
        id: 'guarantor-1', firstName: 'Koulibaly', lastName: 'Koffi',
        email: 'example@email.com', phone: '874950345', country: '',
        state: '', attestationLetter: null
      }
    ] as Array<{
      id: string; firstName: string; lastName: string; email: string;
      phone: string; country: string; state: string; attestationLetter: File | null;
    }>
  })

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

  const handleSubmit = () => {
    // Handle successful submission
    console.log('Application submitted successfully:', formData)
    // You can add additional logic here like redirecting to a success page
    // or showing additional confirmation messages
  }

  const handleNavigationChange = (section: 'application' | 'status' | 'campaign') => {
    if (section === 'campaign') {
      router.push('/student/dashboard/campaign')
    } else {
      setActiveSection(section)
    }
  }

  const handleStatusChange = (status: 'under-review' | 'approved') => {
    setApplicationStatus(status)
  }

  return (
    <div className="flex min-h-screen bg-[#eceee4]">
      <SidebarNavigation 
        currentStep={currentStep}
        userData={{
          name: 'Influence',
          email: 'talktome@fabfour.org',
          avatar: '/images/avatars/default-avatar.png'
        }}
        onNavigationChange={handleNavigationChange}
        activeSection={activeSection}
      />
      {activeSection === 'status' ? (
        <div className="flex-1 p-8">
          {applicationStatus === 'approved' ? (
            <ApprovedApplicationStatus />
          ) : (
            <ApplicationStatusSection />
          )}
        </div>
      ) : (
        <MainFormArea
          currentStep={currentStep}
          formData={formData}
          onFormChange={handleFormChange}
          onGuarantorsChange={handleGuarantorsChange}
          onContinue={handleContinue}
          onSave={handleSave}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}