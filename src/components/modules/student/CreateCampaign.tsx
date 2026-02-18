'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarNavigation } from './SidebarNavigation'

// Image assets from Figma design
const imgBackArrow = '/211e63c41bedb13d7b5b07aace82fe8309636c60.svg'
const imgBackArrowStroke = '/5953f0ee7017ea99439adee8b0165fd4b1183458.svg'
const imgDoubleCaret = '/f0ee798cbcb777d6d3688db4718a873e7870e9bb.svg'
const imgDoubleCaretStroke = '/bcc46aabf3c5cccf517010ff69a656fa1151a757.svg'
const imgKenyaFlag = '/0a51c008701078eac69e5e7b9492a3756aaacc95.svg'
const imgKenyaFlag1 = '/1436bb8ba74ca585b4615de1edfecc46e24b9c3b.svg'
const imgKenyaFlag2 = '/7f5212194fdc4b91ba26c0f170705c098a6f09cf.svg'
const imgKenyaFlag3 = '/59f1aaa9c6d312184babb9997d1c6c42073f90a1.svg'
const imgKenyaFlag4 = '/4a6a6480f2f55ea9f74d1679d2d2b7a4cc5ce0a2.svg'
const imgKenyaFlag5 = '/65d25b3e5d06b69e50a0a51a0296c8fa37d965d9.svg'
const imgKenyaFlag6 = '/3b5d432001885a6c8a937b67f8e691f1bcd6e76d.svg'
const imgKenyaFlag7 = '/0496e6d802b3d94c7f7799df6e3d206b1490cdc9.svg'
const imgRefresh = '/63c11b4fa4a2e16657ec6e89bdba8eca30f8dedf.svg'
const imgRefresh1 = '/41c54843f9b9eaf5864ba7a9396850a05958602a.svg'
const imgRefresh2 = '/6e3c367039d6748412713be86f2d7a0b98c2f9de.svg'
const imgRefresh3 = '/ea0a0c12973c60fba394af42c5b04c2cccc132a6.svg'
const imgRefresh4 = '/d28f7d51efccac48c5a29c0fcd6a811b03abcf0a.svg'
const imgInfo = '/44af10e82dec46e82a3cead95ced4d828d6c2560.svg'
const imgInfo1 = '/69aad6544b814131d35ef516fc4be8550ae314b6.svg'
const imgInfo2 = '/a5fd1364cda293d913d7ffbdc3869e1c8dc015fc.svg'
const imgInfo3 = '/87e2111bc82296194ca4abe3303a67742601d896.svg'
const imgClose = '/397f1dffb5bd0c8c5e5c8af27d3dfefc3eea8383.svg'
const imgCalendar = '/3d83a003e0b2154fd2b5f0fcdb3be83932b56167.svg'
const imgCalendar1 = '/6e4209c9cf6131186dbb41147f2655244249cf28.svg'
const imgCalendar2 = '/4f1e1cda40810a2f114a15281cdfc71f99f10c97.svg'
const imgCalendar3 = '/b92dc57555cd897ce2241f82a45fd271ed30c930.svg'
const imgLanguage = '/svg/icons/language.svg'
const imgCaretDown = '/svg/icons/caret-inactive.svg'
const imgDrag = '/a5e66ea1728273b13fcac01a04899a1051effbaf.svg'
const imgImage = '/7833b1c1d42b56fbdb5a6640820cd1d3932cbda1.svg'
const imgFile = '/file.svg'
const imgCheckmark = '/svg/icons/checkmark.svg'
const imgUpload = '/svg/icons/plus.svg'

interface UserData {
  name: string
  email: string
  avatar: string
}

interface CreateCampaignProps {
  userData?: UserData
}

// Kenya Flag Component
function MediaIconsCountry() {
  return (
    <div className="relative size-full" data-name="Property 1=kenya">
      <div className="absolute inset-0" data-name="Vector">
        <img alt="Kenya Flag" className="block max-w-none size-full" src={imgKenyaFlag} />
      </div>
      <div className="absolute bottom-[71.74%] left-[4.96%] right-[4.96%] top-0" data-name="Vector">
        <img alt="Kenya Flag" className="block max-w-none size-full" src={imgKenyaFlag1} />
      </div>
      <div className="absolute bottom-0 left-[4.96%] right-[4.96%] top-[71.74%]" data-name="Vector">
        <img alt="Kenya Flag" className="block max-w-none size-full" src={imgKenyaFlag2} />
      </div>
      <div className="absolute bottom-[34.78%] left-0 right-0 top-[34.78%]" data-name="Vector">
        <img alt="Kenya Flag" className="block max-w-none size-full" src={imgKenyaFlag3} />
      </div>
      <div className="absolute inset-[20.37%_34.43%]" data-name="Group">
        <img alt="Kenya Flag" className="block max-w-none size-full" src={imgKenyaFlag4} />
      </div>
      <div className="absolute inset-[24.87%_39.13%]" data-name="Group">
        <img alt="Kenya Flag" className="block max-w-none size-full" src={imgKenyaFlag5} />
      </div>
      <div className="absolute inset-[35.01%_34.78%_35.01%_60.87%]" data-name="Vector">
        <img alt="Kenya Flag" className="block max-w-none size-full" src={imgKenyaFlag6} />
      </div>
      <div className="absolute inset-[35.01%_60.87%_35.01%_34.78%]" data-name="Vector">
        <img alt="Kenya Flag" className="block max-w-none size-full" src={imgKenyaFlag7} />
      </div>
    </div>
  );
}

export function CreateCampaign({ userData = {
  name: 'Influence',
  email: 'talktome@fabfour.org',
  avatar: '/images/avatars/default-avatar.png'
} }: CreateCampaignProps) {
  const router = useRouter()
  const [currentStage, setCurrentStage] = useState(1)
  const [activeSection, setActiveSection] = useState<'application' | 'status' | 'campaign'>('campaign')
  const [uploadedFiles, setUploadedFiles] = useState<Array<{
    id: string
    name: string
    size: string
    progress: number
    status: 'uploading' | 'completed' | 'error'
  }>>([])
  const [showNotification, setShowNotification] = useState(false)
  const [notificationType, setNotificationType] = useState<'success' | 'error'>('success')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNavigationChange = (section: 'application' | 'status' | 'campaign') => {
    if (section === 'application') {
      router.push('/student/dashboard/application/profile')
    } else if (section === 'status') {
      router.push('/student/dashboard/application/profile')
    } else if (section === 'campaign') {
      router.push('/student/dashboard/campaign')
    }
  }

  const handleBack = () => {
    router.push('/student/dashboard/campaign')
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const fileId = Math.random().toString(36).substr(2, 9)
        const newFile = {
          id: fileId,
          name: file.name,
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          progress: 0,
          status: 'uploading' as const
        }
        
        setUploadedFiles(prev => [...prev, newFile])
        
        // Simulate upload progress
        const interval = setInterval(() => {
          setUploadedFiles(prev => 
            prev.map(f => 
              f.id === fileId 
                ? { ...f, progress: Math.min(f.progress + 10, 100) }
                : f
            )
          )
        }, 200)
        
        // Complete upload after 2 seconds
        setTimeout(() => {
          clearInterval(interval)
          setUploadedFiles(prev => 
            prev.map(f => 
              f.id === fileId 
                ? { ...f, progress: 100, status: 'completed' as const }
                : f
            )
          )
        }, 2000)
      })
    }
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const handleCampaignSubmission = async () => {
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulate success/error based on some condition
      const isSuccess = Math.random() > 0.2 // 80% success rate for demo
      
      if (isSuccess) {
        setNotificationType('success')
        setShowNotification(true)
        
        // Auto-hide notification and redirect after 3 seconds
        setTimeout(() => {
          setShowNotification(false)
          router.push('/student/dashboard/campaign')
        }, 3000)
      } else {
        setNotificationType('error')
        setShowNotification(true)
        
        // Auto-hide notification after 5 seconds
        setTimeout(() => {
          setShowNotification(false)
        }, 5000)
      }
    } catch (error) {
      setNotificationType('error')
      setShowNotification(true)
      
      setTimeout(() => {
        setShowNotification(false)
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const stages = [
    { id: 1, title: 'Describe your fundraise goals', active: currentStage === 1 },
    { id: 2, title: 'Why you\'re fundraising', active: currentStage === 2 },
    { id: 3, title: 'Share proof documents', active: currentStage === 3 }
  ]

  return (
    <div className="flex min-h-screen bg-[#eceee4]">
      <SidebarNavigation 
        currentStep={1}
        userData={userData}
        onNavigationChange={handleNavigationChange}
        activeSection={activeSection}
      />
      <div className="flex-1 p-8">
        <div className="min-h-screen bg-[#eceee4]">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-[20px] shadow-[0px_16px_32px_-8px_rgba(39,38,53,0.1)] p-8">
              {/* Top Language Selector */}
              <div className="box-border content-stretch flex flex-col gap-2.5 items-end justify-start px-5 py-0 relative shrink-0 w-full mb-8" data-node-id="448:1757">
                <div className="box-border content-stretch flex gap-2 items-center justify-center px-2 py-0 relative rounded-[999px] shrink-0" data-node-id="448:1758">
                  <div className="overflow-clip relative shrink-0 size-4" data-name="Frame" data-node-id="448:1759">
                    <div className="absolute inset-0" data-name="Vector" data-node-id="448:1760">
                      <img alt="Globe Icon" className="block max-w-none size-full" src={imgLanguage} />
                    </div>
                  </div>
                  <p className="leading-[20px] whitespace-pre text-[#272635] text-[14px]">English</p>
                </div>
              </div>

              {/* Header Section */}
              <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-start px-[120px] py-0 relative size-full mb-8" data-node-id="385:639">
                <div className="box-border content-stretch flex gap-4 items-start justify-start pb-5 pt-0 px-0 relative shrink-0 w-full" data-node-id="385:627">
                  <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(39,38,53,0.1)] border-solid inset-0 pointer-events-none" />
                  <button 
                    onClick={handleBack}
                    className="bg-[#eceee4] content-stretch flex gap-2.5 items-center justify-center relative rounded-[9999px] shrink-0 size-10 hover:bg-[#d4d6d0] transition-colors" 
                    data-node-id="385:628"
                  >
                    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="385:629">
                      <div className="[grid-area:1_/_1] ml-0 mt-0 overflow-clip relative size-4" data-name="Caret Left" data-node-id="385:630">
                        <div className="absolute inset-0" data-name="Vector">
                          <img alt="Back Arrow" className="block max-w-none size-full" src={imgBackArrow} />
                        </div>
                        <div className="absolute inset-[18.75%_37.5%_18.75%_31.25%]" data-name="Vector">
                          <div className="absolute inset-[-5%_-10%]" style={{ "--stroke-0": "rgba(39, 38, 53, 1)" } as React.CSSProperties}>
                            <img alt="Back Arrow Stroke" className="block max-w-none size-full" src={imgBackArrowStroke} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                  <div className="basis-0 content-stretch flex flex-col font-['Neue_Montreal:Regular',_sans-serif] gap-2 grow items-start justify-center leading-[0] min-h-px min-w-px not-italic relative self-stretch shrink-0" data-node-id="385:631">
                    <div className="relative shrink-0 text-[#272635] text-[24px] text-nowrap" data-node-id="385:632">
                      <p className="leading-[normal] whitespace-pre">Create Campaign</p>
                    </div>
                    <div className="min-w-full relative shrink-0 text-[16px] text-[rgba(39,38,53,0.5)]" data-node-id="385:633" style={{ width: "min-content" }}>
                      <p className="leading-[24px]">Clearly provide details to help us understand and process your fund request.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="mb-8">
                <div className="flex items-start justify-center">
                  {stages.map((stage, index) => (
                    <div key={stage.id} className="flex items-center">
                      <div className={`px-5 py-4 rounded-t-lg ${
                        stage.active 
                          ? 'bg-[#f9faf7] border-b-2 border-[#198754]' 
                          : 'bg-white border-b border-[rgba(39,38,53,0.1)]'
                      }`}>
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 flex items-center justify-center">
                            <img 
                              alt="Double Caret" 
                              className="w-full h-full" 
                              src={imgDoubleCaret} 
                            />
                          </div>
                          <span className={`text-sm font-medium ${
                            stage.active ? 'text-[#272635]' : 'text-[rgba(39,38,53,0.5)]'
                          }`}>
                            {stage.title}
                          </span>
                        </div>
                      </div>
                      {index < stages.length - 1 && (
                        <div className="w-8 h-px bg-[rgba(39,38,53,0.1)]"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              {/* Stage 1: Describe your fundraise goals */}
              {currentStage === 1 && (
                <div className="content-stretch flex flex-col gap-10 items-start justify-start relative size-full" data-node-id="374:668">
                  <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full" data-node-id="374:669">
                    <div className="bg-[#f9faf7] box-border content-stretch flex flex-col gap-4 items-start justify-end p-[20px] relative rounded-[12px] shrink-0 w-full" data-node-id="374:690">
                      <div className="content-stretch flex gap-4 items-end justify-start relative shrink-0" data-node-id="378:893">
                        <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-[252px]" data-name="Select Field" data-node-id="374:691">
                          <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#272635] text-[16px]" data-node-id="374:692" style={{ width: "min-content" }}>
                            <p className="leading-[1.4]">Your starting goal</p>
                          </div>
                          <div className="bg-white box-border content-stretch flex gap-2 h-12 items-center justify-start min-w-60 pl-4 pr-3 py-3 relative rounded-[8px] shrink-0 w-full" data-name="Select" data-node-id="374:694">
                            <div aria-hidden="true" className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]" />
                            <div className="basis-0 font-['Neue_Montreal:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#93939a] text-[14px]" data-node-id="374:695">
                              <p className="leading-none">$ Enter goal amount</p>
                            </div>
                            <div className="bg-white box-border content-stretch flex gap-2 items-center justify-center px-2 py-1 relative rounded-[999px] shrink-0" data-node-id="434:2556">
                              <div aria-hidden="true" className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-0 pointer-events-none rounded-[999px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]" />
                              <div className="overflow-clip relative shrink-0 size-4" data-name="Media Icons/Country" data-node-id="434:2587">
                                <MediaIconsCountry />
                              </div>
                              <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[16px] text-nowrap uppercase" data-node-id="434:2558">
                                <p className="leading-[normal] whitespace-pre">kes</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="content-stretch flex gap-2.5 h-12 items-center justify-start relative shrink-0" data-node-id="374:709">
                          <div className="overflow-clip relative shrink-0 size-5" data-name="Cycle" data-node-id="374:710">
                            <div className="absolute inset-0" data-name="Vector">
                              <img alt="Refresh" className="block max-w-none size-full" src={imgRefresh} />
                            </div>
                            <div className="absolute inset-[18.75%_15.63%_62.5%_65.63%]" data-name="Vector">
                              <div className="absolute inset-[-13.333%]" style={{ "--stroke-0": "rgba(147, 147, 154, 1)" } as React.CSSProperties}>
                                <img alt="Refresh" className="block max-w-none size-full" src={imgRefresh1} />
                              </div>
                            </div>
                            <div className="absolute bottom-[62.5%] left-1/4 right-[15.63%] top-[16.39%]" data-name="Vector">
                              <div className="absolute inset-[-11.84%_-4.21%]" style={{ "--stroke-0": "rgba(147, 147, 154, 1)" } as React.CSSProperties}>
                                <img alt="Refresh" className="block max-w-none size-full" src={imgRefresh2} />
                              </div>
                            </div>
                            <div className="absolute inset-[62.5%_65.63%_18.75%_15.63%]" data-name="Vector">
                              <div className="absolute inset-[-13.333%]" style={{ "--stroke-0": "rgba(147, 147, 154, 1)" } as React.CSSProperties}>
                                <img alt="Refresh" className="block max-w-none size-full" src={imgRefresh3} />
                              </div>
                            </div>
                            <div className="absolute bottom-[16.39%] left-[15.63%] right-1/4 top-[62.5%]" data-name="Vector">
                              <div className="absolute inset-[-11.84%_-4.21%]" style={{ "--stroke-0": "rgba(147, 147, 154, 1)" } as React.CSSProperties}>
                                <img alt="Refresh" className="block max-w-none size-full" src={imgRefresh4} />
                              </div>
                            </div>
                          </div>
                          <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[18px] text-[rgba(39,38,53,0.5)] text-nowrap" data-node-id="374:711">
                            <p className="leading-[normal] whitespace-pre">USD 2,540.45</p>
                          </div>
                        </div>
                      </div>
                      <div className="absolute left-[472px] overflow-clip size-3 top-4" data-name="info" data-node-id="374:712">
                        <div className="absolute inset-0" data-name="Vector">
                          <img alt="Info" className="block max-w-none size-full" src={imgInfo} />
                        </div>
                        <div className="absolute inset-[12.5%]" data-name="Vector">
                          <div className="absolute inset-[-5.556%]" style={{ "--stroke-0": "rgba(147, 147, 154, 1)" } as React.CSSProperties}>
                            <img alt="Info" className="block max-w-none size-full" src={imgInfo1} />
                          </div>
                        </div>
                        <div className="absolute inset-[46.88%_46.88%_31.25%_46.88%]" data-name="Vector">
                          <div className="absolute inset-[-19.05%_-66.67%]" style={{ "--stroke-0": "rgba(147, 147, 154, 1)" } as React.CSSProperties}>
                            <img alt="Info" className="block max-w-none size-full" src={imgInfo2} />
                          </div>
                        </div>
                        <div className="absolute inset-[28.13%_46.88%_62.5%_43.75%]" data-name="Vector">
                          <img alt="Info" className="block max-w-none size-full" src={imgInfo3} />
                        </div>
                      </div>
                      <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[14px] text-[rgba(39,38,53,0.5)]" data-node-id="378:894" style={{ width: "min-content" }}>
                        <p className="leading-[20px]">
                          <span>{`Keep in mind that transaction and service `}</span>
                          <span className="[text-underline-position:from-font] decoration-solid text-[#198754] underline">fees,</span>
                          <span>{` including credit and debit charges are deducted from each donation.`}</span>
                        </p>
                      </div>
                    </div>
                    <div className="bg-[#f9faf7] box-border content-stretch flex flex-col gap-4 items-start justify-start p-[20px] relative rounded-[12px] shrink-0 w-full" data-node-id="378:855">
                      <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full" data-node-id="378:856">
                        <div className="content-stretch flex gap-2 items-end justify-start relative shrink-0 w-full" data-node-id="378:857">
                          <div className="basis-0 content-stretch flex flex-col gap-2 grow items-start justify-start min-h-px min-w-px relative shrink-0" data-name="Select Field" data-node-id="378:858">
                            <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#272635] text-[16px]" data-node-id="378:859" style={{ width: "min-content" }}>
                              <p className="leading-[1.4]">What are your academics needs?</p>
                            </div>
                            <div className="bg-white box-border content-stretch flex gap-2 h-12 items-center justify-start min-w-60 pl-4 pr-3 py-3 relative rounded-[8px] shrink-0 w-full" data-name="Select" data-node-id="378:861">
                              <div aria-hidden="true" className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]" />
                              <div className="basis-0 font-['Neue_Montreal:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#93939a] text-[14px]" data-node-id="378:862">
                                <p className="leading-none">Purpose for the request</p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-[#eceee4] box-border content-stretch flex gap-2 h-12 items-center justify-center overflow-clip px-5 py-3 relative rounded-[8px] shrink-0" data-name="Button" data-node-id="378:876">
                            <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[16px] text-nowrap">
                              <p className="leading-none whitespace-pre">Add</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="378:930">
                        <div className="bg-white box-border content-stretch flex gap-0.5 items-center justify-start pl-3 pr-1.5 py-1 relative rounded-[8px] shrink-0" data-name="Badge" data-node-id="378:878">
                          <div aria-hidden="true" className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                          <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[14px] text-center text-nowrap">
                            <p className="leading-[20px] whitespace-pre">Accommodation</p>
                          </div>
                          <div className="box-border content-stretch flex flex-col items-start justify-start overflow-clip p-[2px] relative rounded-[9999px] shrink-0" data-name="_Badge close X">
                            <div className="overflow-clip relative shrink-0 size-3" data-name="x-close">
                              <div className="absolute inset-1/4" data-name="Icon">
                                <div className="absolute inset-[-8.333%]" style={{ "--stroke-0": "rgba(39, 38, 53, 1)" } as React.CSSProperties}>
                                  <img alt="Close" className="block max-w-none size-full" src={imgClose} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="basis-0 content-stretch flex gap-2.5 grow h-12 items-center justify-end min-h-px min-w-px relative shrink-0" data-node-id="378:921">
                          <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[18px] text-[rgba(39,38,53,0.5)] text-nowrap" data-node-id="378:931">
                            <p className="leading-[normal] whitespace-pre">0.0</p>
                          </div>
                          <div className="bg-white box-border content-stretch flex gap-2.5 items-center justify-center px-2 py-1 relative rounded-[999px] shrink-0" data-node-id="378:932">
                            <div aria-hidden="true" className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-0 pointer-events-none rounded-[999px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]" />
                            <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[16px] text-nowrap">
                              <p className="leading-[normal] whitespace-pre">KES</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#f9faf7] box-border content-stretch flex flex-col gap-2.5 items-start justify-start p-[20px] relative rounded-[12px] shrink-0 w-full" data-node-id="378:896">
                      <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0" data-name="Select Field" data-node-id="378:897">
                        <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#272635] text-[16px]" data-node-id="378:898" style={{ width: "min-content" }}>
                          <p className="leading-[1.4]">Duration of this fundraiser</p>
                        </div>
                        <div className="bg-white box-border content-stretch flex gap-2 h-12 items-center justify-start min-w-60 pl-4 pr-3 py-3 relative rounded-[8px] shrink-0 w-full" data-name="Select" data-node-id="378:900">
                          <div aria-hidden="true" className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]" />
                          <div className="basis-0 font-['Neue_Montreal:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#93939a] text-[14px]" data-node-id="378:901">
                            <p className="leading-none">Select academic year</p>
                          </div>
                          <div className="overflow-clip relative shrink-0 size-6" data-name="Calendar" data-node-id="378:902">
                            <div className="absolute inset-0" data-name="Vector">
                              <img alt="Calendar" className="block max-w-none size-full" src={imgCalendar} />
                            </div>
                            <div className="absolute inset-[15.625%]" data-name="Vector">
                              <div className="absolute inset-[-3.03%]" style={{ "--stroke-0": "rgba(147, 147, 154, 1)" } as React.CSSProperties}>
                                <img alt="Calendar" className="block max-w-none size-full" src={imgCalendar1} />
                              </div>
                            </div>
                            <div className="absolute inset-[9.38%_31.25%_78.13%_68.75%]" data-name="Vector">
                              <div className="absolute inset-[-16.67%_-0.5px]" style={{ "--stroke-0": "rgba(147, 147, 154, 1)" } as React.CSSProperties}>
                                <img alt="Calendar" className="block max-w-none size-full" src={imgCalendar2} />
                              </div>
                            </div>
                            <div className="absolute inset-[9.38%_68.75%_78.13%_31.25%]" data-name="Vector">
                              <div className="absolute inset-[-16.67%_-0.5px]" style={{ "--stroke-0": "rgba(147, 147, 154, 1)" } as React.CSSProperties}>
                                <img alt="Calendar" className="block max-w-none size-full" src={imgCalendar2} />
                              </div>
                            </div>
                            <div className="absolute inset-[34.38%_15.63%_65.63%_15.63%]" data-name="Vector">
                              <div className="absolute inset-[-0.5px_-3.03%]" style={{ "--stroke-0": "rgba(147, 147, 154, 1)" } as React.CSSProperties}>
                                <img alt="Calendar" className="block max-w-none size-full" src={imgCalendar3} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-4 items-center justify-end relative shrink-0 w-full" data-name="Actions" data-node-id="374:745">
                    <div className="content-stretch flex gap-2 items-center justify-center overflow-clip relative rounded-[8px] shrink-0" data-name="Button" data-node-id="374:746">
                      <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[16px] text-nowrap">
                        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-none underline whitespace-pre">Save to Continue Later</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setCurrentStage(2)}
                      className="bg-[#273125] h-14 relative rounded-[8px] shrink-0 hover:bg-[#1a2119] transition-colors" 
                      data-name="Button" 
                      data-node-id="374:747"
                    >
                      <div className="box-border content-stretch flex gap-2 h-14 items-center justify-center overflow-clip px-5 py-3 relative">
                        <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white">
                          <p className="leading-none whitespace-pre">Continue</p>
                        </div>
                      </div>
                      <div aria-hidden="true" className="absolute border border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    </button>
                  </div>
                </div>
              )}

              {/* Stage 2: Why you're fundraising */}
              {currentStage === 2 && (
                <div className="content-stretch flex flex-col items-start justify-between relative size-full" data-node-id="385:922">
                  <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full" data-node-id="385:923">
                    <div className="bg-[#f9faf7] box-border content-stretch flex flex-col gap-4 items-start justify-start p-[20px] relative rounded-[12px] shrink-0 w-full" data-node-id="385:924">
                      <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full" data-node-id="385:925">
                        <div className="content-stretch flex gap-2 items-end justify-start relative shrink-0 w-full" data-node-id="385:926">
                          <div className="basis-0 content-stretch flex flex-col gap-2 grow items-start justify-start min-h-px min-w-px relative shrink-0" data-name="Select Field" data-node-id="385:927">
                            <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#272635] text-[16px]" data-node-id="385:928" style={{ width: "min-content" }}>
                              <p className="leading-[1.4]">Give your fundraiser a title</p>
                            </div>
                            <div className="bg-white box-border content-stretch flex gap-2 h-12 items-center justify-start min-w-60 pl-4 pr-3 py-3 relative rounded-[8px] shrink-0 w-full" data-name="Select" data-node-id="385:930">
                              <div aria-hidden="true" className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]" />
                              <div className="basis-0 font-['Neue_Montreal:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#93939a] text-[14px]" data-node-id="385:931">
                                <p className="leading-none">Write a descriptive title</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#f9faf7] box-border content-stretch flex flex-col gap-2.5 items-start justify-start p-[20px] relative rounded-[12px] shrink-0 w-full" data-node-id="385:945">
                      <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full" data-name="Select Field" data-node-id="385:946">
                        <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#272635] text-[16px]" data-node-id="385:947" style={{ width: "min-content" }}>
                          <p className="leading-[1.4]">Tell your story</p>
                        </div>
                        <div className="bg-white h-[100px] min-w-60 relative rounded-[8px] shrink-0 w-full" data-name="Textarea" data-node-id="385:955">
                          <div className="box-border content-stretch flex h-[100px] items-start justify-start min-w-inherit overflow-clip px-4 py-3 relative w-full">
                            <div className="basis-0 font-['Neue_Montreal:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#93939a] text-[14px]" data-node-id="385:956">
                              <p className="leading-[1.4]">Add a note</p>
                            </div>
                            <div className="absolute bottom-[6.02px] right-[5.02px] size-[6.627px]" data-name="Drag" data-node-id="385:957">
                              <div className="absolute inset-[-5.33%]">
                                <img alt="Drag Handle" className="block max-w-none size-full" src={imgDrag} />
                              </div>
                            </div>
                          </div>
                          <div aria-hidden="true" className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]" />
                        </div>
                      </div>
                    </div>
                    <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[16px] w-full" data-node-id="385:958">
                      <p className="leading-[1.4]">Upload a cover photo</p>
                    </div>
                    <div className="bg-[#f9faf7] box-border content-stretch flex flex-col gap-2.5 items-start justify-start p-[20px] relative rounded-[12px] shrink-0 w-full" data-node-id="385:959">
                      <div aria-hidden="true" className="absolute border border-[rgba(39,38,53,0.1)] border-dashed inset-0 pointer-events-none rounded-[12px]" />
                      <div className="content-stretch flex flex-col gap-2 items-center justify-start relative shrink-0 w-full" data-name="Select Field" data-node-id="385:960">
                        <div className="relative shrink-0 size-7" data-name="image" data-node-id="385:961">
                          <img alt="Image Upload" className="block max-w-none size-full" src={imgImage} />
                        </div>
                        <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[14px] text-[rgba(39,38,53,0.5)] text-center" data-node-id="385:965" style={{ width: "min-content" }}>
                          <p className="leading-[1.4]">
                            <span className="[text-underline-position:from-font] decoration-solid text-[#198754] underline">Click to insert</span>
                            <span className="text-[#272635]">{` or drag and drop your photo here`}</span>
                          </p>
                        </div>
                        <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[14px] text-[rgba(39,38,53,0.5)] text-center" data-node-id="385:966" style={{ width: "min-content" }}>
                          <p className="leading-[1.4]">Maximum file size is 20MB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-4 items-center justify-between relative shrink-0 w-full" data-name="Actions" data-node-id="385:967">
                    <button 
                      onClick={() => setCurrentStage(1)}
                      className="content-stretch flex gap-2 items-center justify-center overflow-clip relative rounded-[8px] shrink-0" 
                      data-name="Button" 
                      data-node-id="385:968"
                    >
                      <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[16px] text-nowrap">
                        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-none underline whitespace-pre">Back</p>
                      </div>
                    </button>
                    <div className="flex gap-4 items-center">
                      <div className="content-stretch flex gap-2 items-center justify-center overflow-clip relative rounded-[8px] shrink-0" data-name="Button" data-node-id="385:968">
                        <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[16px] text-nowrap">
                          <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-none underline whitespace-pre">Save to Continue Later</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setCurrentStage(3)}
                        className="bg-[#273125] h-14 relative rounded-[8px] shrink-0 hover:bg-[#1a2119] transition-colors" 
                        data-name="Button" 
                        data-node-id="385:969"
                      >
                        <div className="box-border content-stretch flex gap-2 h-14 items-center justify-center overflow-clip px-5 py-3 relative">
                          <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white">
                            <p className="leading-none whitespace-pre">Continue</p>
                          </div>
                        </div>
                        <div aria-hidden="true" className="absolute border border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[8px]" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Stage 3: Share proof documents */}
              {currentStage === 3 && (
                <div className="content-stretch flex flex-col items-start justify-between relative size-full" data-node-id="385:1064">
                  <div className="content-stretch flex flex-col gap-6 items-start justify-start relative shrink-0 w-full" data-node-id="385:1065">
                    {/* Header Section */}
                    <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full" data-node-id="385:1065">
                      <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[24px] w-full" data-node-id="385:1066">
                        <p className="leading-[1.4] font-semibold">Boost Credibility With Donors</p>
                      </div>
                      <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[16px] w-full" data-node-id="385:1067">
                        <p className="leading-[1.4]">Clearly provide details to help us understand and process your fund request.</p>
                      </div>
                    </div>

                    {/* Divider Line */}
                    <div className="bg-[rgba(39,38,53,0.1)] h-px w-full" data-node-id="385:1068"></div>

                    {/* Document Upload Section */}
                    <div className="content-stretch flex flex-col gap-6 items-start justify-start relative shrink-0 w-full" data-node-id="385:1069">
                      <div className="content-stretch flex flex-col gap-6 items-start justify-start relative shrink-0 w-full" data-node-id="385:1070">
                        <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[18px] w-full" data-node-id="385:1105">
                          <p className="leading-[1.4] font-semibold">Add documents</p>
                        </div>
                        
                        {/* Document Upload Area - Only show if no files uploaded */}
                        {uploadedFiles.length === 0 && (
                          <div className="bg-[#f9faf7] box-border content-stretch flex flex-col gap-4 items-start justify-start p-6 relative rounded-[12px] shrink-0 w-full" data-node-id="385:1106">
                            <div className="content-stretch flex flex-col gap-4 items-center justify-start relative shrink-0 w-full" data-name="Select Field" data-node-id="385:1107">
                              <div className="relative shrink-0 size-7" data-name="image" data-node-id="385:1108">
                                <img alt="Image Upload" className="block max-w-none size-full" src={imgImage} />
                              </div>
                              <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(39,38,53,0.5)] text-center w-full" data-node-id="385:1112">
                                <p className="leading-[1.4]">
                                  <span className="[text-underline-position:from-font] decoration-solid text-[#198754] underline">Click to insert</span>
                                  <span className="text-[#272635]">{` or drag and drop your photo here`}</span>
                                </p>
                              </div>
                              <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(39,38,53,0.5)] text-center w-full" data-node-id="385:1113">
                                <p className="leading-[1.4]">Maximum file size is 20MB</p>
                              </div>
                            </div>
                            <input
                              type="file"
                              multiple
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              onChange={handleFileUpload}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                          </div>
                        )}
                        
                        {/* File Queue - Show uploaded files */}
                        {uploadedFiles.length > 0 && (
                          <div className="content-stretch flex flex-col gap-4 items-start justify-start relative shrink-0 w-full" data-node-id="387:4073">
                            {uploadedFiles.map((file) => (
                              <div key={file.id} className="bg-white box-border content-stretch flex flex-col gap-4 items-start justify-start p-4 relative rounded-[8px] shrink-0 w-full border border-[rgba(39,38,53,0.1)]" data-node-id="387:4074">
                                <div className="content-stretch flex gap-4 items-start justify-start relative shrink-0 w-full" data-node-id="472:4055">
                                  <div className="relative shrink-0 size-10" data-name="File type icon" data-node-id="472:4056">
                                    <img alt="File Icon" className="block max-w-none size-full" src={imgFile} />
                                  </div>
                                  <div className="content-stretch flex flex-col gap-4 grow items-start justify-start relative shrink-0" data-node-id="472:4057">
                                    <div className="content-stretch flex gap-4 items-center justify-between relative shrink-0 w-full" data-node-id="472:4084">
                                      <div className="content-stretch flex flex-col gap-1 items-start justify-start relative shrink-0" data-node-id="472:4058">
                                        <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[14px]" data-node-id="472:4059">
                                          <p className="leading-[1.4]">{file.name}</p>
                                        </div>
                                        <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[rgba(39,38,53,0.5)] text-[12px]" data-node-id="472:4060">
                                          <p className="leading-[1.4]">{file.size}</p>
                                        </div>
                                      </div>
                                      <button
                                        onClick={() => removeFile(file.id)}
                                        className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-red-500 text-[12px] underline hover:text-red-600 transition-colors" 
                                        data-node-id="472:4075"
                                      >
                                        <p className="leading-[1.4]">Remove</p>
                                      </button>
                                    </div>
                                    
                                    {/* Progress Bar */}
                                    <div className="content-stretch flex flex-col gap-1 items-start justify-start relative shrink-0 w-full" data-node-id="472:4061">
                                      <div className="bg-[rgba(39,38,53,0.1)] h-1 w-full rounded-full overflow-hidden">
                                        <div 
                                          className={`h-full transition-all duration-300 ${
                                            file.status === 'completed' ? 'bg-[#198754]' : 
                                            file.status === 'error' ? 'bg-red-500' : 'bg-[#198754]'
                                          }`}
                                          style={{ width: `${file.progress}%` }}
                                        />
                                      </div>
                                      <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[rgba(39,38,53,0.5)] text-[12px]" data-node-id="472:4062">
                                        <p className="leading-[1.4]">
                                          {file.status === 'uploading' ? `Uploading... ${file.progress}%` :
                                           file.status === 'completed' ? 'Upload completed' :
                                           file.status === 'error' ? 'Upload failed' : ''}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                            
                            {/* Add More Files Button */}
                            <button 
                              onClick={() => document.getElementById('file-upload')?.click()}
                              className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#198754] text-[14px] underline hover:text-[#146c43] transition-colors" 
                              data-node-id="472:4043"
                            >
                              <p className="leading-[1.4]">Add more documents</p>
                            </button>
                            
                            <input
                              id="file-upload"
                              type="file"
                              multiple
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              onChange={handleFileUpload}
                              className="hidden"
                            />
                          </div>
                        )}
                        
                        {/* Guidelines Text */}
                        <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[14px] w-full" data-node-id="387:639">
                          <p className="leading-[1.4]">Example of document that can help boost your credibility are: admission offer letters, semester exam reports, attestations from your course advisor or lecturer. Read more on our guidelines for sharing documents</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="content-stretch flex gap-4 items-center justify-between relative shrink-0 w-full" data-name="Actions" data-node-id="385:1114">
                    <button 
                      onClick={() => setCurrentStage(2)}
                      className="content-stretch flex gap-2 items-center justify-center overflow-clip relative rounded-[8px] shrink-0" 
                      data-name="Button" 
                      data-node-id="387:742"
                    >
                      <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[16px] text-nowrap" id="node-I387_742-34_12137">
                        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-none underline whitespace-pre">Save to Continue Later</p>
                      </div>
                    </button>
                    <button 
                      onClick={handleCampaignSubmission}
                      disabled={isSubmitting}
                      className={`h-14 relative rounded-[8px] shrink-0 transition-colors ${
                        isSubmitting 
                          ? 'bg-[#6c757d] cursor-not-allowed' 
                          : 'bg-[#198754] hover:bg-[#146c43]'
                      }`}
                      data-name="Button" 
                      data-node-id="385:1116"
                    >
                      <div className="box-border content-stretch flex gap-2 h-14 items-center justify-center overflow-clip px-5 py-3 relative">
                        <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap text-white">
                          <p className="leading-none whitespace-pre">
                            {isSubmitting ? 'Creating Campaign...' : 'Create Campaign'}
                          </p>
                        </div>
                      </div>
                      <div aria-hidden="true" className="absolute border border-[#146c43] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Footer */}
            <div className="box-border content-stretch flex flex-col gap-2.5 h-px items-end justify-end px-5 py-0 relative shrink-0 w-full mt-8" data-node-id="448:1764">
              <div className="content-stretch flex font-['Neue_Montreal:Regular',_sans-serif] gap-5 items-center justify-start leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(39,38,53,0.5)] text-nowrap" data-node-id="448:1765">
                <div className="relative shrink-0" data-node-id="448:1766">
                  <p className="leading-[normal] text-nowrap whitespace-pre">Terms</p>
                </div>
                <div className="relative shrink-0" data-node-id="448:1767">
                  <p className="leading-[normal] text-nowrap whitespace-pre">Legal</p>
                </div>
                <div className="relative shrink-0" data-node-id="448:1768">
                  <p className="leading-[normal] text-nowrap whitespace-pre">Privacy policy</p>
                </div>
                <div className="relative shrink-0" data-node-id="448:1769">
                  <p className="leading-[normal] text-nowrap whitespace-pre">Cookie policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
          <div className={`px-6 py-4 rounded-lg shadow-lg max-w-sm ${
            notificationType === 'success' 
              ? 'bg-[#198754] text-white' 
              : 'bg-red-500 text-white'
          }`}>
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                {notificationType === 'success' ? (
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#198754]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                    <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">
                  {notificationType === 'success' 
                    ? 'Campaign created successfully!' 
                    : 'Failed to create campaign. Please try again.'}
                </p>
                <p className="text-xs opacity-90 mt-1">
                  {notificationType === 'success' 
                    ? 'Your campaign is now live and ready to receive donations.' 
                    : 'There was an error processing your request.'}
                </p>
              </div>
              <button
                onClick={() => setShowNotification(false)}
                className="flex-shrink-0 ml-2 text-white hover:text-gray-200 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
