interface UserData {
  name: string
  email: string
  avatar: string
}

interface SidebarNavigationProps {
  currentStep: number
  userData: UserData
  onNavigationChange: (section: 'application' | 'status' | 'campaign') => void
  activeSection: 'application' | 'status' | 'campaign'
  isVerified?: boolean
}

interface CampaignSummary {
  currentAmount: number
  weekAmount: number
  monthAmount: number
  progress: number
}

interface SidebarNavigationProps {
  currentStep: number
  userData: UserData
  onNavigationChange: (section: 'application' | 'status' | 'campaign') => void
  activeSection: 'application' | 'status' | 'campaign'
  isVerified?: boolean
  campaignSummary?: CampaignSummary | null
}


export function SidebarNavigation({ 
  currentStep, 
  userData, 
  onNavigationChange, 
  activeSection, 
  isVerified = false,
  campaignSummary
}: SidebarNavigationProps) {
  // Image assets from local SVG files
  const imgLogo = "/svg/navigation/logo.svg"           // Logo icon
  const img = "/svg/navigation/nav-icon1.svg"          // Wallet icon base
  const img1 = "/svg/navigation/nav-icon2.svg"         // Wallet icon detail 1
  const img2 = "/svg/navigation/nav-icon3.svg"         // Wallet icon detail 2
  const img3 = "/svg/navigation/nav-icon4.svg"         // Chevron selector icon
  const imgLine1 = "/svg/navigation/nav-divider.svg"   // Navigation divider line
  const defaultAvatar = "/images/avatars/default-avatar.png" // Default avatar image

  const avatarSrc = userData.avatar ? userData.avatar : defaultAvatar

  return (
    <div className="flex w-[300px] h-[1024px] items-start shrink-0 relative" data-name="Sidebar navigation" data-node-id="444:1681">
      <div className="basis-0 content-stretch flex flex-col grow h-full items-start justify-start leading-[0] min-h-px min-w-px relative shrink-0" data-name="Content" data-node-id="444:1682">
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0 w-full" data-node-id="444:1683">
          <div className="[grid-area:1_/_1] box-border content-stretch flex flex-col gap-6 items-start justify-start ml-0 mt-0 pb-0 pt-16 px-0 relative w-[300px]" data-name="Navigation" data-node-id="444:1684">
            <div className="box-border content-stretch flex flex-col gap-10 items-start justify-center px-10 py-0 relative shrink-0 w-full" data-node-id="444:1685">
              {/* <div className="h-[16.028px] relative shrink-0 w-[59px]" data-name="LOGO" data-node-id="444:1686">
                <img alt="Logo" className="block max-w-none size-full" src={imgLogo} />
              </div> */}
              <div className="text-lg font-semibold tracking-wide text-[var(--color-primary-text)] opacity-60">
              LOGO
            </div>
              <div className="content-stretch flex flex-col gap-4 items-start justify-start relative shrink-0 w-full" data-node-id="444:1687">
                <div className="leading-[normal] not-italic relative shrink-0 text-[#272635] text-[0px] text-[28px] w-full" data-node-id="444:1688">
                  <p className="leading-[normal]">Welcome back,</p>
                  <p className="text-[rgba(39,38,53,0.5)]">{userData.name}!</p>
                </div>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-col gap-1 items-start justify-start px-7 py-0 relative shrink-0 w-full mb-4" data-name="Navigation" data-node-id="444:1690">
              {/* Application - Always show if not verified, or show as option */}
              {!isVerified && (
                <div className={`content-stretch flex h-10 items-start justify-start relative rounded-bl-[4px] rounded-br-[12px] rounded-tl-[4px] rounded-tr-[12px] shrink-0 w-full cursor-pointer ${
                  activeSection === 'application' ? 'bg-[#f9faf7]' : 'bg-transparent'
                }`} data-name="_Nav item dropdown base" data-node-id="444:1699" onClick={() => onNavigationChange('application')}>
                  {activeSection === 'application' && (
                    <div aria-hidden="true" className="absolute border-[#198754] border-[0px_0px_0px_2px] border-solid bottom-0 left-[-1px] pointer-events-none right-0 rounded-bl-[4px] rounded-br-[12px] rounded-tl-[4px] rounded-tr-[12px] top-0" />
                  )}
                  <div className="basis-0 box-border content-stretch flex gap-2 grow h-full items-center justify-start min-h-px min-w-px overflow-clip px-3 py-2 relative rounded-md shrink-0" data-name="_Nav item base" data-node-id="444:1700">
                    <div className="basis-0 content-stretch flex gap-3 grow items-center justify-start min-h-px min-w-px relative shrink-0" data-name="Content" data-node-id="444:1701">
                      <div className="overflow-clip relative shrink-0 size-5" data-name="Wallet" data-node-id="444:1703">
                        <div className="absolute inset-0" data-name="Vector" id="node-I444_1703-274_813">
                          <img alt="Wallet Icon" className="block max-w-none size-full" src={img} />
                        </div>
                        <div className="absolute inset-[15.63%_12.5%_21.88%_46.23%]" data-name="Vector" id="node-I444_1703-274_814">
                          <div className="absolute inset-[-4%_-3.48%]" style={{ "--stroke-0": "rgba(47, 43, 67, 1)" } as React.CSSProperties}>
                            <img alt="Wallet Icon Detail" className="block max-w-none size-full" src={img1} />
                          </div>
                        </div>
                        <div className="absolute inset-[46.88%_27.48%_46.23%_65.63%]" data-name="Vector" id="node-I444_1703-274_815">
                          <div className="absolute inset-[-4%_-3.48%]" style={{ "--stroke-0": "rgba(47, 43, 67, 1)" } as React.CSSProperties}>
                            <img alt="Wallet Icon Detail" className="block max-w-none size-full" src={img2} />
                          </div>
                        </div>
                      </div>
                      <div className="leading-[0] not-italic relative shrink-0 text-[#2f2b43] text-[16px] text-nowrap" data-node-id="444:1704">
                        <p className="leading-[24px] whitespace-pre">Your Application</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Application Status Navigation Item - Show when verified */}
              {isVerified && (
                <div className={`content-stretch flex h-10 items-start justify-start relative rounded-bl-[4px] rounded-br-[12px] rounded-tl-[4px] rounded-tr-[12px] shrink-0 w-full cursor-pointer ${
                  activeSection === 'status' ? 'bg-[#f9faf7]' : 'bg-transparent'
                }`} data-name="_Nav item dropdown base" data-node-id="444:1701" onClick={() => onNavigationChange('status')}>
                  {activeSection === 'status' && (
                    <div aria-hidden="true" className="absolute border-[#198754] border-[0px_0px_0px_2px] border-solid bottom-0 left-[-1px] pointer-events-none right-0 rounded-bl-[4px] rounded-br-[12px] rounded-tl-[4px] rounded-tr-[12px] top-0" />
                  )}
                  <div className="basis-0 box-border content-stretch flex gap-2 grow h-full items-center justify-start min-h-px min-w-px overflow-clip px-3 py-2 relative rounded-md shrink-0" data-name="_Nav item base" data-node-id="444:1702">
                    <div className="basis-0 content-stretch flex gap-3 grow items-center justify-start min-h-px min-w-px relative shrink-0" data-name="Content" data-node-id="444:1703">
                      <div className="overflow-clip relative shrink-0 size-5" data-name="Status Icon" data-node-id="444:1704">
                        <div className="absolute inset-0" data-name="Vector" id="node-I444_1704-274_813">
                          <img alt="Status Icon" className="block max-w-none size-full" src="/svg/icons/clock-loader.svg" />
                        </div>
                      </div>
                      <div className="leading-[0] not-italic relative shrink-0 text-[#2f2b43] text-[16px] text-nowrap" data-node-id="444:1705">
                        <p className="leading-[24px] whitespace-pre">Application Status</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Campaign Navigation Item - Show when verified */}
              {isVerified && (
                <div className={`content-stretch flex h-10 items-start justify-start relative rounded-bl-[4px] rounded-br-[12px] rounded-tl-[4px] rounded-tr-[12px] shrink-0 w-full cursor-pointer ${
                  activeSection === 'campaign' ? 'bg-[#f9faf7]' : 'bg-transparent'
                }`} data-name="_Nav item dropdown base" data-node-id="444:1706" onClick={() => onNavigationChange('campaign')}>
                  {activeSection === 'campaign' && (
                    <div aria-hidden="true" className="absolute border-[#198754] border-[0px_0px_0px_2px] border-solid bottom-0 left-[-1px] pointer-events-none right-0 rounded-bl-[4px] rounded-br-[12px] rounded-tl-[4px] rounded-tr-[12px] top-0" />
                  )}
                  <div className="basis-0 box-border content-stretch flex gap-2 grow h-full items-center justify-start min-h-px min-w-px overflow-clip px-3 py-2 relative rounded-md shrink-0" data-name="_Nav item base" data-node-id="444:1707">
                    <div className="basis-0 content-stretch flex gap-3 grow items-center justify-start min-h-px min-w-px relative shrink-0" data-name="Content" data-node-id="444:1708">
                      <div className="overflow-clip relative shrink-0 size-5" data-name="Campaign Icon" data-node-id="444:1709">
                        <div className="absolute inset-0" data-name="Vector" id="node-I444_1709-274_814">
                          <img alt="Campaign Icon" className="block max-w-none size-full" src="/svg/ui/group.svg" />
                        </div>
                      </div>
                      <div className="leading-[0] not-italic relative shrink-0 text-[#2f2b43] text-[16px] text-nowrap" data-node-id="444:1710">
                        <p className="leading-[24px] whitespace-pre">Campaign</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
            {/* Frame 46 Content - Campaign Card and User Profile */}
            <div className="box-border content-stretch flex flex-col gap-3 items-start justify-start ml-0 mt-32 pb-16 pt-0 px-10 relative w-[300px]" data-node-id="444:1708">

            {/* Frame 154 - Campaign Card */}
            {isVerified && campaignSummary && (
              <div className="w-[220px] h-[183px] flex flex-col items-start justify-start relative" data-node-id="456:9760">
                {/* Frame 50 - Campaign Header */}
                <div className="w-[220px] h-[63px] flex items-start justify-start relative" data-node-id="456:9761">
                  {/* Frame 49 - Campaign Info */}
                  <div className="w-[169px] h-[63px] flex flex-col items-start justify-start relative" data-node-id="456:9762">
                    <div className="w-[169px] h-[17px] text-[#272635] text-[14px] font-['Neue_Montreal:Regular',_sans-serif] uppercase" data-node-id="456:9763">
                      <p className="leading-[normal]">current campaign</p>
                    </div>
                    <div className="w-[169px] h-[38px] text-[#198754] text-[28px] font-['Neue_Montreal:Regular',_sans-serif]" data-node-id="456:9764">
                      <p className="leading-[normal]">
                        {campaignSummary
                        ? `$${campaignSummary.currentAmount.toLocaleString()}`
                        : '$0.00'}
                      </p>
                    </div>
                  </div>
                  {/* Progress Circle */}
                  <div className="w-[41px] h-[41px] ml-[179px] absolute top-0" data-node-id="456:9765">
                    <div className="w-[36.9px] h-[36.9px] absolute top-[2.05px] left-[2.05px]" data-node-id="456:9766">
                      <img alt="Progress Ring" className="w-full h-full" src="/511895c63440a205bff0d84c48812d96c04dde9f.svg" />
                    </div>
                    <div className="w-[24px] h-[9px] absolute top-[15.9px] left-[7.34px] text-[#272635] text-[12px] font-['Neue_Montreal:Regular',_sans-serif] text-center" data-node-id="456:9769">
                      <p className="leading-[8.2px]">
                        {campaignSummary ? `${campaignSummary.progress}%` : '0%'}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Divider Line */}
                <div className="w-[220px] h-[1px] mt-[16px]" data-node-id="456:9770">
                  <img alt="Divider" className="w-full h-full" src="/f1485ba9c642cd505ed93e33186ec08e310dce13.svg" />
                </div>
                
                {/* Frame 51 - Performance Metrics */}
                <div className="w-[220px] h-[56px] mt-[16px] flex flex-col items-start justify-start" data-node-id="456:9771">
                  {/* This Week */}
                  <div className="w-[220px] h-[24px] flex items-center justify-between" data-node-id="456:9772">
                    <div className="text-[#272635] text-[12px] font-['Neue_Montreal:Regular',_sans-serif]" data-node-id="456:9773">
                      <p className="leading-[20px]">This week</p>
                    </div>
                    <div className="text-[#198754] text-[14px] font-['Neue_Montreal:Regular',_sans-serif]" data-node-id="456:9774">
                      <p className="leading-[24px]">
                        {campaignSummary
                        ? `+$${campaignSummary.weekAmount.toLocaleString()}`
                        : '+$0.00'}
                      </p>
                    </div>
                  </div>
                  {/* This Month */}
                  <div className="w-[220px] h-[24px] mt-[8px] flex items-center justify-between" data-node-id="456:9775">
                    <div className="text-[#272635] text-[12px] font-['Neue_Montreal:Regular',_sans-serif]" data-node-id="456:9776">
                      <p className="leading-[20px]">This month</p>
                    </div>
                    <div className="text-[#198754] text-[14px] font-['Neue_Montreal:Regular',_sans-serif]" data-node-id="456:9777">
                      <p className="leading-[24px]">
                        {campaignSummary
                        ? `+$${campaignSummary.monthAmount.toLocaleString()}`
                        : '+$0.00'}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* View Button */}
                <div className="w-[58px] h-[16px] mt-[16px] flex items-center gap-1 cursor-pointer" data-node-id="456:9778">
                  <span className="text-[#272635] text-[12px] font-['Neue_Montreal:Regular',_sans-serif]">View</span>
                  <img alt="Arrow" className="w-3 h-3" src="/29a615b320e09cd458090219f8e83fd794a5404f.svg" />
                </div>
              </div>
            )}
            
            {/* Frame 46 - User Profile Section */}
            <div className="w-[220px] h-[114px] flex flex-col items-start justify-start" data-node-id="456:9779">
              {/* User Profile */}
              <div className="w-[220px] h-[40px] flex items-center gap-2" data-node-id="456:9780">
                <div className="w-[40px] h-[40px] rounded-[20px] bg-center bg-cover bg-no-repeat" data-node-id="456:9781" style={{ backgroundImage: `url('${avatarSrc}')` }} />
                <div className="flex-1 flex flex-col gap-1" data-node-id="456:9782">
                  <div className="text-[#272635] text-[14px] font-['Neue_Montreal:Regular',_sans-serif]" data-node-id="456:9783">
                    <p className="leading-[17px]">{userData.name}</p>
                  </div>
                  <div className="text-[rgba(39,38,53,0.5)] text-[12px] font-['Neue_Montreal:Regular',_sans-serif]" data-node-id="456:9784">
                    <p className="leading-[14px]">{userData.email}</p>
                  </div>
                </div>
                {/* <div className="w-[20px] h-[20px] flex items-center justify-center" data-node-id="456:9787">
                  <img alt="Chevron" className="w-5 h-5" src={img3} />
                </div> */}
              </div>
              
              {/* Divider Line */}
              <div className="w-[220px] h-[1px] mt-[20px]" data-node-id="456:9790">
                <img alt="Divider" className="w-full h-full" src={imgLine1} />
              </div>
              
              {/* Copyright */}
              <div className="w-[220px] h-[34px] mt-[20px] text-[rgba(39,38,53,0.5)] text-[14px] font-['Neue_Montreal:Regular',_sans-serif]" data-node-id="456:9791">
                <p className="leading-[normal]">© 2024 FabFour Foundation. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
