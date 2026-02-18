interface FormInputProps {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'email' | 'tel' | 'number'
  required?: boolean
}

export function FormInput({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  type = 'text',
  required = false 
}: FormInputProps) {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-2 grow items-start justify-start min-h-px min-w-px relative shrink-0">
      <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#272635] text-[16px]" style={{ width: "min-content" }}>
        <p className="leading-[1.4]">{label}{required && ' *'}</p>
      </div>
      <div className="bg-[#ffffff] box-border content-stretch flex gap-2 h-12 items-center justify-start min-w-60 pl-4 pr-3 py-3 relative rounded-lg shrink-0 w-full">
        <div aria-hidden="true" className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="basis-0 font-['Neue_Montreal:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#93939a] text-[14px] bg-transparent border-none outline-none w-full"
        />
      </div>
    </div>
  )
}
