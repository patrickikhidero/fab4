import React from "react"

interface DatePickerProps {
  label: string
  value: string
  onChange: (value: string) => void
  required?: boolean
}

export function DatePicker({
  label,
  value,
  onChange,
  required = false,
}: DatePickerProps) {
  const isEmpty = value === ""

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="text-[#272635] text-[16px]">
        <p className="leading-[1.4]">
          {label}
          {required && " *"}
        </p>
      </div>

      <div className="bg-white flex items-center h-12 w-full min-w-60 pl-4 pr-3 relative rounded-lg">
        <div
          aria-hidden="true"
          className="absolute inset-0 border border-[rgba(39,38,53,0.1)] rounded-lg shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)] pointer-events-none"
        />

        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={[
            "w-full bg-transparent outline-none border-none",
            "text-[14px] leading-5 pr-10", // space for icon
            isEmpty ? "text-[#93939a]" : "text-[#272635]",
          ].join(" ")}
        />

        {/* Calendar Icon (inside box, doesn't block clicks) */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 size-6 pointer-events-none">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8 2V5M16 2V5M3.5 4H20.5C21.3284 4 22 4.67157 22 5.5V19.5C22 20.3284 21.3284 21 20.5 21H3.5C2.67157 21 2 20.3284 2 19.5V5.5C2 4.67157 2.67157 4 3.5 4Z"
              stroke="#93939a"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 10H22"
              stroke="#93939a"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}