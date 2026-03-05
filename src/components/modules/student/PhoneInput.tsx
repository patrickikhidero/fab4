// interface PhoneInputProps {
//   label: string
//   value: string
//   onChange: (value: string) => void
//   required?: boolean
// }

// export function PhoneInput({ 
//   label, 
//   value, 
//   onChange, 
//   required = false 
// }: PhoneInputProps) {
//   return (
//     <div className="basis-0 content-stretch flex flex-col gap-2 grow items-start justify-start min-h-px min-w-px relative shrink-0">
//       <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#272635] text-[16px]" style={{ width: "min-content" }}>
//         <p className="leading-[1.4]">{label}{required && ' *'}</p>
//       </div>
//       <div className="bg-[#ffffff] box-border content-stretch flex gap-2 h-12 items-center justify-start min-w-60 pl-4 pr-3 py-3 relative rounded-lg shrink-0 w-full">
//         <div aria-hidden="true" className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]" />
        
//         {/* Country Code Selector */}
//         <div className="bg-[#ffffff] box-border content-stretch flex gap-2 items-center justify-center px-2 py-1.5 relative rounded-2xl shrink-0">
//           <div aria-hidden="true" className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-0 pointer-events-none rounded-2xl" />
//           <div className="overflow-clip relative shrink-0 size-4" data-name="Media Icons/Country">
//             {/* US Flag Icon - Simplified for now */}
//             <div className="w-4 h-4 bg-blue-600 rounded-sm flex items-center justify-center">
//               <div className="text-white text-xs font-bold">US</div>
//             </div>
//           </div>
//           <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[14px] text-nowrap">
//             <p className="leading-none whitespace-pre">+1</p>
//           </div>
//         </div>
        
//         {/* Phone Number Input */}
//         <input
//           type="tel"
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           placeholder="Phone number"
//           className="basis-0 font-['Neue_Montreal:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#93939a] text-[14px] bg-transparent border-none outline-none w-full"
//         />
//       </div>
//     </div>
//   )
// }

'use client'

import React, { useMemo, useState } from "react"

interface PhoneInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  required?: boolean
}

type CountryOpt = { code: string; dial: string; label: string }

const COUNTRY_CODES: CountryOpt[] = [
  // Africa (popular + extras)
  { code: "NG", dial: "+234", label: "Nigeria" },
  { code: "KE", dial: "+254", label: "Kenya" },
  { code: "ZA", dial: "+27", label: "South Africa" },
  { code: "GH", dial: "+233", label: "Ghana" },
  { code: "TZ", dial: "+255", label: "Tanzania" },
  { code: "UG", dial: "+256", label: "Uganda" },
  { code: "RW", dial: "+250", label: "Rwanda" },
  { code: "ET", dial: "+251", label: "Ethiopia" },
  { code: "CM", dial: "+237", label: "Cameroon" },
  { code: "SN", dial: "+221", label: "Senegal" },
  { code: "CI", dial: "+225", label: "Côte d’Ivoire" },
  { code: "DZ", dial: "+213", label: "Algeria" },
  { code: "MA", dial: "+212", label: "Morocco" },
  { code: "TN", dial: "+216", label: "Tunisia" },
  { code: "EG", dial: "+20", label: "Egypt" },
  { code: "SD", dial: "+249", label: "Sudan" },
  { code: "ZM", dial: "+260", label: "Zambia" },
  { code: "ZW", dial: "+263", label: "Zimbabwe" },
  { code: "AO", dial: "+244", label: "Angola" },
  { code: "NA", dial: "+264", label: "Namibia" },
  { code: "BW", dial: "+267", label: "Botswana" },
  { code: "MZ", dial: "+258", label: "Mozambique" },

  // US
  { code: "US", dial: "+1", label: "United States" },
]

function digitsOnly(s: string) {
  return (s ?? "").replace(/[^\d]/g, "")
}

function splitValue(full: string) {
  // If parent already stores "+23480123...", keep it stable
  if (full.startsWith("+")) {
    const sorted = [...new Set(COUNTRY_CODES.map((c) => c.dial))].sort(
      (a, b) => b.length - a.length,
    )
    const dial = sorted.find((d) => full.startsWith(d)) ?? "+234"
    return { dial, number: digitsOnly(full.slice(dial.length)) }
  }
  // Otherwise it's just local digits
  return { dial: "+234", number: digitsOnly(full) }
}

export function PhoneInput({
  label,
  value,
  onChange,
  required = false,
}: PhoneInputProps) {
  const parsed = useMemo(() => splitValue(value), [value])
  const [dial, setDial] = useState<string>(parsed.dial)

  // keep dial in sync if parent value changes externally
  React.useEffect(() => {
    setDial(parsed.dial)
  }, [parsed.dial])

  const selected = useMemo(
    () => COUNTRY_CODES.find((c) => c.dial === dial) ?? COUNTRY_CODES[0],
    [dial],
  )

  return (
    <div className="basis-0 content-stretch flex flex-col gap-2 grow items-start justify-start min-h-px min-w-px relative shrink-0">
      <div
        className="font-['Neue_Montreal:Regular',_sans-serif] min-w-full not-italic relative shrink-0 text-[#272635] text-[16px]"
        style={{ width: "min-content" }}
      >
        <p className="leading-[1.4]">
          {label}
          {required && " *"}
        </p>
      </div>

      <div className="bg-[#ffffff] box-border content-stretch flex gap-2 h-12 items-center justify-start min-w-60 pl-4 pr-3 py-3 relative rounded-lg shrink-0 w-full">
        <div
          aria-hidden="true"
          className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]"
        />

        {/* Country Code Selector (same pill, just real select) */}
        <div className="bg-[#ffffff] box-border content-stretch flex gap-2 items-center justify-center px-2 py-1.5 relative rounded-2xl shrink-0 w-[92px]">
          <div
            aria-hidden="true"
            className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-0 pointer-events-none rounded-2xl"
          />

          {/* Fake flag */}
          <div className="w-4 h-4 bg-[#272635] rounded-sm flex items-center justify-center shrink-0">
            <div className="text-white text-[10px] font-bold leading-none">
              {selected.code}
            </div>
          </div>

          <div className="font-['Neue_Montreal:Regular',_sans-serif] not-italic relative shrink-0 text-[#272635] text-[14px]">
            <p className="leading-none whitespace-pre tabular-nums">{dial}</p>
          </div>

          {/* Invisible select overlay so UI stays identical */}
          <select
            value={dial}
            onChange={(e) => {
              const newDial = e.target.value
              setDial(newDial)
              onChange(`${newDial}${digitsOnly(parsed.number)}`)
            }}
            className="absolute bottom-0 left-0 w-full h-full opacity-0 cursor-pointer"
            aria-label="Country code"
          >
            {COUNTRY_CODES.map((c) => (
              <option key={c.code} value={c.dial}>
                {c.label} ({c.code}) {c.dial}
              </option>
            ))}
          </select>
        </div>

        {/* Phone Number Input */}
        <input
          type="tel"
          value={parsed.number}
          onChange={(e) => onChange(`${dial}${digitsOnly(e.target.value)}`)}
          placeholder="Phone number"
          inputMode="tel"
          className="basis-0 font-['Neue_Montreal:Regular',_sans-serif] grow min-h-px min-w-px not-italic relative shrink-0 text-[14px] bg-transparent border-none outline-none w-full leading-5 text-[#272635]"
        />
      </div>
    </div>
  )
}