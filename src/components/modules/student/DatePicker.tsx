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
  required = false 
}: DatePickerProps) {
  return (
    <div className="content-stretch flex flex-col gap-2 h-[78px] items-start justify-start relative shrink-0 w-[300px]">
      <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#272635] text-[16px]" style={{ width: "min-content" }}>
        <p className="leading-[1.4]">{label}{required && ' *'}</p>
      </div>
      <div className="bg-[#ffffff] box-border content-stretch flex gap-2 h-12 items-center justify-start min-w-60 pl-4 pr-3 py-3 relative rounded-lg shrink-0 w-full">
        <div aria-hidden="true" className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]" />
        
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="basis-0 font-['Neue_Montreal:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#93939a] text-[14px] bg-transparent border-none outline-none w-full"
        />
        
        {/* Calendar Icon */}
        <div className="overflow-clip relative shrink-0 size-6" data-name="Calendar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2V5M16 2V5M3.5 4H20.5C21.3284 4 22 4.67157 22 5.5V19.5C22 20.3284 21.3284 21 20.5 21H3.5C2.67157 21 2 20.3284 2 19.5V5.5C2 4.67157 2.67157 4 3.5 4Z" stroke="#93939a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 10H22" stroke="#93939a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  )
}
