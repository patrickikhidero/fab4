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
  return pathname === "/donor/login" || pathname.startsWith("/donor/login/");
}

function isDonorProtectedRoute(pathname: string) {
  return pathname.startsWith("/donor") && !isDonorAuthRoute(pathname);
}

function isAuthRoute(pathname: string) {
  return (
    pathname === "/login" ||
    pathname === "/student/login" ||
    pathname === "/student/signin" ||
    pathname === "/student/signup" ||
    pathname === "/donor/login"
  );
}

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = getAccessToken();
    const user = getStoredUser();
    const userType = user?.user_type?.toUpperCase?.() ?? null;

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
      router.replace("/login");
      return;
    }

    if (isAuthRoute(pathname)) {
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