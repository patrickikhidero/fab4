import React from "react";
import type { SupportedCurrency } from "@/lib/hooks/useFxRate";

type FlagProps = { className?: string; title?: string };

function Svg({ className, title, children }: FlagProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}
      <rect x="0" y="0" width="24" height="24" rx="4" fill="#fff" />
      {children}
    </svg>
  );
}

export function FlagKenya(p: FlagProps) {
  return (
    <Svg {...p} title={p.title ?? "Kenya"}>
      <rect x="0" y="0" width="24" height="8" fill="#111827" />
      <rect x="0" y="8" width="24" height="8" fill="#dc2626" />
      <rect x="0" y="16" width="24" height="8" fill="#16a34a" />
      <rect x="0" y="7.25" width="24" height="1.5" fill="#ffffff" opacity="0.9" />
      <rect x="0" y="15.25" width="24" height="1.5" fill="#ffffff" opacity="0.9" />
      {/* simple shield */}
      <ellipse cx="12" cy="12" rx="3.2" ry="5" fill="#111827" opacity="0.9" />
      <ellipse cx="12" cy="12" rx="2.0" ry="4.2" fill="#dc2626" opacity="0.95" />
    </Svg>
  );
}

export function FlagUganda(p: FlagProps) {
  return (
    <Svg {...p} title={p.title ?? "Uganda"}>
      <rect x="0" y="0" width="24" height="4" fill="#111827" />
      <rect x="0" y="4" width="24" height="4" fill="#f59e0b" />
      <rect x="0" y="8" width="24" height="4" fill="#dc2626" />
      <rect x="0" y="12" width="24" height="4" fill="#111827" />
      <rect x="0" y="16" width="24" height="4" fill="#f59e0b" />
      <rect x="0" y="20" width="24" height="4" fill="#dc2626" />
      <circle cx="12" cy="12" r="3.5" fill="#ffffff" opacity="0.9" />
      <circle cx="12" cy="12" r="1.6" fill="#111827" opacity="0.85" />
    </Svg>
  );
}

export function FlagTanzania(p: FlagProps) {
  return (
    <Svg {...p} title={p.title ?? "Tanzania"}>
      <rect x="0" y="0" width="24" height="24" fill="#16a34a" />
      <polygon points="24,0 24,24 0,24" fill="#1d4ed8" />
      {/* diagonal band */}
      <polygon points="-2,6 6,-2 26,18 18,26" fill="#ffffff" opacity="0.85" />
      <polygon points="-2,8 8,-2 26,16 16,26" fill="#111827" opacity="0.9" />
      <polygon points="0,8 8,0 24,16 16,24" fill="#f59e0b" opacity="0.7" />
    </Svg>
  );
}

export function FlagNigeria(p: FlagProps) {
  return (
    <Svg {...p} title={p.title ?? "Nigeria"}>
      <rect x="0" y="0" width="8" height="24" fill="#16a34a" />
      <rect x="8" y="0" width="8" height="24" fill="#ffffff" />
      <rect x="16" y="0" width="8" height="24" fill="#16a34a" />
    </Svg>
  );
}

export function FlagGhana(p: FlagProps) {
  return (
    <Svg {...p} title={p.title ?? "Ghana"}>
      <rect x="0" y="0" width="24" height="8" fill="#dc2626" />
      <rect x="0" y="8" width="24" height="8" fill="#f59e0b" />
      <rect x="0" y="16" width="24" height="8" fill="#16a34a" />
      {/* star */}
      <polygon
        points="12,9.8 13.1,12.1 15.6,12.3 13.6,13.9 14.2,16.3 12,15 9.8,16.3 10.4,13.9 8.4,12.3 10.9,12.1"
        fill="#111827"
        opacity="0.85"
      />
    </Svg>
  );
}

export function FlagEgypt(p: FlagProps) {
  return (
    <Svg {...p} title={p.title ?? "Egypt"}>
      <rect x="0" y="0" width="24" height="8" fill="#dc2626" />
      <rect x="0" y="8" width="24" height="8" fill="#ffffff" />
      <rect x="0" y="16" width="24" height="8" fill="#111827" />
      <circle cx="12" cy="12" r="1.4" fill="#f59e0b" opacity="0.8" />
    </Svg>
  );
}

export function FlagUSA(p: FlagProps) {
  return (
    <Svg {...p} title={p.title ?? "United States"}>
      <rect x="0" y="0" width="24" height="24" fill="#ffffff" />
      {Array.from({ length: 7 }).map((_, i) => (
        <rect key={i} x="0" y={i * 3.4} width="24" height="1.7" fill="#dc2626" opacity="0.85" />
      ))}
      <rect x="0" y="0" width="10.5" height="9.5" fill="#1d4ed8" opacity="0.9" />
      <circle cx="2.5" cy="2.5" r="0.6" fill="#ffffff" opacity="0.9" />
      <circle cx="5.0" cy="2.5" r="0.6" fill="#ffffff" opacity="0.9" />
      <circle cx="7.5" cy="2.5" r="0.6" fill="#ffffff" opacity="0.9" />
      <circle cx="3.75" cy="4.6" r="0.6" fill="#ffffff" opacity="0.9" />
      <circle cx="6.25" cy="4.6" r="0.6" fill="#ffffff" opacity="0.9" />
      <circle cx="2.5" cy="6.7" r="0.6" fill="#ffffff" opacity="0.9" />
      <circle cx="5.0" cy="6.7" r="0.6" fill="#ffffff" opacity="0.9" />
      <circle cx="7.5" cy="6.7" r="0.6" fill="#ffffff" opacity="0.9" />
    </Svg>
  );
}

export function currencyToFlag(currency: SupportedCurrency) {
  switch (currency) {
    case "KES":
      return FlagKenya;
    case "UGX":
      return FlagUganda;
    case "TZS":
      return FlagTanzania;
    case "NGN":
      return FlagNigeria;
    case "GHS":
      return FlagGhana;
    case "EGP":
      return FlagEgypt;
    case "USD":
    default:
      return FlagUSA;
  }
}

