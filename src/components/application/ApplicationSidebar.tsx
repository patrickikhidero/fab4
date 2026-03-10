import Image from "next/image";
import { FileText } from "lucide-react";

export function ApplicationSidebar() {
  return (
    <aside className="h-screen sticky top-0 flex flex-col pt-10">
      {/* Top */}
      <div className="text-sm font-semibold tracking-wide text-[var(--color-primary-text)] opacity-60">
        LOGO
      </div>

      <div className="mt-10">
        <div className="text-sm text-[var(--color-primary-text)]">
          Welcome back,
          <div className="text-[var(--color-muted)]">Influence!</div>
        </div>

        <button className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-xs text-[var(--color-primary-text)]">
          <FileText size={14} className="opacity-70" />
          Your Application
        </button>
      </div>

      {/* Spacer pushes profile to bottom */}
      <div className="flex-1" />

      {/* Bottom pinned profile */}
      <div className="pb-6">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 overflow-hidden rounded-full bg-black/5">
            <Image
              src="/assets/auth/student.png"
              alt=""
              width={36}
              height={36}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="min-w-0">
            <div className="text-xs text-[var(--color-primary-text)]">
              Influence
            </div>
            <div className="truncate text-[11px] text-[var(--color-muted)]">
              talktome@example.com
            </div>
          </div>
        </div>

        <div className="mt-5 h-px w-full bg-[var(--color-border)]" />

        <div className="mt-4 text-[10px] text-[var(--color-muted)] opacity-80">
          © 2024 FabFour Foundation. All rights reserved.
        </div>
      </div>
    </aside>
  );
}
