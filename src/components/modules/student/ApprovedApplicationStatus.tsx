import React from "react";

interface ApprovedApplicationStatusProps {
  // Add props if needed
}

export function ApprovedApplicationStatus({}: ApprovedApplicationStatusProps) {
  return (
    <div className="flex w-full max-w-[500px] flex-col items-center justify-start mx-auto px-1 sm:px-0">
      {/* Header Section */}
      <div className="mb-6 w-full">
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 flex-col items-start justify-start">
            <h1 className="mb-2 text-[24px] leading-[30px] sm:text-[27px] sm:leading-[31px] lg:text-[29px] lg:leading-[29px] font-['Neue_Montreal:Regular',_sans-serif] text-[#272635]">
              Your Application
            </h1>
            <p className="max-w-[414px] text-[14px] leading-[22px] sm:text-[15px] sm:leading-[23px] lg:text-[16px] lg:leading-[24px] font-['Neue_Montreal:Regular',_sans-serif] text-[rgba(39,38,53,0.7)]">
              Clearly provide details to help us understand and process your fund
              request.
            </p>
          </div>

          <div className="inline-flex w-fit shrink-0 rounded-full bg-[#10B981] px-3 py-1 text-sm font-medium text-white">
            Approved
          </div>
        </div>

        <div className="h-px w-full bg-[rgba(39,38,53,0.1)]" />
      </div>

      {/* Main Content */}
      <div className="relative flex w-full flex-col items-center justify-start">
        {/* Decorative Help Icons */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[-14px] top-[-10px] h-[40px] w-[40px] opacity-10 sm:left-[-20px] sm:top-[-18px] sm:h-[48px] sm:w-[48px] lg:left-[-26px] lg:top-[-21px] lg:h-[55px] lg:w-[55px]">
            <div className="h-full w-full rounded-full bg-[#272635]" />
          </div>
          <div className="absolute left-[18%] top-[72px] h-[72px] w-[72px] opacity-10 sm:left-[24%] sm:h-[90px] sm:w-[90px] lg:left-[142px] lg:h-[118px] lg:w-[118px]">
            <div className="h-full w-full rounded-full bg-[#272635]" />
          </div>
          <div className="absolute right-0 top-[72px] h-[72px] w-[72px] opacity-10 sm:h-[90px] sm:w-[90px] lg:h-[118px] lg:w-[118px]">
            <div className="h-full w-full rounded-full bg-[#272635]" />
          </div>
        </div>

        {/* Check Circle Icon */}
        <div className="mb-6 flex h-[42px] w-[42px] items-center justify-center sm:mb-8">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-[#10B981]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 6L9 17L4 12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Approval Message */}
        <div className="mb-6 max-w-[372px] px-2 text-center sm:mb-8 sm:px-0">
          <p className="text-[14px] leading-[22px] sm:text-[15px] sm:leading-[23px] lg:text-[16px] lg:leading-[24px] font-['Neue_Montreal:Regular',_sans-serif] text-[#272635]">
            Your application to the FabFour scholarship program has been approved
            and your profile verified to start creating fundraising campaigns for
            your academic needs
          </p>
        </div>

        {/* Profile Section */}
        <div className="mb-6 flex items-center justify-center sm:mb-8">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F3F4F6]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z"
                  fill="#9CA3AF"
                />
                <path
                  d="M10 12C6.68629 12 4 14.6863 4 18H16C16 14.6863 13.3137 12 10 12Z"
                  fill="#9CA3AF"
                />
              </svg>
            </div>

            <div className="flex min-w-0 flex-col">
              <span className="text-[14px] leading-[17px] font-['Neue_Montreal:Regular',_sans-serif] text-[#272635]">
                Approved by
              </span>
              <span className="break-all text-[13px] leading-[16px] sm:text-[14px] sm:leading-[14px] font-['Neue_Montreal:Regular',_sans-serif] text-[rgba(39,38,53,0.7)]">
                olivia@untitledui.com
              </span>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="w-full max-w-[372px] rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] p-4 sm:p-5">
          <div className="flex items-start space-x-3">
            <div className="mt-0.5 h-4 w-4 shrink-0 text-[#6B7280]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 3v6h2V3H7zm0 8v2h2v-2H7z"
                  fill="currentColor"
                />
              </svg>
            </div>

            <div className="flex-1">
              <p className="mb-3 text-[14px] leading-[20px] font-['Neue_Montreal:Regular',_sans-serif] text-[#272635]">
                Start enjoying your benefits as a FabFour recipient by creating
                your first campaign
              </p>
              <button className="w-full rounded-lg bg-[#273125] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1F2937] sm:w-auto">
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}