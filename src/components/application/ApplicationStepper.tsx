"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronsRight } from "lucide-react";

const steps = [
  { label: "Tell us about yourself", href: "/application/tell-us-about-yourself" },
  { label: "Provide evidence", href: "/application/provide-evidence" },
  { label: "Provide Guarantors", href: "/application/provide-guarantors" },
];

export function ApplicationStepper() {
  const pathname = usePathname();

  return (
    <div className="mt-6 flex items-center gap-8 text-xs">
      {steps.map((s) => {
        const active = pathname === s.href;

        return (
          <Link
            key={s.href}
            href={s.href}
            className={`inline-flex items-center gap-2 transition ${
              active
                ? "text-[var(--color-primary-text)]"
                : "text-[var(--color-muted)]"
            }`}
          >
            <ChevronsRight
              size={16}
              strokeWidth={2.5}
              className={
                active
                  ? "text-[var(--color-accent)]"
                  : "text-[var(--color-muted)] opacity-40"
              }
            />

            <span className={active ? "font-medium" : ""}>
              {s.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
