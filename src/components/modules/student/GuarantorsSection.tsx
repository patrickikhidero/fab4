'use client'

import { useState, useRef } from 'react'
import { GuarantorForm } from './GuarantorForm'

interface Guarantor {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  state: string
  attestationLetter: File | null
}

interface GuarantorsSectionProps {
  guarantors: Guarantor[]
  onGuarantorsChange: (guarantors: Guarantor[]) => void
}

export function GuarantorsSection({ guarantors, onGuarantorsChange }: GuarantorsSectionProps) {
  const guarantorIdCounter = useRef(0)
  
  const addGuarantor = () => {
    const newGuarantor: Guarantor = {
      id: `guarantor-${guarantorIdCounter.current++}`,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: '',
      state: '',
      attestationLetter: null
    }
    onGuarantorsChange([...guarantors, newGuarantor])
  }

  const removeGuarantor = (id: string) => {
    if (guarantors.length > 1) {
      onGuarantorsChange(guarantors.filter(g => g.id !== id))
    }
  }

  const updateGuarantor = (id: string, field: string, value: string | File | null) => {
    const updatedGuarantors = guarantors.map(guarantor => 
      guarantor.id === id 
        ? { ...guarantor, [field]: value }
        : guarantor
    )
    onGuarantorsChange(updatedGuarantors)
  }

  return (
    <div className="content-stretch flex flex-col gap-5 items-start justify-start relative shrink-0 w-full" data-node-id="472:3706">
      {/* Section Header */}
      <div className="bg-[#f9faf7] box-border content-stretch flex flex-col gap-5 items-start justify-start p-[20px] relative rounded-xl shrink-0 w-full" data-node-id="472:3719">
        <div className="content-stretch flex flex-col font-['Neue_Montreal:Regular',_sans-serif] gap-2 items-start justify-start leading-[0] not-italic relative shrink-0 w-full" data-node-id="472:3991">
          <div className="relative shrink-0 text-[#272635] text-[20px] w-full" data-node-id="472:3987">
            <p className="leading-[28px]">Provide Guarantors</p>
          </div>
          <div className="relative shrink-0 text-[14px] text-[rgba(39,38,53,0.5)] w-full" data-node-id="472:3989">
            <p className="leading-[20px]">For a better chance we recommend a minimum of 2 guarantors.</p>
          </div>
        </div>

        {/* Guarantor Forms */}
        {guarantors.map((guarantor, index) => (
          <GuarantorForm
            key={guarantor.id}
            guarantor={guarantor}
            onGuarantorChange={updateGuarantor}
            onDelete={removeGuarantor}
            isCollapsible={guarantors.length > 1}
          />
        ))}

        {/* Add Another Guarantor Button */}
        <div className="content-stretch flex flex-col h-4 items-end justify-between relative shrink-0 w-full" data-node-id="473:4173">
          <div className="content-stretch flex gap-2 items-center justify-center overflow-clip relative rounded-lg shrink-0" data-name="Button" data-node-id="472:3992">
            <button
              onClick={addGuarantor}
              className="flex gap-2 items-center cursor-pointer"
            >
              <div className="overflow-clip relative shrink-0 size-[25px]" data-name="Add">
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12.5" cy="12.5" r="12.5" fill="#272635"/>
                  <path d="M12.5 8V17M8 12.5H17" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[14px] text-nowrap">
                <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-none underline whitespace-pre">Add Another Guarantor</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
