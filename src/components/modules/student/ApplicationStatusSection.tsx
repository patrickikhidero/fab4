import React from 'react'

interface Comment {
  id: string
  name: string
  timestamp: string
  message: string
  avatar: string
}

interface ApplicationStatusSectionProps {
  comments?: Comment[]
}

export function ApplicationStatusSection({ comments = [] }: ApplicationStatusSectionProps) {
  // Default comment data based on Figma design
  const defaultComments: Comment[] = [
    {
      id: '1',
      name: 'Katherine Moss',
      timestamp: 'Thursday 11:40am',
      message: "Hey Olivia, I've finished with the requirements doc! I made some notes in the gdoc as well for Phoenix to look over.",
      avatar: '/images/avatars/default-avatar.png'
    }
  ]

  const displayComments = comments.length > 0 ? comments : defaultComments

  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-20 items-center justify-start overflow-clip px-0 py-5 relative rounded-[20px] shadow-[0px_16px_32px_-8px_rgba(39,38,53,0.1)] size-full" data-name="Main" data-node-id="474:5262">
      {/* Top Language Selector */}
      <div className="box-border content-stretch flex flex-col gap-2.5 items-end justify-start px-5 py-0 relative shrink-0 w-full" data-node-id="474:5263">
        <div className="box-border content-stretch flex gap-2 items-center justify-center px-2 py-0 relative rounded-[999px] shrink-0" data-node-id="474:5264">
          <div className="overflow-clip relative shrink-0 size-4" data-name="Frame" data-node-id="474:5265">
            <div className="absolute inset-0" data-name="Vector" data-node-id="474:5266">
              <img alt="Globe Icon" className="block max-w-none size-full" src="/svg/ui/globe.svg" />
            </div>
            <div className="absolute h-[11.5px] left-0.5 top-0.5 w-[13px]" data-name="Language" data-node-id="474:5267">
              <div className="absolute bottom-0 left-[46.15%] right-0 top-[39.13%]" data-name="Vector" id="node-I474_5267-435_2751">
                <div className="absolute inset-[-7.14%]" style={{ "--stroke-0": "rgba(39, 38, 53, 1)" } as React.CSSProperties}>
                  <img alt="Language Icon" className="block max-w-none size-full" src="/svg/ui/language.svg" />
                </div>
              </div>
              <div className="absolute inset-[82.61%_7.69%_17.39%_53.85%]" data-name="Vector" id="node-I474_5267-435_2752">
                <div className="absolute inset-[-0.5px_-10%]" style={{ "--stroke-0": "rgba(39, 38, 53, 1)" } as React.CSSProperties}>
                  <img alt="Language Icon 2" className="block max-w-none size-full" src="/svg/ui/language1.svg" />
                </div>
              </div>
              <div className="absolute bottom-[86.96%] left-[30.77%] right-[69.23%] top-0" data-name="Vector" id="node-I474_5267-435_2753">
                <div className="absolute inset-[-33.33%_-0.5px]" style={{ "--stroke-0": "rgba(39, 38, 53, 1)" } as React.CSSProperties}>
                  <img alt="Language Icon 3" className="block max-w-none size-full" src="/svg/ui/language2.svg" />
                </div>
              </div>
              <div className="absolute bottom-[86.96%] left-0 right-[38.46%] top-[13.04%]" data-name="Vector" id="node-I474_5267-435_2754">
                <div className="absolute inset-[-0.5px_-6.25%]" style={{ "--stroke-0": "rgba(39, 38, 53, 1)" } as React.CSSProperties}>
                  <img alt="Language Icon 4" className="block max-w-none size-full" src="/svg/ui/language3.svg" />
                </div>
              </div>
              <div className="absolute bottom-[34.78%] left-0 right-[53.85%] top-[13.04%]" data-name="Vector" id="node-I474_5267-435_2755">
                <div className="absolute inset-[-8.333%]" style={{ "--stroke-0": "rgba(39, 38, 53, 1)" } as React.CSSProperties}>
                  <img alt="Language Icon 5" className="block max-w-none size-full" src="/svg/ui/language4.svg" />
                </div>
              </div>
              <div className="absolute inset-[30.43%_38.46%_34.78%_18.02%]" data-name="Vector" id="node-I474_5267-435_2756">
                <div className="absolute inset-[-12.5%_-8.84%]" style={{ "--stroke-0": "rgba(39, 38, 53, 1)" } as React.CSSProperties}>
                  <img alt="Language Icon 6" className="block max-w-none size-full" src="/svg/ui/language5.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[14px] text-nowrap" data-node-id="474:5268">
            <p className="leading-[20px] whitespace-pre">English</p>
          </div>
          <div className="overflow-clip relative shrink-0 size-4" data-name="Filled Caret Down" data-node-id="474:5269">
            <div className="absolute inset-0" data-name="Vector" id="node-I474_5269-284_1327">
              <img alt="Dropdown Arrow" className="block max-w-none size-full" src="/svg/ui/language6.svg" />
            </div>
            <div className="absolute inset-[34.38%_15.63%_28.12%_15.62%]" data-name="Vector" id="node-I474_5269-284_1328">
              <img alt="Caret Down" className="block max-w-none size-full" src="/svg/icons/dropdown-arrow.svg" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="box-border content-stretch flex flex-col gap-5 items-center justify-start px-[280px] py-0 relative shrink-0 w-full" data-node-id="474:5270">
        {/* Application Title and Badge */}
        <div className="content-stretch flex gap-5 items-start justify-center relative shrink-0 w-full" data-node-id="474:5505">
          <div className="basis-0 content-stretch flex flex-col font-['Neue_Montreal:Regular',_sans-serif] gap-2 grow items-start justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0" data-node-id="474:5491">
            <div className="relative shrink-0 text-[#272635] text-[24px] text-nowrap" data-node-id="474:5492">
              <p className="leading-[normal] whitespace-pre">Your Application</p>
            </div>
            <div className="min-w-full relative shrink-0 text-[16px] text-[rgba(39,38,53,0.5)]" data-node-id="474:5493" style={{ width: "min-content" }}>
              <p className="leading-[24px]">Clearly provide details to help us understand and process your fund request.</p>
            </div>
          </div>
          <div className="bg-[#fbfbe9] box-border content-stretch flex flex-col gap-2 items-center justify-center px-2 py-1 relative rounded-[12px] shrink-0" data-name="Badge" data-node-id="476:5636">
            <div className="content-stretch flex gap-1 items-center justify-center relative shrink-0" data-name="Container" id="node-I476_5636-1913_29448">
              <div className="flex flex-col font-['Neue_Montreal:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#272635] text-[12px] text-center text-nowrap tracking-[-0.06px]" id="node-I476_5636-1913_29451">
                <p className="leading-[1.45] whitespace-pre">Under review</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="h-0 relative shrink-0 w-full" data-node-id="474:5274">
          <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
            <img alt="Divider Line" className="block max-w-none size-full" src="/svg/decoration/divider-line1.svg" />
          </div>
        </div>

        {/* Status Cards Container */}
        <div className="content-stretch flex flex-col gap-5 items-start justify-start relative shrink-0 w-full" data-node-id="475:5524">
          {/* Applicant Identification Card */}
          <div className="bg-[#f9faf7] box-border content-stretch flex flex-col gap-5 items-start justify-start p-[20px] relative rounded-[12px] shrink-0 w-full" data-node-id="476:5654">
            <div className="content-stretch flex gap-2 items-start justify-start relative shrink-0 w-full" data-node-id="475:5610">
              <div className="basis-0 content-stretch flex flex-col font-['Neue_Montreal:Regular',_sans-serif] gap-2 grow items-start justify-start leading-[0] min-h-px min-w-px not-italic relative shrink-0" data-node-id="476:5623">
                <div className="relative shrink-0 text-[#272635] text-[20px] w-full" data-node-id="475:5611">
                  <p className="leading-[28px]">Applicant Identification</p>
                </div>
                <div className="relative shrink-0 text-[14px] text-[rgba(39,38,53,0.5)] w-full" data-node-id="475:5612">
                  <p className="leading-[20px]">This helps us learn more about you if eligible for our program</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-1 items-center justify-center relative shrink-0" data-name="Connector wrap" data-node-id="476:5614">
                <div className="relative shrink-0 size-6" data-name="clock_loader_40" data-node-id="476:5615">
                  <img alt="Clock Loader" className="block max-w-none size-full" src="/svg/icons/clock-loader.svg" />
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full" data-node-id="476:5657">
              <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[14px] uppercase w-full" data-node-id="476:5655">
                <p className="leading-[normal]">Comments</p>
              </div>
              <div className="content-stretch flex items-start justify-start relative shrink-0 w-full" data-name="Row" data-node-id="476:5643">
                {displayComments.map((comment) => (
                  <div key={comment.id} className="basis-0 content-stretch flex gap-3 grow items-start justify-start max-w-[560px] min-h-px min-w-px relative shrink-0" data-name="Message" data-node-id="476:5644">
                    <div className="bg-[#c0c6dd] bg-[position:50%_50%,_0%_0%] bg-size-[cover,auto] relative rounded-[8420.21px] shrink-0 size-[25.6px]" data-name="Avatar" data-node-id="476:5645" style={{ backgroundImage: `url('${comment.avatar}')` }}>
                      <div aria-hidden="true" className="absolute border-0 border-[rgba(39,38,53,0.05)] border-solid inset-0 pointer-events-none rounded-[8420.21px] shadow-[0px_0.8px_3.2px_0px_rgba(12,12,13,0.05)]" />
                    </div>
                    <div className="basis-0 content-stretch flex flex-col gap-1.5 grow items-start justify-start min-h-px min-w-px relative shrink-0" data-name="Content" data-node-id="476:5646">
                      <div className="content-stretch flex font-['Neue_Montreal:Regular',_sans-serif] gap-2 items-center justify-start leading-[0] not-italic relative shrink-0 text-nowrap w-full" data-name="Name and time" data-node-id="476:5647">
                        <div className="basis-0 grow min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[#272635] text-[14px]" data-node-id="476:5648">
                          <p className="[text-overflow:inherit] [text-wrap-mode:inherit] [white-space-collapse:inherit] leading-[20px] overflow-inherit">{comment.name}</p>
                        </div>
                        <div className="relative shrink-0 text-[12px] text-[rgba(39,38,53,0.5)]" data-node-id="474:5649">
                          <p className="leading-[18px] text-nowrap whitespace-pre">{comment.timestamp}</p>
                        </div>
                      </div>
                      <div className="bg-white relative rounded-bl-[8px] rounded-br-[8px] rounded-tr-[8px] shrink-0 w-full" data-name="Input" data-node-id="476:5650">
                        <div className="box-border content-stretch flex gap-2 items-center justify-start overflow-clip px-3.5 py-2.5 relative w-full">
                          <div className="basis-0 font-['Neue_Montreal:Regular',_sans-serif] grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#272635] text-[16px]" data-node-id="476:5651">
                            <p className="leading-[24px]">{comment.message}</p>
                          </div>
                        </div>
                        <div aria-hidden="true" className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-0 pointer-events-none rounded-bl-[8px] rounded-br-[8px] rounded-tr-[8px]" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Admission Confirmation Card */}
          <div className="bg-[#f9faf7] box-border content-stretch flex flex-col gap-5 items-start justify-start p-[20px] relative rounded-[12px] shrink-0 w-full" data-node-id="476:5658">
            <div className="content-stretch flex gap-2 items-start justify-start relative shrink-0 w-full" data-node-id="476:5659">
              <div className="basis-0 content-stretch flex flex-col font-['Neue_Montreal:Regular',_sans-serif] gap-2 grow items-start justify-start leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[rgba(39,38,53,0.5)]" data-node-id="476:5660">
                <div className="relative shrink-0 text-[20px] w-full" data-node-id="476:5661">
                  <p className="leading-[28px]">Admission Confirmation</p>
                </div>
                <div className="relative shrink-0 text-[14px] w-full" data-node-id="476:5662">
                  <p className="leading-[20px]">We verify all the information and documents you provided to be sure you&apos;re a perfect gentleman</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-1 items-center justify-center relative shrink-0" data-name="Connector wrap" data-node-id="476:5679">
                <div className="relative shrink-0 size-6" data-name="donut_large" data-node-id="476:5680">
                  <img alt="Donut Large" className="block max-w-none size-full" src="/svg/icons/donut-large.svg" />
                </div>
              </div>
            </div>
          </div>

          {/* Review Guarantors Card */}
          <div className="bg-[#f9faf7] box-border content-stretch flex flex-col gap-5 items-start justify-start p-[20px] relative rounded-[12px] shrink-0 w-full" data-node-id="476:5684">
            <div className="content-stretch flex gap-2 items-start justify-start relative shrink-0 w-full" data-node-id="476:5685">
              <div className="basis-0 content-stretch flex flex-col font-['Neue_Montreal:Regular',_sans-serif] gap-2 grow items-start justify-start leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[rgba(39,38,53,0.5)]" data-node-id="476:5686">
                <div className="relative shrink-0 text-[20px] w-full" data-node-id="476:5687">
                  <p className="leading-[28px]">Review Guarantors</p>
                </div>
                <div className="relative shrink-0 text-[14px] w-full" data-node-id="476:5688">
                  <p className="leading-[20px]">We want to be sure your guarantors trust you as much as we trust you</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-1 items-center justify-center relative shrink-0" data-name="Connector wrap" data-node-id="476:5689">
                <div className="relative shrink-0 size-6" data-name="donut_large" data-node-id="476:5690">
                  <img alt="Donut Large" className="block max-w-none size-full" src="/svg/icons/donut-large.svg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="basis-0 box-border content-stretch flex flex-col gap-2.5 grow items-end justify-end min-h-px min-w-px px-5 py-0 relative shrink-0 w-full" data-node-id="474:5429">
        <div className="content-stretch flex font-['Neue_Montreal:Regular',_sans-serif] gap-5 items-center justify-start leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(39,38,53,0.5)] text-nowrap" data-node-id="474:5430">
          <div className="relative shrink-0" data-node-id="474:5431">
            <p className="leading-[normal] text-nowrap whitespace-pre">Terms</p>
          </div>
          <div className="relative shrink-0" data-node-id="474:5432">
            <p className="leading-[normal] text-nowrap whitespace-pre">Legal</p>
          </div>
          <div className="relative shrink-0" data-node-id="474:5433">
            <p className="leading-[normal] text-nowrap whitespace-pre">Privacy policy</p>
          </div>
          <div className="relative shrink-0" data-node-id="474:5434">
            <p className="leading-[normal] text-nowrap whitespace-pre">Cookie policy</p>
          </div>
        </div>
      </div>
    </div>
  )
}
