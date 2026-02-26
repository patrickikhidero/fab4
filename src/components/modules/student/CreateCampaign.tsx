'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarNavigation } from './SidebarNavigation'

import { getStoredUser, getUserIdFromToken } from '@/lib/auth/storage'
import { getStudentProfile } from '@/lib/student/application'
import { getCampaignOverview, listMyCampaigns } from '@/lib/student/campaign'

import {
  createCampaign,
  updateCampaign,
  createCampaignDocument,
  type CreateCampaignPayload,
} from '@/lib/student/campaign'

import { api } from '@/lib/api/client' // ✅ used for FX rate fetch (same api client you already use)

// Image assets from Figma design
const imgBackArrow = '/211e63c41bedb13d7b5b07aace82fe8309636c60.svg'
const imgBackArrowStroke = '/5953f0ee7017ea99439adee8b0165fd4b1183458.svg'
const imgDoubleCaret = '/f0ee798cbcb777d6d3688db4718a873e7870e9bb.svg'

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

const imgLanguage = '/svg/icons/language.svg'
const imgDrag = '/a5e66ea1728273b13fcac01a04899a1051effbaf.svg'
const imgImage = '/7833b1c1d42b56fbdb5a6640820cd1d3932cbda1.svg'
const imgFile = '/file.svg'

// ✅ calendar icon (use your correct path)
const imgCalendar = '/svg/icons/calendar.svg'

interface UserData {
  name: string
  email: string
  avatar: string
}

interface CreateCampaignProps {
  userData?: UserData
}

type ToastType = 'success' | 'error' | 'info'

function Toast({
  open,
  type,
  title,
  message,
  onClose,
}: {
  open: boolean
  type: ToastType
  title: string
  message?: string
  onClose: () => void
}) {
  if (!open) return null

  const bg =
    type === 'success'
      ? 'bg-[#198754]'
      : type === 'error'
        ? 'bg-red-600'
        : 'bg-[#272635]'

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      <div className={`w-[360px] max-w-[calc(100vw-32px)] ${bg} text-white rounded-[12px] shadow-lg p-4`}>
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <div className="font-semibold text-sm">{title}</div>
            {message ? (
              <div className="text-xs opacity-90 mt-1 leading-[1.4]">{message}</div>
            ) : null}
          </div>
          <button onClick={onClose} className="text-white/90 hover:text-white text-sm">
            ✕
          </button>
        </div>
      </div>
    </div>
  )
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
  )
}

type UploadRow = {
  id: string
  file: File
  name: string
  size: string
  progress: number
  status: 'queued' | 'uploading' | 'completed' | 'error'
}

type CampaignListItem = {
  id: number
  goal?: number | string | null
  amount?: number | string | null
  raised_amount?: number | string | null
  amount_raised?: number | string | null
  currency?: string | null
  academic_session?: string | null
  drafted?: boolean
  accepted?: boolean
  goal_achieved?: boolean
  status?: string | null
  created_at?: string | null
  updated_at?: string | null
}

function humanSize(bytes: number) {
  const mb = bytes / 1024 / 1024
  return `${mb.toFixed(1)} MB`
}

function safeErrMessage(err: any) {
  return (
    err?.response?.data?.detail ||
    err?.response?.data?.message ||
    (typeof err?.response?.data === 'string' ? err.response.data : null) ||
    err?.message ||
    'Something went wrong.'
  )
}

function formatDateLabel(iso: string) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  if (!y || !m || !d) return iso
  return `${d}/${m}/${y}`
}

export function CreateCampaign() {
  const router = useRouter()

  const [currentStage, setCurrentStage] = useState<1 | 2 | 3>(1)
  const [activeSection] = useState<'application' | 'status' | 'campaign'>('campaign')

  const [loading, setLoading] = useState(true)
  const [isVerified, setIsVerified] = useState(false)

  // campaign draft id from backend
  const [campaignId, setCampaignId] = useState<number | null>(null)

  // ✅ student name from local storage
  const [studentName, setStudentName] = useState<string>('')

  // ✅ Step 1 fields (match backend)
  const [goal, setGoal] = useState<string>('') // backend "goal"
  const [currency, setCurrency] = useState<string>('KES')
  const [academicSession, setAcademicSession] = useState<string>('')

  const [startDate, setStartDate] = useState<string>('') // YYYY-MM-DD
  const [endDate, setEndDate] = useState<string>('') // YYYY-MM-DD

  // ✅ keep UI consistent: duration popover
  const [showDatePicker, setShowDatePicker] = useState(false)
  const datePickerRef = useRef<HTMLDivElement | null>(null)
  const [campaignSummary, setCampaignSummary] = useState<{
    currentAmount: number
    weekAmount: number
    monthAmount: number
    progress: number
  } | null>(null)
  const [userDataResolved, setUserDataResolved] = useState<UserData>({
      name: 'User',
      email: '',
      avatar: '',
    })

  const toNum = (v: any) => {
    const n = Number(v)
    return Number.isFinite(n) ? n : 0
  }

  const mapCampaignRaised = (c: CampaignListItem | null) => {
    if (!c) return 0
    return (
      toNum(c.amount_raised) ||
      toNum(c.raised_amount) ||
      toNum(c.amount) ||
      0
    )
  }

  const pickCurrentCampaign = (results: CampaignListItem[]): CampaignListItem | null => {
    if (!results?.length) return null

    // prefer accepted + not drafted
    const preferred =
      results.find((c) => c.accepted === true && c.drafted === false) ??
      results.find((c) => c.drafted === false) ??
      results[0]

    return preferred ?? null
  }



  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!showDatePicker) return
      const target = e.target as Node
      if (datePickerRef.current && !datePickerRef.current.contains(target)) {
        setShowDatePicker(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [showDatePicker])

  const durationLabel =
    startDate && endDate ? `${formatDateLabel(startDate)} - ${formatDateLabel(endDate)}` : ''

  // ✅ FX conversion preview: KES -> USD (NO guessing; expects backend/route to return {rate})
  const [usdRate, setUsdRate] = useState<number | null>(null)
  
  useEffect(() => {
    const u = getStoredUser()
    const name = `${u?.first_name ?? ''} ${u?.last_name ?? ''}`.trim() || 'User'
    const email = u?.email ?? ''
    const avatar = u?.photo ?? ''
    setUserDataResolved({ name, email, avatar })
  }, [])


  useEffect(() => {
    async function loadRate() {
      try {
        const res = await api.get<{ rate: number }>(`/payments/fx/?from=${currency}&to=USD`)
        const r = Number(res.data?.rate)
        setUsdRate(Number.isFinite(r) && r > 0 ? r : null)
      } catch {
        setUsdRate(null)
      }
    }

    if (currency === 'KES') loadRate()
    else setUsdRate(null)
  }, [currency])

  // useEffect(() => {
  //     const run = async () => {
  //       try {
  //         setLoading(true)
  
  //         const u = getStoredUser()
  
  //         let userId: number | null = u?.id ?? null
  //         if (!userId) userId = getUserIdFromToken()
  
  //         const profile = await getStudentProfile(userId)
  //         const verified = !!profile?.is_verified
  //         setIsVerified(verified)
  
  //         if (!verified) {
  //           setCampaignSummary(null)
  //           return
  //         }

  //         const [ov, mine] = await Promise.all([
  //                   getCampaignOverview(),
  //                   listMyCampaigns(),
  //                 ])
  //         const results: CampaignListItem[] = mine?.results ?? []
  //         const current = pickCurrentCampaign(results)
  //         // ---- Sidebar summary (use overview first, fallback to campaign)
  //         const currentAmount =
  //           toNum(ov?.current_campaign_amount) ||
  //           toNum(ov?.total_raised) ||
  //           mapCampaignRaised(current)
  
  //         const weekAmount =
  //           toNum(ov?.this_week) ||
  //           toNum(ov?.week_raised) ||
  //           toNum(ov?.weekly_growth) ||
  //           0
  
  //         const monthAmount =
  //           toNum(ov?.this_month) ||
  //           toNum(ov?.month_raised) ||
  //           toNum(ov?.monthly_growth) ||
  //           0
  
  //         // progress: prefer API percent, else compute from campaign goal
  //         const goal = toNum(current?.goal)
  //         const progress =
  //           toNum(ov?.progress_percent) ||
  //           (goal > 0 ? Math.round((currentAmount / goal) * 100) : 0)
  
  //         setCampaignSummary({
  //           currentAmount,
  //           weekAmount,
  //           monthAmount,
  //           progress,
  //         })    
  
          
  //       } catch (e) {
  //         console.error('Campaign overview load failed', e)
  //         setCampaignSummary(null)
  //       } finally {
  //         setLoading(false)
  //       }
  //   }
  
  //   run()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
  

  // backend needs academic_needs enums
  const [needInput, setNeedInput] = useState<string>('')
  const [academicNeeds, setAcademicNeeds] = useState<string[]>(['ACCOMMODATION'])

  // ✅ Step 2 fields (backend: description required; we use story as description)
  const [story, setStory] = useState<string>('Description')

  // Cover file (UI only unless endpoint exists)
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const coverInputRef = useRef<HTMLInputElement | null>(null)

  // Step 3 documents
  const [uploadedFiles, setUploadedFiles] = useState<UploadRow[]>([])
  const docsInputRef = useRef<HTMLInputElement | null>(null)

  // Toast
  const [toastOpen, setToastOpen] = useState(false)
  const [toastType, setToastType] = useState<ToastType>('success')
  const [toastTitle, setToastTitle] = useState('')
  const [toastMessage, setToastMessage] = useState('')
  const showToast = (type: ToastType, title: string, message?: string) => {
    setToastType(type)
    setToastTitle(title)
    setToastMessage(message ?? '')
    setToastOpen(true)
    window.setTimeout(() => setToastOpen(false), 3500)
  }

  const [isSubmitting, setIsSubmitting] = useState(false)

  // ✅ load name from local storage (your app already uses this pattern)
  useEffect(() => {
    const u = getStoredUser()
    const fullName = `${u?.first_name ?? ''} ${u?.last_name ?? ''}`.trim()
    setStudentName(fullName || u?.email || 'Student')
  }, [])

  const stages = useMemo(
    () => [
      { id: 1, title: 'Describe your fundraise goals', active: currentStage === 1 },
      { id: 2, title: "Why you're fundraising", active: currentStage === 2 },
      { id: 3, title: 'Share proof documents', active: currentStage === 3 },
    ],
    [currentStage],
  )

  const handleNavigationChange = (section: 'application' | 'status' | 'campaign' | 'wallet') => {
    if (section === 'application') router.push('/student/dashboard/application/profile')
    else if (section === 'status') router.push('/student/dashboard/application/profile')
    else router.push('/student/dashboard/campaign')
  }

  const handleBack = () => router.push('/student/dashboard/campaign')

  // ✅ Needs helpers (store ENUMS like ACCOMMODATION)
  const addNeed = () => {
    const v = needInput.trim()
    if (!v) return
    const normalized = v.toUpperCase().replace(/\s+/g, '_')
    if (academicNeeds.includes(normalized)) return
    setAcademicNeeds((p) => [...p, normalized])
    setNeedInput('')
  }

  const removeNeed = (v: string) => setAcademicNeeds((p) => p.filter((x) => x !== v))

  // -------- Docs queue helpers
  const addDocsToQueue = (files: FileList | null) => {
    if (!files) return
    const rows: UploadRow[] = Array.from(files).map((f) => ({
      id: `${Date.now()}-${Math.random()}`,
      file: f,
      name: f.name,
      size: humanSize(f.size),
      progress: 0,
      status: 'queued',
    }))
    setUploadedFiles((p) => [...p, ...rows])
  }

  const removeDoc = (id: string) => setUploadedFiles((p) => p.filter((r) => r.id !== id))

  // ✅ Build payload that matches backend exactly
  const buildPayload = (): CreateCampaignPayload => {
    const g = Number(goal)
    return {
      name: studentName.trim() || 'Student',
      description: story.trim(),
      start_date: startDate,
      end_date: endDate,
      goal: Number.isFinite(g) ? g : 0,
      currency: currency.trim() || 'KES',
      academic_needs: academicNeeds,
      academic_session: academicSession.trim(),
      drafted: true,
      // cover_photo: not wired yet
    }
  }

  // ✅ Validation
  const validateStep1 = () => {
    const g = Number(goal)
    if (!studentName.trim()) {
      showToast('error', 'Name required', 'Student name is missing.')
      return false
    }
    if (!Number.isFinite(g) || g <= 0) {
      showToast('error', 'Invalid goal', 'Enter a goal amount greater than 0.')
      return false
    }
    if (!startDate) {
      showToast('error', 'Start date required', 'Pick a start date.')
      return false
    }
    if (!endDate) {
      showToast('error', 'End date required', 'Pick an end date.')
      return false
    }
    if (new Date(endDate) < new Date(startDate)) {
      showToast('error', 'Invalid duration', 'End date must be after start date.')
      return false
    }
    if (!academicSession.trim()) {
      showToast('error', 'Academic session required', 'Enter your academic session.')
      return false
    }
    if (!academicNeeds.length) {
      showToast('error', 'Academic needs required', 'Add at least one academic need.')
      return false
    }
    return true
  }

  const validateStep2 = () => {
    // backend requires description
    if (!story.trim()) {
      showToast('error', 'Description required', 'Tell your story (description).')
      return false
    }
    return true
  }

  // ✅ Step save actions
  // IMPORTANT: your backend requires description on CREATE.
  // So at Step 1 we create with a placeholder " " and then update real description in Step 2.
  const saveStep1 = async () => {
    if (!validateStep1()) return false

    setIsSubmitting(true)
    try {
      const payload = buildPayload()

      if (!campaignId) {
        const created = await createCampaign({
          ...payload,
          description: payload.description?.trim() ? payload.description : ' ', // placeholder
        })
        if (!created?.id) throw new Error('Campaign ID not returned from createCampaign.')
        setCampaignId(created.id)
      } else {
        await updateCampaign(campaignId, {
          name: payload.name,
          start_date: payload.start_date,
          end_date: payload.end_date,
          goal: payload.goal,
          currency: payload.currency,
          academic_session: payload.academic_session,
          academic_needs: payload.academic_needs,
          drafted: true,
        })
      }

      showToast('success', 'Saved', 'Campaign draft saved.')
      return true
    } catch (err: any) {
      showToast('error', 'Failed to save step 1', safeErrMessage(err))
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  const saveStep2 = async () => {
    if (!campaignId) {
      showToast('error', 'No campaign draft', 'Please complete Step 1 first.')
      return false
    }
    if (!validateStep2()) return false

    setIsSubmitting(true)
    try {
      const payload = buildPayload()

      await updateCampaign(campaignId, {
        name: payload.name,
        description: payload.description,
      })

      if (coverFile) {
        showToast('info', 'Cover selected', 'Cover upload endpoint is not connected yet.')
      } else {
        showToast('success', 'Saved', 'Campaign details saved.')
      }

      return true
    } catch (err: any) {
      showToast('error', 'Failed to save step 2', safeErrMessage(err))
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  const uploadDocumentsAndFinish = async () => {
    if (!campaignId) {
      showToast('error', 'No campaign draft', 'Please complete Step 1 first.')
      return
    }

    const files = uploadedFiles.map((r) => r.file)
    if (!files.length) {
      showToast('error', 'Documents required', 'Upload at least one proof document.')
      return
    }

    setIsSubmitting(true)
    try {
      setUploadedFiles((p) =>
        p.map((r) => ({
          ...r,
          status: 'uploading',
          progress: 0,
        })),
      )

      await createCampaignDocument(campaignId, files)

      setUploadedFiles((p) =>
        p.map((r) => ({
          ...r,
          status: 'completed',
          progress: 100,
        })),
      )

      showToast('success', 'Campaign created', 'Your campaign was created successfully.')
      router.push('/student/dashboard/campaign')
    } catch (err: any) {
      setUploadedFiles((p) =>
        p.map((r) => ({
          ...r,
          status: 'error',
        })),
      )
      showToast('error', 'Failed to upload documents', safeErrMessage(err))
    } finally {
      setIsSubmitting(false)
    }
  }

  const goalNum = Number(goal || 0)
  const usdPreview =
    currency === 'KES' && usdRate && Number.isFinite(goalNum) && goalNum > 0
      ? (goalNum * usdRate).toFixed(2)
      : null

  return (
    <div className="flex min-h-screen bg-[#eceee4]">
      <div className="flex-1 p-8">
        <div className="min-h-screen bg-[#eceee4]">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-[20px] shadow-[0px_16px_32px_-8px_rgba(39,38,53,0.1)] p-8">
              {/* Top Language Selector */}
              <div className="box-border content-stretch flex flex-col gap-2.5 items-end justify-start px-5 py-0 relative shrink-0 w-full mb-8">
                <div className="box-border content-stretch flex gap-2 items-center justify-center px-2 py-0 relative rounded-[999px] shrink-0">
                  <div className="overflow-clip relative shrink-0 size-4">
                    <div className="absolute inset-0">
                      <img alt="Globe Icon" className="block max-w-none size-full" src={imgLanguage} />
                    </div>
                  </div>
                  <p className="leading-[20px] whitespace-pre text-[#272635] text-[14px]">English</p>
                </div>
              </div>

              {/* Header */}
              <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-start px-[120px] py-0 relative size-full mb-8">
                <div className="box-border content-stretch flex gap-4 items-start justify-start pb-5 pt-0 px-0 relative shrink-0 w-full">
                  <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(39,38,53,0.1)] border-solid inset-0 pointer-events-none" />

                  <button
                    onClick={handleBack}
                    className="bg-[#eceee4] content-stretch flex gap-2.5 items-center justify-center relative rounded-[9999px] shrink-0 size-10 hover:bg-[#d4d6d0] transition-colors"
                  >
                    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                      <div className="[grid-area:1_/_1] ml-0 mt-0 overflow-clip relative size-4">
                        <div className="absolute inset-0">
                          <img alt="Back Arrow" className="block max-w-none size-full" src={imgBackArrow} />
                        </div>
                        <div
                          className="absolute inset-[18.75%_37.5%_18.75%_31.25%]"
                          style={{ '--stroke-0': 'rgba(39, 38, 53, 1)' } as React.CSSProperties}
                        >
                          <img alt="Back Arrow Stroke" className="block max-w-none size-full" src={imgBackArrowStroke} />
                        </div>
                      </div>
                    </div>
                  </button>

                  <div className="content-stretch flex flex-col font-['Neue_Montreal:Regular',_sans-serif] gap-2 grow items-start justify-center leading-[0] min-h-px min-w-px not-italic relative self-stretch shrink-0">
                    <div className="relative shrink-0 text-[#272635] text-[24px] text-nowrap">
                      <p className="leading-[normal] whitespace-pre">Create Campaign</p>
                    </div>
                    <div className="min-w-full relative shrink-0 text-[16px] text-[rgba(39,38,53,0.5)]" style={{ width: 'min-content' }}>
                      <p className="leading-[24px]">Clearly provide details to help us understand and process your fund request.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Steps */}
              <div className="mb-8">
                <div className="flex items-start justify-center">
                  {stages.map((stage, index) => (
                    <div key={stage.id} className="flex items-center">
                      <div
                        className={`px-5 py-4 rounded-t-lg ${
                          stage.active
                            ? 'bg-[#f9faf7] border-b-2 border-[#198754]'
                            : 'bg-white border-b border-[rgba(39,38,53,0.1)]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 flex items-center justify-center">
                            <img alt="Double Caret" className="w-full h-full" src={imgDoubleCaret} />
                          </div>
                          <span
                            className={`text-sm font-medium ${
                              stage.active ? 'text-[#272635]' : 'text-[rgba(39,38,53,0.5)]'
                            }`}
                          >
                            {stage.title}
                          </span>
                        </div>
                      </div>
                      {index < stages.length - 1 && <div className="w-8 h-px bg-[rgba(39,38,53,0.1)]"></div>}
                    </div>
                  ))}
                </div>
              </div>

              {/* STAGE 1 */}
              {currentStage === 1 && (
                <div className="content-stretch flex flex-col gap-10 items-start justify-start relative size-full">
                  <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full">
                    {/* Goal */}
                    <div className="bg-[#f9faf7] box-border content-stretch flex flex-col gap-4 items-start justify-end p-[20px] relative rounded-[12px] shrink-0 w-full">
                      <div className="content-stretch flex gap-4 items-end justify-start relative shrink-0">
                        <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-[252px]">
                          <div className="font-['Neue_Montreal:Regular',_sans-serif] min-w-full not-italic relative shrink-0 text-[#272635] text-[16px]" style={{ width: 'min-content' }}>
                            <p className="leading-[1.4]">Your starting goal</p>
                          </div>

                          <div className="bg-white box-border content-stretch flex gap-2 h-12 items-center justify-start min-w-60 pl-4 pr-3 py-3 relative rounded-[8px] shrink-0 w-full">
                            <div aria-hidden="true" className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]" />

                            <input
                              value={goal}
                              onChange={(e) => setGoal(e.target.value)}
                              inputMode="decimal"
                              placeholder="Enter goal amount"
                              className="w-full bg-transparent outline-none text-[#272635] text-[14px]"
                            />

                            <div className="bg-white box-border content-stretch flex gap-2 items-center justify-center px-2 py-1 relative rounded-[999px] shrink-0">
                              <div aria-hidden="true" className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-0 pointer-events-none rounded-[999px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]" />
                              <div className="overflow-clip relative shrink-0 size-4">
                                <MediaIconsCountry />
                              </div>
                              <input
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value.toUpperCase())}
                                className="w-[52px] uppercase bg-transparent outline-none text-[#272635] text-[16px]"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="content-stretch flex gap-2.5 h-12 items-center justify-start relative shrink-0">
                          <div className="overflow-clip relative shrink-0 size-5">
                            <div className="absolute inset-0">
                              <img alt="Refresh" className="block max-w-none size-full" src={imgRefresh} />
                            </div>
                            <div className="absolute inset-[18.75%_15.63%_62.5%_65.63%]">
                              <div className="absolute inset-[-13.333%]" style={{ '--stroke-0': 'rgba(147, 147, 154, 1)' } as React.CSSProperties}>
                                <img alt="Refresh" className="block max-w-none size-full" src={imgRefresh1} />
                              </div>
                            </div>
                            <div className="absolute bottom-[62.5%] left-1/4 right-[15.63%] top-[16.39%]">
                              <div className="absolute inset-[-11.84%_-4.21%]" style={{ '--stroke-0': 'rgba(147, 147, 154, 1)' } as React.CSSProperties}>
                                <img alt="Refresh" className="block max-w-none size-full" src={imgRefresh2} />
                              </div>
                            </div>
                            <div className="absolute inset-[62.5%_65.63%_18.75%_15.63%]">
                              <div className="absolute inset-[-13.333%]" style={{ '--stroke-0': 'rgba(147, 147, 154, 1)' } as React.CSSProperties}>
                                <img alt="Refresh" className="block max-w-none size-full" src={imgRefresh3} />
                              </div>
                            </div>
                            <div className="absolute bottom-[16.39%] left-[15.63%] right-1/4 top-[62.5%]">
                              <div className="absolute inset-[-11.84%_-4.21%]" style={{ '--stroke-0': 'rgba(147, 147, 154, 1)' } as React.CSSProperties}>
                                <img alt="Refresh" className="block max-w-none size-full" src={imgRefresh4} />
                              </div>
                            </div>
                          </div>

                          <div className="font-['Neue_Montreal:Regular',_sans-serif] text-[18px] text-[rgba(39,38,53,0.5)] text-nowrap">
                            <p className="leading-[normal] whitespace-pre">
                              {currency} {Number(goal || 0).toLocaleString()}
                              {usdPreview ? `  ·  USD ${usdPreview}` : ''}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="absolute left-[472px] overflow-clip size-3 top-4">
                        <div className="absolute inset-0">
                          <img alt="Info" className="block max-w-none size-full" src={imgInfo} />
                        </div>
                        <div className="absolute inset-[12.5%]">
                          <div className="absolute inset-[-5.556%]" style={{ '--stroke-0': 'rgba(147, 147, 154, 1)' } as React.CSSProperties}>
                            <img alt="Info" className="block max-w-none size-full" src={imgInfo1} />
                          </div>
                        </div>
                        <div className="absolute inset-[46.88%_46.88%_31.25%_46.88%]">
                          <div className="absolute inset-[-19.05%_-66.67%]" style={{ '--stroke-0': 'rgba(147, 147, 154, 1)' } as React.CSSProperties}>
                            <img alt="Info" className="block max-w-none size-full" src={imgInfo2} />
                          </div>
                        </div>
                        <div className="absolute inset-[28.13%_46.88%_62.5%_43.75%]">
                          <img alt="Info" className="block max-w-none size-full" src={imgInfo3} />
                        </div>
                      </div>

                      <div className="font-['Neue_Montreal:Regular',_sans-serif] min-w-full not-italic relative shrink-0 text-[14px] text-[rgba(39,38,53,0.5)]" style={{ width: 'min-content' }}>
                        <p className="leading-[20px]">
                          Keep in mind that transaction and service fees are deducted from each donation.
                        </p>
                      </div>
                    </div>

                    {/* Needs */}
                    <div className="bg-[#f9faf7] box-border flex flex-col gap-4 items-start justify-start p-[20px] relative rounded-[12px] shrink-0 w-full">
                      <div className="content-stretch flex gap-2 items-end justify-start relative shrink-0 w-full">
                        <div className="content-stretch flex flex-col gap-2 grow items-start justify-start min-h-px min-w-px relative shrink-0">
                          <div className="font-['Neue_Montreal:Regular',_sans-serif] min-w-full not-italic relative shrink-0 text-[#272635] text-[16px]" style={{ width: 'min-content' }}>
                            <p className="leading-[1.4]">What are your academic needs?</p>
                          </div>

                          <div className="bg-white box-border content-stretch flex gap-2 h-12 items-center justify-start min-w-60 pl-4 pr-3 py-3 relative rounded-[8px] shrink-0 w-full">
                            <div aria-hidden="true" className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]" />
                            <input
                              value={needInput}
                              onChange={(e) => setNeedInput(e.target.value)}
                              placeholder="e.g. Accommodation"
                              className="w-full bg-transparent outline-none text-[#272635] text-[14px]"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault()
                                  addNeed()
                                }
                              }}
                            />
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={addNeed}
                          className="bg-[#eceee4] box-border content-stretch flex gap-2 h-12 items-center justify-center overflow-clip px-5 py-3 relative rounded-[8px] shrink-0 hover:bg-[#dfe2d6] transition-colors"
                        >
                          <div className="font-['Neue_Montreal:Regular',_sans-serif] not-italic relative shrink-0 text-[#272635] text-[16px] text-nowrap">
                            <p className="leading-none whitespace-pre">Add</p>
                          </div>
                        </button>
                      </div>

                      <div className="content-stretch flex flex-wrap gap-2 items-center justify-start relative shrink-0 w-full">
                        {academicNeeds.map((n) => (
                          <div
                            key={n}
                            className="bg-white box-border content-stretch flex gap-0.5 items-center justify-start pl-3 pr-1.5 py-1 relative rounded-[8px] shrink-0"
                          >
                            <div aria-hidden="true" className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                            <div className="font-['Neue_Montreal:Regular',_sans-serif] not-italic relative shrink-0 text-[#272635] text-[14px] text-nowrap">
                              <p className="leading-[20px] whitespace-pre">{n}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeNeed(n)}
                              className="box-border content-stretch flex flex-col items-start justify-start overflow-clip p-[2px] relative rounded-[9999px] shrink-0 hover:bg-[#eceee4] transition-colors"
                            >
                              <div className="overflow-clip relative shrink-0 size-3">
                                <div className="absolute inset-1/4">
                                  <div className="absolute inset-[-8.333%]" style={{ '--stroke-0': 'rgba(39, 38, 53, 1)' } as React.CSSProperties}>
                                    <img alt="Close" className="block max-w-none size-full" src={imgClose} />
                                  </div>
                                </div>
                              </div>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Duration + Academic session (✅ consistent UI, calendar icon popover) */}
                    <div className="bg-[#f9faf7] box-border content-stretch flex flex-col gap-3 items-start justify-start p-[20px] relative rounded-[12px] shrink-0 w-full">
                      <div className="font-['Neue_Montreal:Regular',_sans-serif] text-[#272635] text-[16px]">
                        <p className="leading-[1.4]">Duration of this fundraiser</p>
                      </div>

                      {/* Academic session */}
                      <div className="bg-white box-border flex gap-2 h-12 items-center justify-start pl-4 pr-3 py-3 relative rounded-[8px] w-full">
                        <div
                          aria-hidden="true"
                          className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]"
                        />
                        <input
                          value={academicSession}
                          onChange={(e) => setAcademicSession(e.target.value)}
                          placeholder="Academic session (e.g. 2024/2025)"
                          className="w-full bg-transparent outline-none text-[#272635] text-[14px]"
                        />
                      </div>

                      {/* Duration input (readonly) + calendar icon -> popover */}
                      <div className="relative w-full">
                        <div className="bg-white box-border flex gap-2 h-12 items-center justify-start pl-4 pr-3 py-3 relative rounded-[8px] w-full">
                          <div
                            aria-hidden="true"
                            className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]"
                          />

                          <input
                            readOnly
                            value={durationLabel}
                            placeholder="Select start and end date"
                            onClick={() => setShowDatePicker(true)}
                            className="w-full bg-transparent outline-none text-[#272635] text-[14px] cursor-pointer"
                          />

                          <button
                            type="button"
                            onClick={() => setShowDatePicker((v) => !v)}
                            className="shrink-0 size-8 grid place-items-center rounded-[8px] hover:bg-[#eceee4] transition-colors"
                            aria-label="Open calendar"
                          >
                            <img src={imgCalendar} alt="Calendar" className="size-4" />
                          </button>
                        </div>

                        {showDatePicker && (
                          <div
                            ref={datePickerRef}
                            className="absolute z-50 mt-2 right-0 w-[320px] bg-white rounded-[12px] shadow-[0px_16px_32px_-8px_rgba(39,38,53,0.18)] p-4 border border-[rgba(39,38,53,0.08)]"
                          >
                            <div className="font-['Neue_Montreal:Regular',_sans-serif] text-[#272635] text-[14px] mb-3">
                              Select duration
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div className="flex flex-col gap-1">
                                <div className="text-[12px] text-[rgba(39,38,53,0.5)]">Start date</div>
                                <input
                                  type="date"
                                  value={startDate}
                                  onChange={(e) => setStartDate(e.target.value)}
                                  className="h-10 px-3 rounded-[8px] border border-[rgba(39,38,53,0.12)] outline-none text-[13px]"
                                />
                              </div>

                              <div className="flex flex-col gap-1">
                                <div className="text-[12px] text-[rgba(39,38,53,0.5)]">End date</div>
                                <input
                                  type="date"
                                  value={endDate}
                                  onChange={(e) => setEndDate(e.target.value)}
                                  className="h-10 px-3 rounded-[8px] border border-[rgba(39,38,53,0.12)] outline-none text-[13px]"
                                />
                              </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 mt-4">
                              <button
                                type="button"
                                className="text-[14px] underline text-[#272635]"
                                onClick={() => setShowDatePicker(false)}
                              >
                                Done
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="content-stretch flex gap-4 items-center justify-end relative shrink-0 w-full">
                    <button
                      type="button"
                      onClick={saveStep1}
                      disabled={isSubmitting}
                      className={`content-stretch flex gap-2 items-center justify-center overflow-clip relative rounded-[8px] shrink-0 ${
                        isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
                      }`}
                    >
                      <div className="font-['Neue_Montreal:Regular',_sans-serif] text-[#272635] text-[16px] text-nowrap">
                        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-none underline whitespace-pre">
                          Save to Continue Later
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={async () => {
                        const ok = await saveStep1()
                        if (ok) setCurrentStage(2)
                      }}
                      disabled={isSubmitting}
                      className={`bg-[#273125] h-14 relative rounded-[8px] shrink-0 transition-colors ${
                        isSubmitting ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[#1a2119]'
                      }`}
                    >
                      <div className="box-border content-stretch flex gap-2 h-14 items-center justify-center overflow-clip px-5 py-3 relative">
                        <div className="font-['Neue_Montreal:Regular',_sans-serif] text-[16px] text-nowrap text-white">
                          <p className="leading-none whitespace-pre">{isSubmitting ? 'Saving...' : 'Continue'}</p>
                        </div>
                      </div>
                      <div aria-hidden="true" className="absolute border border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    </button>
                  </div>
                </div>
              )}

              {/* STAGE 2 */}
              {currentStage === 2 && (
                <div className="content-stretch flex flex-col items-start justify-between relative size-full">
                  <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full">
                    <div className="bg-[#f9faf7] box-border content-stretch flex flex-col gap-2.5 items-start justify-start p-[20px] relative rounded-[12px] shrink-0 w-full">
                      <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full">
                        <div className="font-['Neue_Montreal:Regular',_sans-serif] text-[#272635] text-[16px] w-full">
                          <p className="leading-[1.4]">Tell your story (this is your campaign description)</p>
                        </div>

                        <div className="bg-white h-[140px] min-w-60 relative rounded-[8px] shrink-0 w-full">
                          <div className="box-border content-stretch flex h-[140px] items-start justify-start min-w-inherit overflow-clip px-4 py-3 relative w-full">
                            <textarea
                              value={story}
                              onChange={(e) => setStory(e.target.value)}
                              placeholder="Add a note"
                              className="w-full h-full resize-none bg-transparent outline-none text-[#272635] text-[14px]"
                            />
                            <div className="absolute bottom-[6.02px] right-[5.02px] size-[6.627px]" aria-hidden="true">
                              <div className="absolute inset-[-5.33%]">
                                <img alt="Drag Handle" className="block max-w-none size-full" src={imgDrag} />
                              </div>
                            </div>
                          </div>
                          <div aria-hidden="true" className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]" />
                        </div>
                      </div>
                    </div>

                    <div className="font-['Neue_Montreal:Regular',_sans-serif] text-[#272635] text-[16px] w-full">
                      <p className="leading-[1.4]">Upload a cover photo</p>
                    </div>

                    <div className="bg-[#f9faf7] box-border content-stretch flex flex-col gap-2.5 items-start justify-start p-[20px] relative rounded-[12px] shrink-0 w-full">
                      <div aria-hidden="true" className="absolute border border-[rgba(39,38,53,0.1)] border-dashed inset-0 pointer-events-none rounded-[12px]" />

                      <button
                        type="button"
                        onClick={() => coverInputRef.current?.click()}
                        className="content-stretch flex flex-col gap-2 items-center justify-start relative shrink-0 w-full"
                      >
                        <div className="relative shrink-0 size-7">
                          <img alt="Image Upload" className="block max-w-none size-full" src={imgImage} />
                        </div>

                        <div className="font-['Neue_Montreal:Regular',_sans-serif] text-[14px] text-[rgba(39,38,53,0.5)] text-center w-full">
                          <p className="leading-[1.4]">
                            <span className="[text-underline-position:from-font] decoration-solid text-[#198754] underline">Click to insert</span>
                            <span className="text-[#272635]">{` or drag and drop your photo here`}</span>
                          </p>
                        </div>

                        <div className="font-['Neue_Montreal:Regular',_sans-serif] text-[14px] text-[rgba(39,38,53,0.5)] text-center w-full">
                          <p className="leading-[1.4]">{coverFile ? `Selected: ${coverFile.name}` : 'Maximum file size is 20MB'}</p>
                        </div>
                      </button>

                      <input
                        ref={coverInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
                      />
                    </div>
                  </div>

                  <div className="content-stretch flex gap-4 items-center justify-between relative shrink-0 w-full">
                    <button
                      onClick={() => setCurrentStage(1)}
                      className="content-stretch flex gap-2 items-center justify-center overflow-clip relative rounded-[8px] shrink-0"
                      disabled={isSubmitting}
                    >
                      <div className="font-['Neue_Montreal:Regular',_sans-serif] text-[#272635] text-[16px] text-nowrap">
                        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-none underline whitespace-pre">
                          Back
                        </p>
                      </div>
                    </button>

                    <div className="flex gap-4 items-center">
                      <button
                        type="button"
                        onClick={saveStep2}
                        disabled={isSubmitting}
                        className={`content-stretch flex gap-2 items-center justify-center overflow-clip relative rounded-[8px] shrink-0 ${
                          isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
                        }`}
                      >
                        <div className="font-['Neue_Montreal:Regular',_sans-serif] text-[#272635] text-[16px] text-nowrap">
                          <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-none underline whitespace-pre">
                            Save to Continue Later
                          </p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={async () => {
                          const ok = await saveStep2()
                          if (ok) setCurrentStage(3)
                        }}
                        disabled={isSubmitting}
                        className={`bg-[#273125] h-14 relative rounded-[8px] shrink-0 transition-colors ${
                          isSubmitting ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[#1a2119]'
                        }`}
                      >
                        <div className="box-border content-stretch flex gap-2 h-14 items-center justify-center overflow-clip px-5 py-3 relative">
                          <div className="font-['Neue_Montreal:Regular',_sans-serif] text-[16px] text-nowrap text-white">
                            <p className="leading-none whitespace-pre">{isSubmitting ? 'Saving...' : 'Continue'}</p>
                          </div>
                        </div>
                        <div aria-hidden="true" className="absolute border border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[8px]" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 3 */}
              {currentStage === 3 && (
                <div className="content-stretch flex flex-col items-start justify-between relative size-full">
                  <div className="content-stretch flex flex-col gap-6 items-start justify-start relative shrink-0 w-full">
                    <div className="content-stretch flex flex-col gap-2 items-start justify-start relative shrink-0 w-full">
                      <div className="font-['Neue_Montreal:Regular',_sans-serif] text-[#272635] text-[24px] w-full">
                        <p className="leading-[1.4] font-semibold">Boost Credibility With Donors</p>
                      </div>
                      <div className="font-['Neue_Montreal:Regular',_sans-serif] text-[#272635] text-[16px] w-full">
                        <p className="leading-[1.4]">Upload documents to support your request.</p>
                      </div>
                    </div>

                    <div className="bg-[rgba(39,38,53,0.1)] h-px w-full"></div>

                    <div className="content-stretch flex flex-col gap-6 items-start justify-start relative shrink-0 w-full">
                      <div className="font-['Neue_Montreal:Regular',_sans-serif] text-[#272635] text-[18px] w-full">
                        <p className="leading-[1.4] font-semibold">Add documents</p>
                      </div>

                      {uploadedFiles.length === 0 && (
                        <div className="bg-[#f9faf7] box-border content-stretch flex flex-col gap-4 items-start justify-start p-6 relative rounded-[12px] shrink-0 w-full">
                          <div className="content-stretch flex flex-col gap-4 items-center justify-start relative shrink-0 w-full">
                            <div className="relative shrink-0 size-7">
                              <img alt="Image Upload" className="block max-w-none size-full" src={imgImage} />
                            </div>
                            <div className="font-['Neue_Montreal:Regular',_sans-serif] text-[14px] text-[rgba(39,38,53,0.5)] text-center w-full">
                              <p className="leading-[1.4]">
                                <span className="[text-underline-position:from-font] decoration-solid text-[#198754] underline">Click to insert</span>
                                <span className="text-[#272635]">{` or drag and drop your document here`}</span>
                              </p>
                            </div>
                            <div className="font-['Neue_Montreal:Regular',_sans-serif] text-[14px] text-[rgba(39,38,53,0.5)] text-center w-full">
                              <p className="leading-[1.4]">Maximum file size is 20MB</p>
                            </div>
                          </div>

                          <input
                            ref={docsInputRef}
                            type="file"
                            multiple
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            onChange={(e) => addDocsToQueue(e.target.files)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </div>
                      )}

                      {uploadedFiles.length > 0 && (
                        <div className="content-stretch flex flex-col gap-4 items-start justify-start relative shrink-0 w-full">
                          {uploadedFiles.map((file) => (
                            <div
                              key={file.id}
                              className="bg-white box-border content-stretch flex flex-col gap-4 items-start justify-start p-4 relative rounded-[8px] shrink-0 w-full border border-[rgba(39,38,53,0.1)]"
                            >
                              <div className="content-stretch flex gap-4 items-start justify-start relative shrink-0 w-full">
                                <div className="relative shrink-0 size-10">
                                  <img alt="File Icon" className="block max-w-none size-full" src={imgFile} />
                                </div>

                                <div className="content-stretch flex flex-col gap-4 grow items-start justify-start relative shrink-0">
                                  <div className="content-stretch flex gap-4 items-center justify-between relative shrink-0 w-full">
                                    <div className="content-stretch flex flex-col gap-1 items-start justify-start relative shrink-0">
                                      <div className="font-['Neue_Montreal:Regular',_sans-serif] text-[#272635] text-[14px]">
                                        <p className="leading-[1.4]">{file.name}</p>
                                      </div>
                                      <div className="font-['Neue_Montreal:Regular',_sans-serif] text-[rgba(39,38,53,0.5)] text-[12px]">
                                        <p className="leading-[1.4]">{file.size}</p>
                                      </div>
                                    </div>

                                    <button
                                      onClick={() => removeDoc(file.id)}
                                      className="font-['Neue_Montreal:Regular',_sans-serif] text-red-500 text-[12px] underline hover:text-red-600 transition-colors"
                                      disabled={isSubmitting}
                                    >
                                      <p className="leading-[1.4]">Remove</p>
                                    </button>
                                  </div>

                                  <div className="content-stretch flex flex-col gap-1 items-start justify-start relative shrink-0 w-full">
                                    <div className="bg-[rgba(39,38,53,0.1)] h-1 w-full rounded-full overflow-hidden">
                                      <div
                                        className={`h-full transition-all duration-300 ${
                                          file.status === 'completed'
                                            ? 'bg-[#198754]'
                                            : file.status === 'error'
                                              ? 'bg-red-500'
                                              : 'bg-[#198754]'
                                        }`}
                                        style={{ width: `${file.progress}%` }}
                                      />
                                    </div>

                                    <div className="font-['Neue_Montreal:Regular',_sans-serif] text-[rgba(39,38,53,0.5)] text-[12px]">
                                      <p className="leading-[1.4]">
                                        {file.status === 'queued' && 'Ready to upload'}
                                        {file.status === 'uploading' && 'Uploading...'}
                                        {file.status === 'completed' && 'Upload completed'}
                                        {file.status === 'error' && 'Upload failed'}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}

                          <button
                            type="button"
                            onClick={() => docsInputRef.current?.click()}
                            className="font-['Neue_Montreal:Regular',_sans-serif] text-[#198754] text-[14px] underline hover:text-[#146c43] transition-colors"
                            disabled={isSubmitting}
                          >
                            <p className="leading-[1.4]">Add more documents</p>
                          </button>

                          <input
                            ref={docsInputRef}
                            type="file"
                            multiple
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            onChange={(e) => addDocsToQueue(e.target.files)}
                            className="hidden"
                          />
                        </div>
                      )}

                      <div className="font-['Neue_Montreal:Regular',_sans-serif] text-[#272635] text-[14px] w-full">
                        <p className="leading-[1.4]">
                          Examples: admission offer letters, semester exam reports, attestations from your course advisor/lecturer.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="content-stretch flex gap-4 items-center justify-between relative shrink-0 w-full">
                    <button
                      onClick={() => setCurrentStage(2)}
                      className="content-stretch flex gap-2 items-center justify-center overflow-clip relative rounded-[8px] shrink-0"
                      disabled={isSubmitting}
                    >
                      <div className="font-['Neue_Montreal:Regular',_sans-serif] text-[#272635] text-[16px] text-nowrap">
                        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-none underline whitespace-pre">
                          Back
                        </p>
                      </div>
                    </button>

                    <button
                      onClick={uploadDocumentsAndFinish}
                      disabled={isSubmitting}
                      className={`h-14 relative rounded-[8px] shrink-0 transition-colors ${
                        isSubmitting ? 'bg-[#6c757d] cursor-not-allowed' : 'bg-[#198754] hover:bg-[#146c43]'
                      }`}
                    >
                      <div className="box-border content-stretch flex gap-2 h-14 items-center justify-center overflow-clip px-5 py-3 relative">
                        <div className="font-['Neue_Montreal:Regular',_sans-serif] text-[16px] text-nowrap text-white">
                          <p className="leading-none whitespace-pre">{isSubmitting ? 'Creating Campaign...' : 'Create Campaign'}</p>
                        </div>
                      </div>
                      <div aria-hidden="true" className="absolute border border-[#146c43] border-solid inset-0 pointer-events-none rounded-[8px]" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <Toast
              open={toastOpen}
              type={toastType}
              title={toastTitle}
              message={toastMessage}
              onClose={() => setToastOpen(false)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}