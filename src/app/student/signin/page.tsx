"use client";

import { LoginForm } from "@/components/modules/student/LoginForm";
import { useLoginMutation } from "@/lib/hooks/useLoginMutation";
import { useToast } from "@/components/ui/toast/ToastProvider";

export default function StudentSignInPage() {
  const { showToast } = useToast();

  const loginMutation = useLoginMutation({
    onSuccess: (data, variables) => {
      console.log("Requesting login link for:", variables.email);
      showToast(
        "success",
        `If your email exists, a login link has been sent to ${variables.email}. Please check your email.`,
        "Login Link Sent"
      );
    },
    onError: (error) => {
      console.error("Failed to send login link:", error);
      showToast(
        "error",
        "Failed to send login link. Please try again.",
        "Login Failed"
      );
    },
  });

  const handleLogin = (email: string) => {
    if (!email) return;
    loginMutation.mutate({ email, user_type: 'STUDENT' });
  };

  return <LoginForm onSubmit={handleLogin} isLoading={loginMutation.isPending} />;
}