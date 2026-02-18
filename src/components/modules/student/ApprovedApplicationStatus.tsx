import React from 'react'

interface ApprovedApplicationStatusProps {
  // Add props if needed
}

export function ApprovedApplicationStatus({}: ApprovedApplicationStatusProps) {
  return (
    <div className="flex flex-col items-center justify-start w-full max-w-[500px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col items-start justify-start w-full mb-6">
        <div className="flex items-center justify-between w-full mb-4">
          <div className="flex flex-col items-start justify-start">
            <h1 className="text-[29px] font-['Neue_Montreal:Regular',_sans-serif] text-[#272635] leading-[29px] mb-2">
              Your Application
            </h1>
            <p className="text-[16px] font-['Neue_Montreal:Regular',_sans-serif] text-[rgba(39,38,53,0.7)] leading-[24px] max-w-[414px]">
              Clearly provide details to help us understand and process your fund request.
            </p>
          </div>
          {/* Badge */}
          <div className="bg-[#10B981] text-white px-3 py-1 rounded-full text-sm font-medium">
            Approved
          </div>
        </div>
        <div className="w-full h-px bg-[rgba(39,38,53,0.1)]"></div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-start w-full relative">
        {/* Decorative Help Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-21px] left-[-26px] w-[55px] h-[55px] opacity-10">
            <div className="w-full h-full bg-[#272635] rounded-full"></div>
          </div>
          <div className="absolute top-[75px] left-[142px] w-[118px] h-[118px] opacity-10">
            <div className="w-full h-full bg-[#272635] rounded-full"></div>
          </div>
          <div className="absolute top-[75px] right-[0px] w-[118px] h-[118px] opacity-10">
            <div className="w-full h-full bg-[#272635] rounded-full"></div>
          </div>
        </div>

        {/* Check Circle Icon */}
        <div className="flex items-center justify-center w-[42px] h-[42px] mb-8">
          <div className="w-full h-full bg-[#10B981] rounded-full flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Approval Message */}
        <div className="text-center mb-8 max-w-[372px]">
          <p className="text-[16px] font-['Neue_Montreal:Regular',_sans-serif] text-[#272635] leading-[24px]">
            Your application to the FabFour scholarship program has been approved and your profile verified to start creating fundraising campaigns for your academic needs
          </p>
        </div>

        {/* Profile Section */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#F3F4F6] rounded-full flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z" fill="#9CA3AF"/>
                <path d="M10 12C6.68629 12 4 14.6863 4 18H16C16 14.6863 13.3137 12 10 12Z" fill="#9CA3AF"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-['Neue_Montreal:Regular',_sans-serif] text-[#272635] leading-[17px]">
                Approved by
              </span>
              <span className="text-[14px] font-['Neue_Montreal:Regular',_sans-serif] text-[rgba(39,38,53,0.7)] leading-[14px]">
                olivia@untitledui.com
              </span>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-5 w-full max-w-[372px]">
          <div className="flex items-start space-x-3">
            <div className="w-4 h-4 text-[#6B7280] mt-0.5">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 3v6h2V3H7zm0 8v2h2v-2H7z" fill="currentColor"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-['Neue_Montreal:Regular',_sans-serif] text-[#272635] leading-[20px] mb-3">
                Start enjoying your benefits as a FabFour recipient by creating your first campaign
              </p>
              <button className="bg-[#273125] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1F2937] transition-colors">
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

