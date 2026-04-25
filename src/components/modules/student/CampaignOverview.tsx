'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarNavigation } from './SidebarNavigation'

// Image assets from Figma design - using correct public folder paths
const imgArrow = "/29a615b320e09cd458090219f8e83fd794a5404f.svg"
const imgArrow1 = "/1763841bb245d3b7f2dc8db8079ee0686b7664af.svg"
const imgArrow2 = "/405a8c19d5f6673a8a5391077b715ebb72246911.svg"
const imgRing = "/511895c63440a205bff0d84c48812d96c04dde9f.svg"
const imgLine1 = "/f1485ba9c642cd505ed93e33186ec08e310dce13.svg"
const imgUsers = "/77732e3e998572eabf9798e67462c7ef2ca5f194.svg"
const imgCaretLeft = "/56081696a1312ef9611e978678f37ddf156bff77.svg"
const imgCaretRight = "/5bdd3bf8706f1d9ca913b8414ffc8824726bba6b.svg"

interface UserData {
  name: string
  email: string
  avatar: string
}

interface CampaignMetrics {
  goal: number
  raised: number
  donors: number
  status: 'active' | 'under-review' | 'completed' | 'paused'
  academicYear: string
  weeklyGrowth: number
  monthlyGrowth: number
}

interface Donor {
  id: string
  name: string
  amount: number
  date: string
  type: 'guardian' | 'good-samaritan' | 'anonymous'
  status: 'completed' | 'pending' | 'failed'
}

interface CampaignOverviewProps {
  userData?: UserData
}

// Sample data structure
const sampleCampaignMetrics: CampaignMetrics = {
  goal: 2654.68,
  raised: 15823,
  donors: 24,
  status: 'under-review',
  academicYear: '2024/2025',
  weeklyGrowth: 106.50,
  monthlyGrowth: 1206.50
}

const sampleDonors: Donor[] = [
  {
    id: '1',
    name: 'Olivia Rhye',
    amount: 150.00,
    date: '9/4/12',
    type: 'good-samaritan',
    status: 'completed'
  },
  {
    id: '2',
    name: 'Anonymous',
    amount: 150.00,
    date: '9/4/12',
    type: 'anonymous',
    status: 'completed'
  },
  {
    id: '3',
    name: 'Abdul Mustapha',
    amount: 150.00,
    date: '9/4/12',
    type: 'guardian',
    status: 'completed'
  },
  {
    id: '4',
    name: 'Nkrumah Abbey',
    amount: 150.00,
    date: '9/4/12',
    type: 'good-samaritan',
    status: 'completed'
  },
  {
    id: '5',
    name: 'Sarah Johnson',
    amount: 200.00,
    date: '8/4/12',
    type: 'guardian',
    status: 'completed'
  },
  {
    id: '6',
    name: 'Michael Chen',
    amount: 100.00,
    date: '7/4/12',
    type: 'good-samaritan',
    status: 'completed'
  },
  {
    id: '7',
    name: 'Anonymous',
    amount: 75.00,
    date: '6/4/12',
    type: 'anonymous',
    status: 'completed'
  },
  {
    id: '8',
    name: 'David Wilson',
    amount: 300.00,
    date: '5/4/12',
    type: 'guardian',
    status: 'completed'
  }
]

export function CampaignOverview({ userData = {
  name: 'Influence',
  email: 'talktome@fabfour.org',
  avatar: '/images/avatars/default-avatar.png'
} }: CampaignOverviewProps) {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState<'application' | 'status' | 'campaign'>('campaign')
  const [activeTab, setActiveTab] = useState<'all' | 'guardians' | 'good-samaritans'>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(4)
  
  // Use sample data
  const campaignMetrics = sampleCampaignMetrics
  const allDonors = sampleDonors
  
  // Filter donors based on active tab
  const filteredDonors = allDonors.filter(donor => {
    if (activeTab === 'all') return true
    if (activeTab === 'guardians') return donor.type === 'guardian'
    if (activeTab === 'good-samaritans') return donor.type === 'good-samaritan'
    return true
  })
  
  // Pagination
  const totalPages = Math.ceil(filteredDonors.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedDonors = filteredDonors.slice(startIndex, startIndex + itemsPerPage)
  
  // Calculate donor counts
  const donorCounts = {
    all: allDonors.length,
    guardians: allDonors.filter(d => d.type === 'guardian').length,
    'good-samaritans': allDonors.filter(d => d.type === 'good-samaritan').length
  }

  const handleNavigationChange = (section: 'application' | 'status' | 'campaign') => {
    if (section === 'application') {
      router.push('/student/dashboard/application/profile')
    } else if (section === 'status') {
      router.push('/student/application-status')
    } else if (section === 'campaign') {
      router.push('/student/dashboard/campaign')
    }
    setActiveSection(section)
  }

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
                      <img alt="Globe Icon" className="block max-w-none size-full" src="/svg/ui/globe.svg" />
                    </div>
                  </div>
                  <p className="leading-[20px] whitespace-pre text-[#272635] text-[14px]">English</p>
                </div>
              </div>

            {/* Header Section */}
            <div className="content-stretch flex items-center justify-between relative size-full mb-8" data-node-id="456:10057">
              <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[28px] text-nowrap" data-node-id="456:10058">
                <p className="leading-[normal] whitespace-pre">Campaign</p>
              </div>
              <div 
                className="content-stretch flex gap-2 items-center justify-center overflow-clip relative rounded-[8px] shrink-0 cursor-pointer hover:bg-gray-50 transition-colors" 
                data-name="Button" 
                data-node-id="456:10059"
                onClick={() => router.push('/student/dashboard/campaign/create')}
              >
                <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[16px] text-nowrap" id="node-I456_10059-34_12137">
                  <p className="leading-none whitespace-pre">Create Campaign</p>
                </div>
                <div className="overflow-clip relative shrink-0 size-5" data-name="Arrow Right Up" id="node-I456_10059-34_12138">
                  <div className="absolute inset-0" data-name="Vector" id="node-I456_10059-34_12138-274_534">
                    <img alt="Arrow" className="block max-w-none size-full" src={imgArrow} />
                  </div>
                  <div className="absolute inset-1/4" data-name="Vector" id="node-I456_10059-34_12138-274_535">
                    <div className="absolute inset-[-6.25%]">
                      <img alt="Arrow Detail" className="block max-w-none size-full" src={imgArrow1} />
                    </div>
                  </div>
                  <div className="absolute bottom-[34.38%] left-[34.38%] right-1/4 top-1/4" data-name="Vector" id="node-I456_10059-34_12138-274_536">
                    <div className="absolute inset-[-7.692%]">
                      <img alt="Arrow Detail 2" className="block max-w-none size-full" src={imgArrow2} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Overview Section */}
            <div className="content-stretch flex gap-10 items-start justify-start relative size-full mb-8" data-node-id="456:10060">
              <div className="content-stretch flex flex-col font-['Neue_Montreal:Regular',_sans-serif] gap-2 items-start justify-start leading-[0] not-italic relative shrink-0" data-node-id="456:10061">
                <div className="relative shrink-0 text-[#272635] text-[18px] text-nowrap uppercase" data-node-id="456:10062">
                  <p className="leading-[normal] whitespace-pre">overview of campaigns</p>
                </div>
                <div className="relative shrink-0 text-[16px] text-[rgba(39,38,53,0.5)] w-[277px]" data-node-id="456:10063">
                  <p className="leading-[24px]">This is the performance of all campaign created for you over the period of your academics</p>
                </div>
              </div>
              <div className="basis-0 content-stretch flex gap-5 grow items-start justify-start min-h-px min-w-px relative shrink-0" data-node-id="456:10064">
                {/* Campaign Goal Card */}
                <div className="basis-0 box-border content-stretch flex flex-col grow items-start justify-between min-h-px min-w-px p-[16px] relative rounded-[12px] self-stretch shrink-0" data-node-id="456:10065">
                  <div aria-hidden="true" className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]" />
                  <div className="content-stretch flex gap-2.5 items-start justify-start relative shrink-0 w-full" data-node-id="456:10066">
                    <div className="basis-0 content-stretch flex flex-col font-['Neue_Montreal:Regular',_sans-serif] gap-2 grow items-start justify-start leading-[0] min-h-px min-w-px not-italic relative shrink-0" data-node-id="456:10067">
                      <div className="content-stretch flex gap-2 items-center justify-start relative shrink-0 w-full" data-node-id="456:10068">
                        <div className="relative shrink-0 text-[#272635] text-[14px] uppercase" data-node-id="456:10069">
                          <p className="leading-[normal]">campaign goal</p>
                        </div>
                        <div className="bg-yellow-100 px-2 py-1 rounded-full" data-node-id="456:10070">
                          <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[10px] text-nowrap" data-node-id="456:10071">
                            <p className="leading-[normal] whitespace-pre">Under review</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative shrink-0 text-[28px] text-[#272635] w-full" data-node-id="456:10072">
                        <p className="leading-[normal]">${campaignMetrics.goal.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-0 relative shrink-0 w-full" data-node-id="456:10075">
                    <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                      <img alt="Icon" className="block max-w-none size-full" src={imgLine1} />
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start justify-start relative shrink-0 w-full" data-node-id="456:10076">
                    <div className="content-stretch flex gap-2 items-center justify-start relative shrink-0 w-full" data-node-id="456:10077">
                      <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#198754] text-[12px] text-nowrap" data-node-id="456:10078">
                        <p className="leading-[normal] whitespace-pre">View Status</p>
                      </div>
                      <div className="overflow-clip relative shrink-0 size-4" data-name="Arrow Right" data-node-id="456:10079">
                        <div className="absolute inset-0" data-name="Vector">
                          <img alt="Arrow" className="block max-w-none size-full" src={imgArrow} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overall Campaigns Card */}
                <div className="basis-0 box-border content-stretch flex flex-col grow items-start justify-between min-h-px min-w-px p-[16px] relative rounded-[12px] self-stretch shrink-0" data-node-id="456:10080">
                  <div aria-hidden="true" className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]" />
                  <div className="content-stretch flex gap-2.5 items-start justify-start relative shrink-0 w-full" data-node-id="456:10081">
                    <div className="basis-0 content-stretch flex flex-col font-['Neue_Montreal:Regular',_sans-serif] gap-2 grow items-start justify-start leading-[0] min-h-px min-w-px not-italic relative shrink-0" data-node-id="456:10082">
                      <div className="content-stretch flex gap-2 items-center justify-start relative shrink-0 w-full" data-node-id="456:10083">
                        <div className="relative shrink-0 size-8" data-name="Users Icon" data-node-id="456:10084">
                          <img alt="Users" className="block max-w-none size-full" src={imgUsers} />
                        </div>
                        <div className="relative shrink-0 text-[#272635] text-[14px] uppercase" data-node-id="456:10085">
                          <p className="leading-[normal]">overall campaigns</p>
                        </div>
                      </div>
                      <div className="relative shrink-0 text-[28px] text-[#272635] w-full" data-node-id="456:10086">
                        <p className="leading-[normal]">${campaignMetrics.raised.toLocaleString()}</p>
                      </div>
                      <div className="content-stretch flex gap-2 items-center justify-start relative shrink-0 w-full" data-node-id="456:10087">
                        <div className="relative shrink-0 size-4" data-name="Calendar Icon" data-node-id="456:10088">
                          <img alt="Calendar" className="block max-w-none size-full" src="/svg/icons/calendar.svg" />
                        </div>
                        <div className="relative shrink-0 text-[#272635] text-[12px]" data-node-id="456:10089">
                          <p className="leading-[normal]">{campaignMetrics.donors} Academic year</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-0 relative shrink-0 w-full" data-node-id="456:10090">
                    <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                      <img alt="Icon" className="block max-w-none size-full" src={imgLine1} />
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start justify-start relative shrink-0 w-full" data-node-id="456:10091">
                    <div className="content-stretch flex gap-2 items-center justify-start relative shrink-0 w-full" data-node-id="456:10092">
                      <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#198754] text-[12px] text-nowrap" data-node-id="456:10093">
                        <p className="leading-[normal] whitespace-pre">View</p>
                      </div>
                      <div className="overflow-clip relative shrink-0 size-4" data-name="Arrow Right" data-node-id="456:10094">
                        <div className="absolute inset-0" data-name="Vector">
                          <img alt="Arrow" className="block max-w-none size-full" src={imgArrow} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Donor History Section */}
            <div className="content-stretch flex items-start justify-between relative size-full mb-8" data-node-id="456:10095">
              <div className="content-stretch flex flex-col font-['Neue_Montreal:Regular',_sans-serif] gap-2 items-start justify-start leading-[0] not-italic relative shrink-0 w-[508px]" data-node-id="456:10096">
                <div className="relative shrink-0 text-[#272635] text-[18px] text-nowrap uppercase" data-node-id="456:10097">
                  <p className="leading-[normal] whitespace-pre">history of donors</p>
                </div>
                <div className="relative shrink-0 text-[16px] text-[rgba(39,38,53,0.5)] w-full" data-node-id="456:10098">
                  <p className="leading-[24px]">This is the performance of all campaign created for you over the period of your academics</p>
                </div>
              </div>
              <div className="content-stretch flex gap-2 items-center justify-start relative shrink-0 w-[77px] h-4" data-node-id="456:10099">
                <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[12px] text-nowrap" data-node-id="456:10100">
                  <p className="leading-[normal] whitespace-pre">Current</p>
                </div>
                <div className="overflow-clip relative shrink-0 size-4" data-name="Caret Down" data-node-id="456:10101">
                  <div className="absolute inset-0" data-name="Vector">
                    <img alt="Caret Down" className="block max-w-none size-full" src="/svg/icons/dropdown-arrow.svg" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="content-stretch flex gap-8 items-center justify-start relative size-full mb-6" data-node-id="456:10102">
              <div className="content-stretch flex gap-8 items-center justify-start relative shrink-0" data-node-id="456:10103">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap pb-2 border-b-2 transition-colors ${
                    activeTab === 'all' 
                      ? 'text-[#198754] border-[#198754]' 
                      : 'text-[rgba(39,38,53,0.5)] border-transparent'
                  }`}
                  data-node-id="456:10104"
                >
                  <p className="leading-[normal] whitespace-pre">All donors</p>
                </button>
                <button
                  onClick={() => setActiveTab('guardians')}
                  className={`font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap pb-2 border-b-2 transition-colors ${
                    activeTab === 'guardians' 
                      ? 'text-[#198754] border-[#198754]' 
                      : 'text-[rgba(39,38,53,0.5)] border-transparent'
                  }`}
                  data-node-id="456:10105"
                >
                  <div className="content-stretch flex gap-2 items-center justify-start relative shrink-0" data-node-id="456:10106">
                    <p className="leading-[normal] whitespace-pre">Guardians</p>
                    <div className="bg-[rgba(39,38,53,0.1)] px-2 py-1 rounded-full" data-node-id="456:10107">
                      <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[10px] text-nowrap" data-node-id="456:10108">
                        <p className="leading-[normal] whitespace-pre">{donorCounts.guardians}</p>
                      </div>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('good-samaritans')}
                  className={`font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[16px] text-nowrap pb-2 border-b-2 transition-colors ${
                    activeTab === 'good-samaritans' 
                      ? 'text-[#198754] border-[#198754]' 
                      : 'text-[rgba(39,38,53,0.5)] border-transparent'
                  }`}
                  data-node-id="456:10109"
                >
                  <div className="content-stretch flex gap-2 items-center justify-start relative shrink-0" data-node-id="456:10110">
                    <p className="leading-[normal] whitespace-pre">Good samaritans</p>
                    <div className="bg-[rgba(39,38,53,0.1)] px-2 py-1 rounded-full" data-node-id="456:10111">
                      <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[10px] text-nowrap" data-node-id="456:10112">
                        <p className="leading-[normal] whitespace-pre">{donorCounts['good-samaritans']}</p>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Donor Table */}
            <div className="content-stretch flex flex-col items-start justify-start relative size-full mb-8" data-node-id="456:10113">
              <div className="bg-white box-border content-stretch flex flex-col items-start justify-start relative rounded-[12px] shrink-0 w-full border border-[rgba(39,38,53,0.1)]" data-node-id="456:10114">
                {/* Table Header */}
                <div className="content-stretch flex items-center justify-start relative shrink-0 w-full border-b border-[rgba(39,38,53,0.1)]" data-node-id="456:10115">
                  <div className="content-stretch flex flex-col items-start justify-center min-h-[44px] px-4 py-3 relative shrink-0 w-[279px]" data-node-id="456:10116">
                    <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[12px] text-nowrap uppercase" data-node-id="456:10117">
                      <p className="leading-[normal] whitespace-pre">Names</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start justify-center min-h-[44px] px-4 py-3 relative shrink-0 w-[240px]" data-node-id="456:10118">
                    <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[12px] text-nowrap uppercase" data-node-id="456:10119">
                      <p className="leading-[normal] whitespace-pre">Donation</p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start justify-center min-h-[44px] px-4 py-3 relative shrink-0 w-[240px]" data-node-id="456:10120">
                    <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[12px] text-nowrap uppercase" data-node-id="456:10121">
                      <p className="leading-[normal] whitespace-pre">Date</p>
                    </div>
                  </div>
                </div>

                {/* Table Rows */}
                <div className="content-stretch flex flex-col items-start justify-start relative shrink-0 w-full" data-node-id="456:10122">
                  {paginatedDonors.map((donor, index) => (
                    <div key={donor.id} className={`content-stretch flex items-center justify-start relative shrink-0 w-full ${
                      index < paginatedDonors.length - 1 ? 'border-b border-[rgba(39,38,53,0.1)]' : ''
                    }`} data-node-id="456:10123">
                      <div className="content-stretch flex flex-col items-start justify-center min-h-[48px] px-4 py-3 relative shrink-0 w-[279px]" data-node-id="456:10124">
                        <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[14px] text-nowrap" data-node-id="456:10125">
                          <p className="leading-[normal] whitespace-pre">{donor.name}</p>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col items-start justify-center min-h-[48px] px-4 py-3 relative shrink-0 w-[240px]" data-node-id="456:10126">
                        <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[14px] text-nowrap" data-node-id="456:10127">
                          <p className="leading-[normal] whitespace-pre">${donor.amount.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col items-start justify-center min-h-[48px] px-4 py-3 relative shrink-0 w-[240px]" data-node-id="456:10128">
                        <div className="font-['Neue_Montreal:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#272635] text-[14px] text-nowrap" data-node-id="456:10129">
                          <p className="leading-[normal] whitespace-pre">{donor.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="content-stretch flex items-center justify-end relative shrink-0 w-full px-4 py-3" data-node-id="456:10130">
                  <div className="content-stretch flex gap-2 items-center justify-start relative shrink-0" data-node-id="456:10131">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`content-stretch flex items-center justify-center min-h-[32px] min-w-[32px] relative rounded-[8px] shrink-0 transition-colors ${
                        currentPage === 1 
                          ? 'bg-[rgba(39,38,53,0.1)] cursor-not-allowed' 
                          : 'bg-white hover:bg-[rgba(39,38,53,0.05)] border border-[rgba(39,38,53,0.1)]'
                      }`}
                      data-node-id="456:10132"
                    >
                      <div className="overflow-clip relative shrink-0 size-5" data-name="Caret Left" data-node-id="456:10133">
                        <div className="absolute inset-0" data-name="Vector">
                          <img alt="Caret Left" className="block max-w-none size-full" src={imgCaretLeft} />
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className={`content-stretch flex items-center justify-center min-h-[32px] min-w-[32px] relative rounded-[8px] shrink-0 transition-colors ${
                        currentPage === totalPages 
                          ? 'bg-[rgba(39,38,53,0.1)] cursor-not-allowed' 
                          : 'bg-white hover:bg-[rgba(39,38,53,0.05)] border border-[rgba(39,38,53,0.1)]'
                      }`}
                      data-node-id="456:10134"
                    >
                      <div className="overflow-clip relative shrink-0 size-5" data-name="Caret Right" data-node-id="456:10135">
                        <div className="absolute inset-0" data-name="Vector">
                          <img alt="Caret Right" className="block max-w-none size-full" src={imgCaretRight} />
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="content-stretch flex font-['Neue_Montreal:Regular',_sans-serif] gap-5 items-center justify-start leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(39,38,53,0.5)] text-nowrap w-full" data-node-id="448:1765">
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
    </div>
  )
}