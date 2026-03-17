"use client";

import React from "react";
import type { FxSource, SupportedCurrency } from "@/lib/hooks/useFxRate";
import { currencyToFlag } from "@/components/ui/flags";

const SUPPORTED: SupportedCurrency[] = ["USD", "KES", "UGX", "TZS", "NGN", "GHS", "EGP"];

export function CurrencySelect({
  value,
  onChange,
  fxSource, // explicit option (so render can decide context)
  className = "",
}: {
  value: SupportedCurrency;
  onChange: (v: SupportedCurrency) => void;
  fxSource: FxSource;
  className?: string;
}) {
  // fxSource is intentionally unused by the UI; parent uses it to determine preview context.
  void fxSource;

  const Flag = currencyToFlag(value);

  return (
    <div className={`bg-white flex gap-2 items-center justify-center px-2 py-1 relative rounded-[999px] shrink-0 max-w-[140px] ${className}`}>
      <div
        aria-hidden="true"
        className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-0 pointer-events-none rounded-[999px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]"
      />
      <div className="overflow-clip relative shrink-0 size-4 rounded-[3px]">
        <Flag className="block size-full" />
      </div>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SupportedCurrency)}
        className="appearance-none bg-transparent outline-none text-[#272635] text-[14px] sm:text-[16px] pr-4 cursor-pointer"
      >
        {SUPPORTED.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}

