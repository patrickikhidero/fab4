"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  clearAuthTokens,
  getAccessToken,
  getDefaultRouteByUserType,
  getStoredUser,
} from "@/lib/auth/storage";

function isStudentProtectedRoute(pathname: string) {
  return pathname.startsWith("/student/dashboard");
}

function isDonorAuthRoute(pathname: string) {
  return pathname === "/donor/signup" || pathname.startsWith("/donor/signup/");
}

function isDonorOnboardingRoute(pathname: string) {
  return pathname === "/donor/onboarding" || pathname.startsWith("/donor/onboarding/");
}

function isStudentAuthRoute(pathname: string) {
  return (
    pathname === "/student/signup" ||
    pathname.startsWith("/student/signup/")
  );
}

function isDonorProtectedRoute(pathname: string) {
  return (
    pathname.startsWith("/donor") &&
    !isDonorAuthRoute(pathname) &&
    !isDonorOnboardingRoute(pathname)
  );
}

function isAdminProtectedRoute(pathname: string) {
  return pathname.startsWith("/admin");
}

function isAuthRoute(pathname: string) {
  return (
    pathname === "/login" ||
    isStudentAuthRoute(pathname) ||
    isDonorAuthRoute(pathname)
  );
}

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = getAccessToken();
    const user = getStoredUser();
    const userType = user?.user_type?.toUpperCase?.() ?? null;

    const authRoute = isAuthRoute(pathname);
    const isProtectedRoute =
      isStudentProtectedRoute(pathname) ||
      isDonorProtectedRoute(pathname) ||
      isAdminProtectedRoute(pathname);

    if (!token) {
      if (isProtectedRoute) {
        router.replace("/login");
      }
      return;
    }

    if (!user) {
      clearAuthTokens();
      if (isProtectedRoute) {
        router.replace("/login");
      }
      return;
    }

    if (authRoute) {
      const destination = getDefaultRouteByUserType(userType);
      // If we can't resolve a real destination (unknown user type),
      // clear stale tokens and let the user log in fresh.
      if (destination === "/" || destination === pathname) {
        clearAuthTokens();
        return;
      }
      router.replace(destination);
      return;
    }

    if (isStudentProtectedRoute(pathname) && userType !== "STUDENT") {
      router.replace(getDefaultRouteByUserType(userType));
      return;
    }

    if (isDonorProtectedRoute(pathname) && userType !== "DONOR") {
      router.replace(getDefaultRouteByUserType(userType));
      return;
    }

    if (isAdminProtectedRoute(pathname) && userType !== "ADMIN") {
      router.replace(getDefaultRouteByUserType(userType));
      return;
    }

    if (
      isDonorProtectedRoute(pathname) &&
      userType === "DONOR" &&
      (!user.first_name?.trim() || !user.last_name?.trim())
    ) {
      router.replace("/donor/onboarding");
      return;
    }
  }, [pathname, router]);

  return <>{children}</>;
}