import React from 'react'

// Google Icon Component
function GoogleIcon() {
  return (
    <div className="relative size-6">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    </div>
  )
}

// Apple Icon Component
function AppleIcon() {
  return (
    <div className="relative size-6">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" fill="#000"/>
      </svg>
    </div>
  )
}

// Campaign Preview Card Component
function CampaignPreviewCard() {
  return (
    <div className="absolute right-8 top-56 bg-[#e6e6e6] rounded-[13.212px] p-[26.424px] w-[278px] h-[278px]">
      {/* Main Campaign Image */}
      <div 
        className="w-full h-full bg-center bg-cover bg-no-repeat rounded-[13.212px] relative overflow-hidden"
        style={{ backgroundImage: "url('/images/ui/background-image.png')" }}
      >
        {/* Campaign Info Card 1 - Bamba Toure */}
        <div className="absolute left-[-39.64px] top-[24.77px] bg-[#eceee4] rounded-[13.212px] p-[8.808px] w-[176.158px] shadow-[0px_16px_32px_-4px_rgba(12,12,13,0.1),0px_4px_4px_-4px_rgba(12,12,13,0.05)]">
          <div className="flex flex-col gap-[5.505px] items-start justify-start w-full">
            <div className="flex items-start justify-between w-full">
              <span className="font-['Neue_Montreal:Regular',_sans-serif] text-[11.01px] text-[#272635] text-nowrap leading-[normal]">
                Bamba Toure
              </span>
              <div className="relative shrink-0 size-[15.414px]">
                <div className="absolute inset-[0.77px]">
                  {/* Progress Ring - Using CSS instead of SVG for now */}
                  <div className="w-full h-full border-2 border-[#01b26a] rounded-full flex items-center justify-center">
                    <span 
                      className="font-['Neue_Montreal:Regular',_sans-serif] text-[4.511px] text-[#272635] text-center leading-[3.083px]"
                      style={{ 
                        top: "calc(50% + 0.27px)", 
                        left: "calc(50% + 0.052px)",
                        transform: "translate(-50%, -50%)"
                      }}
                    >
                      40%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-end justify-between w-full">
              <div className="flex flex-col font-['Neue_Montreal:Regular',_sans-serif] items-start justify-start text-nowrap">
                <div className="text-[6.606px] text-[rgba(39,38,53,0.5)] text-center leading-[8.808px]">
                  Raising
                </div>
                <div className="text-[#272635] text-[8.808px] leading-[13.212px]">
                  $50.50
                </div>
              </div>
              <div className="flex gap-[2.202px] items-center justify-start">
                <div className="flex gap-[5.505px] items-center justify-center px-[4.404px] py-[2.202px] rounded-[5504.4px] relative">
                  <div className="absolute border-[0.55px] border-[rgba(39,38,53,0.1)] border-solid inset-0 pointer-events-none rounded-[5504.4px]" />
                  <div className="font-['Neue_Montreal:Regular',_sans-serif] text-[6.606px] text-[rgba(39,38,53,0.5)] text-center leading-[8.808px]">
                    Tuition
                  </div>
                </div>
                <div className="flex gap-[5.505px] items-center justify-center px-[4.404px] py-[2.202px] rounded-[5504.4px] relative">
                  <div className="absolute border-[0.55px] border-[rgba(39,38,53,0.1)] border-solid inset-0 pointer-events-none rounded-[5504.4px]" />
                  <div className="font-['Neue_Montreal:Regular',_sans-serif] text-[6.606px] text-[rgba(39,38,53,0.5)] text-center leading-[8.808px]">
                    Learning materials
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Campaign Info Card 2 - Anonymous Donor */}
        <div className="absolute left-[134.32px] top-[164.6px] bg-white rounded-[13.212px] p-[8.808px] w-[176.158px] shadow-[0px_16px_32px_-4px_rgba(12,12,13,0.1),0px_4px_4px_-4px_rgba(12,12,13,0.05)]">
          <div className="flex gap-[5.505px] items-center justify-start w-full">
            <div className="w-[13.212px] h-[13.212px] bg-[#01b26a] rounded-full flex items-center justify-center">
              <span className="text-white text-[8px]">✓</span>
            </div>
            <div className="flex flex-col font-['Neue_Montreal:Regular',_sans-serif] text-nowrap">
              <div className="text-[11.01px] text-[rgba(39,38,53,0.5)] leading-[normal]">
                Anonymous
              </div>
              <div className="text-[#272635] text-[8.808px] leading-[13.212px]">
                $50.50
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface LoginFormProps {
  onSubmit: (email: string) => void
  isLoading?: boolean
}

export function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
  const [email, setEmail] = React.useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      onSubmit(email.trim())
    }
  }

  return (
    <div className="min-h-screen bg-center bg-cover bg-no-repeat relative overflow-hidden">
      {/* Background Image - Using the exact colors from Figma */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f9faf7] via-[#f0f5fc] to-[#f9faf7] opacity-90" />
      
      {/* Additional Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI5MDAiIHZpZXdCb3g9IjAgMCAxNDQwIDkwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNzIwIiBjeT0iNDUwIiByPSI0MDAiIGZpbGw9InVybCgjZ3JhZGllbnQxKSIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIyMDAiIHI9IjMwMCIgZmlsbD0idXJsKCNncmFkaWVudDIpIi8+CjxjaXJjbGUgY3g9IjEyMDAiIGN5PSI3MDAiIHI9IjM1MCIgZmlsbD0idXJsKCNncmFkaWVudDMpIi8+CjxkZWZzPgo8cmFkaWFsR3JhZGllbnQgaWQ9ImdyYWRpZW50MSIgY3g9IjUwJSIgY3k9IjUwJSIgcj0iNTAlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0Y5RkFGNyIgc3RvcC1vcGFjaXR5PSIwLjEiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRjBGNUZDIiBzdG9wLW9wYWNpdHk9IjAuMDUiLz4KPC9yYWRpYWxHcmFkaWVudD4KPHJhZGlhbEdyYWRpZW50IGlkPSJncmFkaWVudDIiIGN4PSI1MCUiIGN5PSI1MCUiIHI9IjUwJSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGOUZBRjciIHN0b3Atb3BhY2l0eT0iMC4xIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0YwRjVGQyIgc3RvcC1vcGFjaXR5PSIwLjA1Ii8+CjwvcmFkaWFsR3JhZGllbnQ+CjxyYWRpYWxHcmFkaWVudCBpZD0iZ3JhZGllbnQzIiBjeD0iNTAlIiBjeT0iNTAlIiByPSI1MCUiPgo8c3RvcCBzdG9wLWNvbG9yPSIjRjlGQUY3IiBzdG9wLW9wYWNpdHk9IjAuMSIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGMEY1RkMiIHN0b3Atb3BhY2l0eT0iMC4wNSIvPgo8L3JhZGlhbEdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo=')] bg-center bg-no-repeat opacity-30" />
      
      {/* Decorative Elements */}
      <div className="absolute left-[-100.28px] top-[103.55px] w-0 h-0">
        <div className="flex-none rotate-[17.917deg]">
          <div className="h-[142.99px] relative w-[257.053px]">
            {/* Frame 255 - Exact SVG vector from Figma */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="257.053" 
              height="142.99" 
              viewBox="0 0 161 95" 
              fill="none"
              className="w-full h-full"
            >
              <path d="M120.583 67.5057C118.371 67.6423 116.323 67.1567 114.828 65.5168C109.037 59.1662 103.626 52.6066 102.607 43.4278C102.102 38.8816 102.039 38.7994 106.223 40.266C117.779 44.2505 121.844 56.4074 122.144 65.7821C122.185 67.0618 121.73 67.435 120.583 67.5057ZM139.32 70.2818C137.95 54.346 143.903 38.8639 140.115 22.9887C147.399 30.2037 146.892 65.2147 139.32 70.2818ZM150.769 32.4977C152.521 39.2716 153.132 46.1695 151.068 53.0463C150.68 54.3379 151.678 55.6165 150.709 56.7603C150.709 56.7606 150.709 56.7609 150.709 56.7612C150.489 59.8957 149.51 62.7859 147.903 65.4741C147.755 66.0199 147.832 66.9227 146.859 66.163C146.429 64.9174 146.981 63.8042 147.355 62.667C148.671 54.967 149.17 47.2509 148.437 39.4629C148.05 35.3382 147.253 31.3179 146.173 27.0573C149.076 27.9163 150.173 30.1919 150.769 32.4977ZM156.817 43.9811C157.389 46.8739 157.313 49.7494 156.49 52.6043C156.49 52.605 156.49 52.6056 156.49 52.6063C156.691 53.9434 156.338 55.1813 155.795 56.3859C155.027 59.6188 154.182 62.8269 152.758 65.849C152.651 66.6522 152.102 67.043 150.89 67.5449C151.992 64.1358 152.982 61.0752 153.971 58.0145C155.288 53.8628 155.248 49.5307 155.755 45.2715C155.755 45.2712 155.755 45.2711 155.755 45.2711C155.669 44.0694 155.582 42.8674 155.472 41.3275C156.779 42.0719 156.733 43.0595 156.817 43.9811ZM124.549 92.0447C125.544 92.5557 126.537 93.0668 127.532 93.5773C128.069 93.5439 128.62 93.5569 129.124 93.4098C133.396 93.0431 135.827 90.5753 137.034 86.4982C137.884 83.6276 138.331 80.7147 138.394 77.7583C138.455 74.843 139.506 73.0657 142.596 72.7497C145.993 72.4028 148.826 70.2242 152.127 69.393C154.12 68.8913 155.037 66.7232 155.72 64.8069C156.992 61.2419 158.264 57.6791 158.765 53.8822C159.025 51.905 159.087 49.8593 159.957 47.9899C160.146 47.6822 160.346 47.3948 160.579 47.1739C160.505 46.0883 160.431 45.0026 160.356 43.9166C160.135 43.6964 159.908 43.4806 159.679 43.2653C158.76 41.6196 158.059 39.9284 158.621 37.9734C158.536 37.9004 158.451 37.8276 158.364 37.7565C157.596 36.6026 156.956 35.3539 155.93 34.3888C155.649 33.9892 155.495 33.5446 155.452 33.0563C152.96 31.3219 153.174 27.7384 150.979 25.8011C149.15 23.8065 146.193 23.7693 144.303 21.881C142.992 19.8349 141.518 18.0479 138.946 17.5447C138.218 17.4021 137.777 16.9347 137.459 16.3542C137.077 16.1842 136.702 15.93 136.331 15.5713C134.003 13.6576 132.165 11.1124 129.299 9.90072C128.074 9.38192 126.84 8.73384 124.571 9.09183C133.663 13.3121 138.683 19.5795 138.248 29.458C138.098 29.9684 137.951 30.4788 137.838 30.99C137.954 31.9901 137.938 32.9994 137.859 34.0126C137.926 34.2236 138.011 34.4351 138.116 34.6463C138.109 34.9787 138.005 35.2812 137.813 35.5515C137.796 35.569 137.778 35.5849 137.757 35.599C138.13 36.3311 138.001 37.0429 137.599 37.7435C137.438 38.4241 137.278 39.1044 137.117 39.7848C138.392 41.7813 137.454 43.8318 137.189 45.8659C137.358 46.8553 137.419 47.8369 136.941 48.7772C135.486 55.5526 135.735 62.423 135.597 69.2713C136.23 70.3006 135.433 71.2523 135.406 72.2455C136.011 72.9727 136.18 73.7947 135.885 74.7182C135.866 74.9554 135.846 75.1926 135.826 75.4297C136.235 79.7333 135.634 83.9086 134.014 87.9202C133.251 89.8081 131.998 91.038 129.739 90.8961C127.461 90.7525 126.772 89.0411 126.47 87.3441C125.497 81.8655 125.47 76.2942 125.563 70.7289C125.577 69.8475 125.976 69.1251 126.865 68.7924C126.995 68.3645 127.127 67.9365 127.257 67.5086C124.355 64.2069 125.514 59.7641 124.254 56.0011C123.762 54.6052 123.27 53.2097 122.778 51.8139C119.321 44.1191 113.734 38.8222 105.688 36.4164C99.6318 34.6055 93.6456 37.0393 90.4691 42.5947C84.6036 52.8532 86.0946 62.9626 91.3417 72.6716C94.1369 77.8444 97.7686 82.4679 103.304 85.1186C104.949 85.9063 106.861 87.2565 105.82 89.4322C104.853 91.4524 102.778 91.8388 100.64 90.9762C96.7538 89.4086 92.8129 87.9722 88.9661 86.3152C83.0265 83.7565 78.637 79.4364 74.919 74.0857C69.1093 65.7238 65.7144 56.18 61.5227 47.0188C61.0208 45.852 60.5185 44.6854 60.0162 43.5187C55.7869 38.4317 49.9884 36.2487 43.9191 34.4049C36.1149 32.034 28.7653 28.4853 21.4351 24.9562C9.22337 19.0768 -3.74943 15.3715 -16.5731 11.2122C-23.8692 8.84563 -31.0799 6.21243 -38.2984 3.61483C-39.4332 3.20646 -40.8604 3.11262 -41.4745 1.73134C-41.5485 1.46158 -41.6224 1.19151 -41.6964 0.921447C-43.1937 -0.363191 -44.6036 0.298662 -46.004 1.17427L-46.0028 1.21975C-45.9193 1.35922 -45.8374 1.49949 -45.7516 1.63771C-45.4795 2.38257 -45.4152 3.09144 -45.9326 3.69549C-45.928 3.72747 -45.9239 3.75967 -45.9192 3.79168L-45.6751 3.82982L-45.6364 3.96739C-45.3685 3.91234 -45.0944 3.83707 -44.8117 3.73209C-41.4135 5.26271 -37.5284 5.63404 -34.5345 8.11317C-34.2535 8.48235 -33.9355 8.82074 -33.6128 9.15596C-32.6095 9.3984 -31.6559 9.78399 -30.7265 10.2381C-30.2261 10.0452 -29.6789 9.99026 -29.1095 9.9942C-20.2445 12.2496 -11.5769 15.1163 -3.04125 18.3653C-2.42655 18.7953 -2.06478 19.2245 -2.09293 19.6473C-1.78201 19.7472 -1.47068 19.8468 -1.15916 19.9469C-0.839526 19.7394 -0.513572 19.5837 -0.116684 19.5896C6.12155 20.3601 11.6098 23.2864 17.2267 25.7586C27.6489 30.3461 37.8314 35.4958 48.8067 38.7357C53.7883 40.206 57.0056 43.6202 59.2971 48.3415C63.6474 57.3045 67.0124 66.7408 72.6479 75.0985C77.6733 82.5506 84.1852 87.4931 92.466 90.3662C94.8509 91.1936 97.511 91.4937 99.2748 93.6401C99.4113 93.9347 99.4879 94.1904 99.5197 94.416C100.201 94.5217 100.881 94.6275 101.562 94.7331C101.995 94.5101 102.44 94.3107 102.907 94.1621C109.204 91.7232 109.89 88.682 105.434 82.8945C105.092 82.4787 104.749 82.0631 104.399 81.658C102.582 80.7539 100.793 79.8112 99.5695 78.1C99.3642 78.0373 99.1552 77.98 98.9376 77.9335C95.9343 75.4417 93.1778 72.778 92.7416 68.5228C92.7872 68.3796 92.8511 68.2623 92.9232 68.1569C91.8293 66.4838 91.3491 64.6014 91.2432 62.5906C88.4945 52.6678 91.6466 42.8391 98.7652 40.0601C99.3116 48.0148 101.858 55.1744 106.444 61.5202C107.506 62.003 108.123 62.8908 108.683 63.8305C108.838 63.8189 108.994 63.8096 109.15 63.7944C110.239 64.2646 111.063 65.0935 111.874 65.923C114.052 68.1508 116.499 69.7682 119.749 69.8254C122.001 69.865 123.056 71.0961 123.09 73.4019C123.163 78.3505 123.267 83.3 124.121 88.187C124.243 88.8836 124.252 89.6014 123.801 90.1902C123.814 90.2312 123.824 90.2724 123.837 90.3134C124.378 90.766 124.937 91.2112 124.549 92.0447Z" fill="#9D9C9A"/>
            </svg>
          </div>
        </div>
      </div>
      
      <div className="absolute right-[-100px] top-[418.32px] w-0 h-0">
        <div className="rotate-[203.284deg] scale-y-[-100%] w-[288.953px] h-[152.631px] bg-gradient-to-l from-purple-200/20 to-pink-200/20 rounded-full blur-sm"></div>
      </div>
      
      {/* Horizontal Line */}
      <div className="absolute left-0 right-0 top-[418px] h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between px-12 py-9">
          {/* Logo */}
          <div className="h-[23.363px] w-[86px]">
            <div className="w-full h-full bg-[#272635] rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">FABFOUR</span>
            </div>
          </div>
          
          {/* Language Selector */}
          <div className="flex gap-2 items-center justify-center px-2 py-1 rounded-full bg-white/80 backdrop-blur-sm">
            <div className="w-4 h-4 bg-[#272635] rounded-full"></div>
            <span className="text-sm text-[#272635] font-medium">English</span>
            <div className="w-4 h-4 bg-[#272635] rounded-full"></div>
          </div>
        </div>

        {/* Main Content - Exact Figma Layout */}
        <div className="flex-1 flex flex-col justify-center px-[140px] max-w-7xl mx-auto">
          {/* Title Section */}
          <div className="mb-16 text-[#272635]">
            <h1 className="text-5xl font-medium leading-normal mb-4 max-w-2xl">
              Login to your account
            </h1>
            <p className="text-lg leading-7 text-[#272635]/80 max-w-2xl">
              Africa's trusted social fundraising platform to support smart minds through tertiary education.
            </p>
          </div>

          {/* Form Section - Exact Figma Structure */}
          <div className="relative flex gap-40 items-end">
            {/* Left Column - Email Form */}
            <div className="w-[300px] space-y-5">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-base text-[#272635] font-medium leading-[1.4]">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@email.com"
                      className="w-full h-14 px-4 py-3 bg-[#f9faf7] border border-[rgba(39,38,53,0.1)] rounded-lg text-[#272635] placeholder:text-[#93939a] focus:outline-none focus:ring-2 focus:ring-[#273125]/20 focus:border-[#273125] transition-colors"
                      required
                      disabled={isLoading}
                    />
                    <div className="absolute inset-[-0.5px] border border-[rgba(39,38,53,0.1)] rounded-[8.5px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)] pointer-events-none" />
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading || !email.trim()}
                  className="w-full h-14 bg-[#273125] text-white rounded-lg font-medium text-base hover:bg-[#273125]/90 transition-colors relative disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 border border-[#2c2c2c] rounded-lg pointer-events-none" />
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </div>
                  ) : (
                    'Continue'
                  )}
                </button>
              </form>
            </div>

            {/* Right Column - Social Login */}
            <div className="w-[300px] space-y-5">
              <button className="w-full h-14 bg-white text-[#272635] rounded-lg font-medium text-base border border-[rgba(39,38,53,0.1)] hover:bg-gray-50 transition-colors relative flex items-center justify-center gap-2">
                <div className="absolute inset-0 border border-[rgba(39,38,53,0.1)] rounded-lg pointer-events-none" />
                <GoogleIcon />
                Sign in with Google
              </button>
              
              <button className="w-full h-14 bg-white text-[#272635] rounded-lg font-medium text-base border border-[rgba(39,38,53,0.1)] hover:bg-gray-50 transition-colors relative flex items-center justify-center gap-2">
                <div className="absolute inset-0 border border-[rgba(39,38,53,0.1)] rounded-lg pointer-events-none" />
                <AppleIcon />
                Sign in with Apple ID
              </button>
            </div>

            {/* OR Divider - Exact Figma Positioning */}
            <div className="absolute bg-[#d1ef7c] flex gap-2.5 items-center justify-center left-1/2 p-0 rounded-[9999px] size-10 top-1/2 translate-x-[-50%] translate-y-[-50%]">
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                <div className="[grid-area:1_/_1] font-['Neue_Montreal:Regular',_sans-serif] ml-[11.5px] mt-0 not-italic relative text-[#272635] text-base text-center text-nowrap translate-x-[-50%] leading-[28px]">
                  OR
                </div>
              </div>
            </div>
          </div>

          {/* Footer Link - Exact Figma Structure */}
          <div className="mt-16 flex gap-2 items-center justify-center">
            <span className="text-base text-[#272635] underline underline-offset-4 cursor-pointer hover:text-[#273125] transition-colors">
              Sign Up As a Donor
            </span>
            <div className="w-5 h-5 bg-[#272635] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Campaign Preview Card */}
      <CampaignPreviewCard />
    </div>
  )
}
