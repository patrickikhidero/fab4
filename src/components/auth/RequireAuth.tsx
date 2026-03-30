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

function isStudentAuthRoute(pathname: string) {
  return (
    pathname === "/student/signup" ||
    pathname.startsWith("/student/signup/")
  );
}

function isDonorProtectedRoute(pathname: string) {
  return pathname.startsWith("/donor") && !isDonorAuthRoute(pathname);
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
      isStudentProtectedRoute(pathname) || isDonorProtectedRoute(pathname);

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
      router.replace(getDefaultRouteByUserType(userType));
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
  }, [pathname, router]);

  return <>{children}</>;
}