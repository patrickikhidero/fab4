import React from 'react'

interface SuccessNotificationProps {
  isVisible: boolean
  message: string
  onClose?: () => void
}

export function SuccessNotification({ isVisible, message, onClose }: SuccessNotificationProps) {
  if (!isVisible) return null

  return (
    <div className="absolute bg-[#193e2f] box-border content-stretch flex flex-col gap-2 items-start justify-center left-[676px] overflow-clip p-[16px] rounded-[16px] shadow-[0px_16px_32px_-8px_rgba(12,12,13,0.4)] top-[1007px] w-[344px] z-50 animate-in slide-in-from-bottom-2 duration-300">
      <div className="content-stretch flex gap-4 items-center justify-start relative shrink-0 w-full">
        <div className="flex h-[24.942px] items-center justify-center relative shrink-0 w-[24.942px]">
          <div className="flex-none rotate-[2.295deg]">
            <div className="overflow-clip relative size-6" data-name="Check circle">
              <div className="absolute inset-[8.31%_8.33%_8.36%_8.33%]" data-name="Icon">
                <div className="absolute inset-[-4%]" style={{ "--stroke-0": "rgba(209, 239, 124, 1)" } as React.CSSProperties}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.7088 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.76488 14.1003 1.98232 16.07 2.85999" stroke="#d1ef7c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 4L12 14.01L9 11.01" stroke="#d1ef7c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="basis-0 font-['Neue_Montreal:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#ffffff] text-[14px]">
          <p className="leading-[normal]">{message}</p>
        </div>
      </div>
    </div>
  )
}
