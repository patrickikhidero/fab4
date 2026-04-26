import React from "react"

interface FormSelectProps {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  required?: boolean
}

export function FormSelect({
  label,
  placeholder,
  value,
  onChange,
  options,
  required = false,
}: FormSelectProps) {

  
  return (
    <div className="basis-0 content-stretch flex flex-col gap-2 grow items-start justify-start min-h-px min-w-px relative shrink-0">
      <div className="leading-[0] min-w-full not-italic relative shrink-0 text-[#272635] text-[16px]" style={{ width: "min-content" }}>
        <p className="leading-[1.4]">{label}{required && ' *'}</p>
      </div>

      <div className="bg-white flex items-center h-12 w-full min-w-60 pl-4 pr-3 relative rounded-lg">
        <div
          aria-hidden="true"
          className="absolute inset-0 border border-[rgba(39,38,53,0.1)] rounded-lg shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)] pointer-events-none"
        />

        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="basis-0 grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#93939a] text-[14px] bg-transparent border-none outline-none w-full appearance-none"
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        {/* caret */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 size-4 pointer-events-none">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6L8 10L12 6" stroke="#93939a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}