"use client";

import { useState } from "react";
import { LoginForm } from "@/components/modules/student/LoginForm";
import { login } from "@/lib/api/auth";

export default function StudentSignInPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email: string) => {
    if (!email) return;

    setIsLoading(true);

    try {
      console.log("Requesting login link for:", email);
      await login({ email });
      alert(`If your email exists, a login link has been sent to ${email}. Please check your email.`);

    } catch (error) {
      console.error("Failed to send login link:", error);
      alert("Failed to send login link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return <LoginForm onSubmit={handleLogin} isLoading={isLoading} />;
}