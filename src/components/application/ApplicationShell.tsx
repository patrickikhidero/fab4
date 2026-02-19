import Image from "next/image";
import { ApplicationSidebar } from "./ApplicationSidebar";

export function ApplicationShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* background rays */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <Image
          src="/assets/auth/rays.png"
          alt=""
          fill
          priority
          className="object-cover opacity-45 mix-blend-soft-light"
        />
      </div>

      {/* Layout: sidebar fixed, main scrolls */}
      <div className="relative z-[10] mx-auto max-w-[1440px] px-6">
        <div className="grid min-h-screen gap-10 md:grid-cols-[260px_1fr]">
          {/* Fixed sidebar */}
          <div className="hidden md:block">
            <ApplicationSidebar />
          </div>

          {/* Main content scrolls */}
          <main className="min-h-screen overflow-y-auto py-10">
            <div className="flex justify-center">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
