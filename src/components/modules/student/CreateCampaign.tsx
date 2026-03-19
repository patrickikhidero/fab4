'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CalendarDays, X, Trash2, Upload, ChevronsRight } from 'lucide-react'

import { getStoredUser } from '@/lib/auth/storage'
import {
  type CreateCampaignPayload,
} from '@/lib/student/campaign'

import { CurrencySelect } from '@/components/ui/CurrencySelect'
import { useFxRate, type FxSource, type SupportedCurrency } from '@/lib/hooks/useFxRate'
import {
  useCreateCampaignDocumentMutation,
  useCreateCampaignMutation,
  useUpdateCampaignMutation,
} from '@/lib/hooks/useCampaignMutations'

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

const imgLanguage = '/svg/icons/language.svg'
const imgDrag = '/a5e66ea1728273b13fcac01a04899a1051effbaf.svg'
const imgImage = '/7833b1c1d42b56fbdb5a6640820cd1d3932cbda1.svg'
const imgFile = '/file.svg'

interface UserData {
  name: string
  email: string
  avatar: string
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
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto z-[9999]">
      <div
        className={`w-full sm:w-[360px] sm:max-w-[calc(100vw-32px)] ${bg} text-white rounded-[12px] shadow-lg p-4`}
      >
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm">{title}</div>
            {message ? (
              <div className="text-xs opacity-90 mt-1 leading-[1.4] break-words">
                {message}
              </div>
            ) : null}
          </div>
          <button
            onClick={onClose}
            className="text-white/90 hover:text-white text-sm shrink-0"
          >
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
        <img
          alt="Kenya Flag"
          className="block max-w-none size-full"
          src={imgKenyaFlag}
        />
      </div>
      <div
        className="absolute bottom-[71.74%] left-[4.96%] right-[4.96%] top-0"
        data-name="Vector"
      >
        <img
          alt="Kenya Flag"
          className="block max-w-none size-full"
          src={imgKenyaFlag1}
        />
      </div>
      <div
        className="absolute bottom-0 left-[4.96%] right-[4.96%] top-[71.74%]"
        data-name="Vector"
      >
        <img
          alt="Kenya Flag"
          className="block max-w-none size-full"
          src={imgKenyaFlag2}
        />
      </div>
      <div
        className="absolute bottom-[34.78%] left-0 right-0 top-[34.78%]"
        data-name="Vector"
      >
        <img
          alt="Kenya Flag"
          className="block max-w-none size-full"
          src={imgKenyaFlag3}
        />
      </div>
      <div className="absolute inset-[20.37%_34.43%]" data-name="Group">
        <img
          alt="Kenya Flag"
          className="block max-w-none size-full"
          src={imgKenyaFlag4}
        />
      </div>
      <div className="absolute inset-[24.87%_39.13%]" data-name="Group">
        <img
          alt="Kenya Flag"
          className="block max-w-none size-full"
          src={imgKenyaFlag5}
        />
      </div>
      <div
        className="absolute inset-[35.01%_34.78%_35.01%_60.87%]"
        data-name="Vector"
      >
        <img
          alt="Kenya Flag"
          className="block max-w-none size-full"
          src={imgKenyaFlag6}
        />
      </div>
      <div
        className="absolute inset-[35.01%_60.87%_35.01%_34.78%]"
        data-name="Vector"
      >
        <img
          alt="Kenya Flag"
          className="block max-w-none size-full"
          src={imgKenyaFlag7}
        />
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

type AcademicNeedOption = {
  value:
  | 'ACCOMMODATION'
  | 'TUITION_FEES'
  | 'BOOKS'
  | 'PROJECT'
  | 'TRANSPORT'
  label: string
}

export function CreateCampaign({
  fxSource = 'exchangerate_api',
}: {
  fxSource?: FxSource
}) {
  const router = useRouter()

  const [currentStage, setCurrentStage] = useState<1 | 2 | 3>(1)
  const [campaignId, setCampaignId] = useState<number | null>(null)

  const [studentName, setStudentName] = useState<string>('')

  const [goal, setGoal] = useState<string>('')
  const [currency, setCurrency] = useState<SupportedCurrency>('KES')
  const [academicSession, setAcademicSession] = useState<string>('')

  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

  const [showDatePicker, setShowDatePicker] = useState(false)
  const datePickerRef = useRef<HTMLDivElement | null>(null)

  const [userDataResolved, setUserDataResolved] = useState<UserData>({
    name: 'User',
    email: '',
    avatar: '',
  })

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
    startDate && endDate
      ? `${formatDateLabel(startDate)} - ${formatDateLabel(endDate)}`
      : ''

  useEffect(() => {
    const u = getStoredUser()
    const name =
      `${u?.first_name ?? ''} ${u?.last_name ?? ''}`.trim() || 'User'
    const email = u?.email ?? ''
    const avatar = u?.photo ?? ''
    setUserDataResolved({ name, email, avatar })
  }, [])

  // FX rate for USD preview (currency -> USD)
  const fxQuery = useFxRate({ from: currency, source: fxSource })

  const academicNeedOptions: AcademicNeedOption[] = useMemo(
    () => [
      { value: 'ACCOMMODATION', label: 'Accommodation' },
      { value: 'TUITION_FEES', label: 'Tuition fees' },
      { value: 'BOOKS', label: 'Books' },
      { value: 'PROJECT', label: 'Project' },
      { value: 'TRANSPORT', label: 'Transport' },
    ],
    [],
  )

  const [selectedNeed, setSelectedNeed] =
    useState<AcademicNeedOption['value']>('ACCOMMODATION')
  const [academicNeeds, setAcademicNeeds] = useState<string[]>([
    'ACCOMMODATION',
  ])

  const [fundraiserTitle, setFundraiserTitle] = useState<string>('')
  const [story, setStory] = useState<string>('Description')

  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null)
  const coverInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!coverFile) {
      setCoverPreviewUrl(null)
      return
    }
    const url = URL.createObjectURL(coverFile)
    setCoverPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [coverFile])

  const [uploadedFiles, setUploadedFiles] = useState<UploadRow[]>([])
  const docsInputRef = useRef<HTMLInputElement | null>(null)

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
  const createCampaignMutation = useCreateCampaignMutation()
  const updateCampaignMutation = useUpdateCampaignMutation()
  const createCampaignDocumentMutation = useCreateCampaignDocumentMutation()

  useEffect(() => {
    const u = getStoredUser()
    const fullName = `${u?.first_name ?? ''} ${u?.last_name ?? ''}`.trim()
    setStudentName(fullName || u?.email || 'Student')
  }, [])

  const stages = useMemo(
    () => [
      {
        id: 1,
        title: 'Describe your fundraise goals',
        active: currentStage === 1,
      },
      {
        id: 2,
        title: "Why you're fundraising",
        active: currentStage === 2,
      },
      { id: 3, title: 'Share proof documents', active: currentStage === 3 },
    ],
    [currentStage],
  )

  const handleBack = () => router.push('/student/dashboard/campaign')

  const addNeed = () => {
    const v = selectedNeed
    if (!v) return
    if (academicNeeds.includes(v)) return
    setAcademicNeeds((p) => [...p, v])
  }

  const removeNeed = (v: string) =>
    setAcademicNeeds((p) => p.filter((x) => x !== v))

  const labelForNeed = (v: string) =>
    academicNeedOptions.find((o) => o.value === v)?.label ?? v

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

  const removeDoc = (id: string) =>
    setUploadedFiles((p) => p.filter((r) => r.id !== id))

  const buildPayload = (): CreateCampaignPayload => {
    const g = Number(goal)
    return {
      name: fundraiserTitle.trim() || 'Untitled Fundraiser',
      description: story.trim(),
      start_date: startDate,
      end_date: endDate,
      goal: Number.isFinite(g) ? g : 0,
      currency: currency.trim() || 'KES',
      academic_needs: academicNeeds,
      academic_session: academicSession.trim(),
      drafted: true,
    }
  }

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
      showToast(
        'error',
        'Academic session required',
        'Enter your academic session.',
      )
      return false
    }
    if (!academicNeeds.length) {
      showToast(
        'error',
        'Academic needs required',
        'Add at least one academic need.',
      )
      return false
    }
    return true
  }

  const validateStep2 = () => {
    if (!story.trim()) {
      showToast(
        'error',
        'Description required',
        'Tell your story (description).',
      )
      return false
    }
    return true
  }

  const saveStep1 = async () => {
    if (!validateStep1()) return false

    setIsSubmitting(true)
    const payload = buildPayload()

    const ok = await new Promise<boolean>((resolve) => {
      if (!campaignId) {
        createCampaignMutation.mutate(
          {
            ...payload,
            description: payload.description?.trim() ? payload.description : ' ',
          },
          {
            onSuccess: (created) => {
              if (!created?.id) {
                showToast('error', 'Failed to save step 1', 'Campaign ID not returned from createCampaign.')
                resolve(false)
                return
              }
              setCampaignId(created.id)
              showToast('success', 'Saved', 'Campaign draft saved.')
              resolve(true)
            },
            onError: (err) => {
              showToast('error', 'Failed to save step 1', safeErrMessage(err))
              resolve(false)
            },
          },
        )
        return
      }

      updateCampaignMutation.mutate(
        {
          id: campaignId,
          payload: {
            name: payload.name,
            start_date: payload.start_date,
            end_date: payload.end_date,
            goal: payload.goal,
            currency: payload.currency,
            academic_session: payload.academic_session,
            academic_needs: payload.academic_needs,
            drafted: true,
          },
        },
        {
          onSuccess: () => {
            showToast('success', 'Saved', 'Campaign draft saved.')
            resolve(true)
          },
          onError: (err) => {
            showToast('error', 'Failed to save step 1', safeErrMessage(err))
            resolve(false)
          },
        },
      )
    })

    setIsSubmitting(false)
    return ok
  }

  const saveStep2 = async () => {
    if (!campaignId) {
      showToast('error', 'No campaign draft', 'Please complete Step 1 first.')
      return false
    }
    if (!validateStep2()) return false

    setIsSubmitting(true)
    const payload = buildPayload()

    const ok = await new Promise<boolean>((resolve) => {
      updateCampaignMutation.mutate(
        {
          id: campaignId,
          payload: {
            name: payload.name,
            description: payload.description,
          },
        },
        {
          onSuccess: () => {
            if (coverFile) {
              showToast('info', 'Cover selected', 'Cover upload endpoint is not connected yet.')
            } else {
              showToast('success', 'Saved', 'Campaign details saved.')
            }
            resolve(true)
          },
          onError: (err) => {
            showToast('error', 'Failed to save step 2', safeErrMessage(err))
            resolve(false)
          },
        },
      )
    })

    setIsSubmitting(false)
    return ok
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
    setUploadedFiles((p) =>
      p.map((r) => ({
        ...r,
        status: 'uploading',
        progress: 0,
      })),
    )

    await new Promise<void>((resolve) => {
      createCampaignDocumentMutation.mutate(
        { campaignId, files },
        {
          onSuccess: () => {
            setUploadedFiles((p) =>
              p.map((r) => ({
                ...r,
                status: 'completed',
                progress: 100,
              })),
            )

            showToast('success', 'Campaign created', 'Your campaign was created successfully.')
            router.push('/student/dashboard/campaign')
            resolve()
          },
          onError: (err) => {
            setUploadedFiles((p) =>
              p.map((r) => ({
                ...r,
                status: 'error',
              })),
            )
            showToast('error', 'Failed to upload documents', safeErrMessage(err))
            resolve()
          },
        },
      )
    })

    setIsSubmitting(false)
  }

  const goalNum = Number(goal || 0)
  const usdPreview =
    Number.isFinite(goalNum) && goalNum > 0 && fxQuery.data
      ? (goalNum * fxQuery.data).toFixed(2)
      : null

  return (
    <div className="w-full min-w-0">
      <div className="max-w-6xl mx-auto min-w-0">
        <div className="bg-white rounded-[16px] sm:rounded-[20px] shadow-[0px_16px_32px_-8px_rgba(39,38,53,0.1)] p-4 sm:p-6 lg:p-8 min-w-0">
          {/* Top Language Selector */}
          <div className="flex items-start justify-end w-full mb-6 sm:mb-8">
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
          <div className="w-full mb-6 sm:mb-8">
            <div className="flex gap-3 sm:gap-4 items-start pb-5 border-b border-[rgba(39,38,53,0.1)]">
              <button
                onClick={handleBack}
                className="bg-[#eceee4] flex gap-2.5 items-center justify-center relative rounded-[9999px] shrink-0 size-10 hover:bg-[#d4d6d0] transition-colors"
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

              <div className="flex flex-col gap-2 grow min-w-0">
                <div className="text-[#272635] text-[20px] sm:text-[24px] break-words">
                  <p className="leading-[normal]">Create Campaign</p>
                </div>
                <div className="text-[14px] sm:text-[16px] text-[rgba(39,38,53,0.5)] min-w-0">
                  <p className="leading-[22px] sm:leading-[24px] break-words">
                    Clearly provide details to help us understand and process your fund request.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <section className="w-full min-w-0 md:px-16">
            {/* Steps */}
            <div className="mb-6 sm:mb-8 overflow-x-visible sm:overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-0 border-b border-[rgba(39,38,53,0.1)] items-start justify-start sm:justify-between min-w-0 pr-0 sm:pr-0 pb-2 sm:pb-0">
                {stages.map((stage, index) => (
                  <div key={stage.id} className="flex items-center shrink-0 max-w-full">
                    <div
                      className={`px-3 sm:px-5 py-2.5 sm:py-4 rounded-t-lg ${stage.active
                          ? 'bg-[#f9faf7] border-b-2 border-[#198754] rounded-t-md'
                          : 'bg-white '
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 flex items-center justify-center shrink-0">
                          <ChevronsRight className="size-8 text-[#27263580]" />
                        </div>
                        <span
                          className={`text-xs sm:text-sm font-medium whitespace-nowrap ${stage.active ? 'text-[#272635]' : 'text-[rgba(39,38,53,0.5)]'
                            }`}
                        >
                          {stage.title}
                        </span>
                      </div>
                    </div>
                    {/* {index < stages.length - 1 && <div className="w-6 sm:w-8 h-px bg-[rgba(39,38,53,0.1)] shrink-0" />} */}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-8 sm:gap-10 w-full min-w-0 md:px-20">

            {/* STAGE 1 */}
            {currentStage === 1 && (
              <div className="flex flex-col gap-8 sm:gap-10 w-full min-w-0">
                <div className="flex flex-col gap-4 sm:gap-6 w-full min-w-0">
                  <div className="flex flex-col gap-2">
                    <header className="text-[#272635] text-2xl">
                      <p className="leading-none">Describe the goals for your campaign</p>
                    </header>
                    <p className="text-base text-[rgba(39,38,53,0.5)]">
                      Clearly provide details to help us understand and process your fund request.
                    </p>
                  </div>
                  {/* Goal */}
                  <div className="bg-[#f9faf7] flex flex-col gap-4 items-start justify-end p-4 sm:p-[20px] relative rounded-[12px] w-full min-w-0">
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end justify-start w-full min-w-0">
                      <div className="flex flex-col gap-2 w-full lg:w-[252px] shrink-0">
                        <div className="text-[#272635] text-[16px]">
                          <p className="leading-[1.4]">Your starting goal</p>
                        </div>

                        <div className="bg-white flex gap-2 h-12 items-center justify-start pl-4 pr-3 py-3 relative rounded-[8px] w-full min-w-0">
                          <div aria-hidden="true" className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]" />

                          <input
                            value={goal}
                            onChange={(e) => {
                              const next = e.target.value
                              // Allow only numbers with an optional decimal part.
                              if (/^\d*\.?\d*$/.test(next)) setGoal(next)
                            }}
                            inputMode="decimal"
                            placeholder="Enter goal amount"
                            className="w-full min-w-0 bg-transparent outline-none text-[#272635] text-[14px]"
                          />

                          <CurrencySelect
                            value={currency}
                            onChange={setCurrency}
                            fxSource={fxSource}
                          />
                        </div>
                      </div>

                      <div className="flex gap-2.5 min-h-12 items-center justify-start shrink-0 max-w-full">
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

                        <div className="text-[14px] sm:text-[18px] text-[rgba(39,38,53,0.5)] break-words">
                          <p className="leading-[normal]">
                            {/* {currency} {Number(goal || 0).toLocaleString()} */}
                              {`USD ${
                                usdPreview
                                  ? Number(usdPreview).toLocaleString(undefined, {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    })
                                  : '0.00'
                              }`}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="absolute right-4 top-4 overflow-clip size-3">
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

                    <div className="text-[14px] text-[rgba(39,38,53,0.5)] pr-5 sm:pr-0">
                      <p className="leading-[20px]">
                        Keep in mind that transaction and service fees are deducted from each donation.
                      </p>
                    </div>
                  </div>

                  {/* Needs */}
                  <div className="bg-[#f9faf7] flex flex-col gap-4 items-start justify-start p-4 sm:p-[20px] relative rounded-[12px] w-full min-w-0">
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 items-end justify-start w-full min-w-0">
                      <div className="flex flex-col gap-2 grow w-full min-w-0">
                        <div className="text-[#272635] text-[16px]">
                          <p className="leading-[1.4]">What are your academic needs?</p>
                        </div>

                        <div className="bg-white flex gap-2 h-12 items-center justify-start pl-4 pr-3 py-3 relative rounded-[8px] w-full min-w-0">
                          <div aria-hidden="true" className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]" />
                          <select
                            value={selectedNeed}
                            onChange={(e) => setSelectedNeed(e.target.value as AcademicNeedOption['value'])}
                            className="w-full min-w-0 bg-transparent outline-none text-[#272635] text-[14px]"
                          >
                            {academicNeedOptions.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={addNeed}
                        className="bg-[#eceee4] flex gap-2 h-12 items-center justify-center overflow-clip px-5 py-3 relative rounded-[8px] shrink-0 hover:bg-[#dfe2d6] transition-colors w-full sm:w-auto"
                      >
                        <div className="text-[#272635] text-[16px]">
                          <p className="leading-none whitespace-nowrap">Add</p>
                        </div>
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 items-center justify-start w-full">
                      {academicNeeds.map((n) => (
                        <div
                          key={n}
                          className="bg-white flex gap-1 items-center justify-start pl-3 pr-1.5 py-1 relative rounded-[8px] max-w-full"
                        >
                          <div aria-hidden="true" className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
                          <div className="text-[#272635] text-[14px] max-w-full">
                            <p className="leading-[20px] break-words">{labelForNeed(n)}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeNeed(n)}
                            className="flex items-center justify-center p-[2px] relative rounded-[9999px] shrink-0 hover:bg-[#eceee4] transition-colors"
                            aria-label={`Remove ${labelForNeed(n)}`}
                          >
                            <X className="size-3 text-[#272635]" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Duration + Academic session */}
                  <div className="bg-[#f9faf7] flex flex-col gap-3 items-start justify-start p-4 sm:p-[20px] relative rounded-[12px] w-full min-w-0">
                    <div className="text-[#272635] text-[16px]">
                      <p className="leading-[1.4]">Duration of this fundraiser</p>
                    </div>

                    <div className="bg-white flex gap-2 h-12 items-center justify-start pl-4 pr-3 py-3 relative rounded-[8px] w-full">
                      <div
                        aria-hidden="true"
                        className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]"
                      />
                      <input
                        value={academicSession}
                        onChange={(e) => setAcademicSession(e.target.value)}
                        placeholder={`Academic session (e.g. ${new Date().getFullYear()}/${new Date().getFullYear() + 1})`}
                        className="w-full bg-transparent outline-none text-[#272635] text-[14px]"
                      />
                    </div>

                    <div className="relative w-full">
                      <div className="bg-white flex gap-2 h-12 items-center justify-start pl-4 pr-3 py-3 relative rounded-[8px] w-full">
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
                          <CalendarDays className="size-4 text-[#272635]" />
                        </button>
                      </div>

                      {showDatePicker && (
                        <div
                          ref={datePickerRef}
                          className="absolute z-50 mt-2 left-0 sm:left-auto sm:right-0 w-full sm:w-[320px] max-w-[calc(100vw-32px)] bg-white rounded-[12px] shadow-[0px_16px_32px_-8px_rgba(39,38,53,0.18)] p-4 border border-[rgba(39,38,53,0.08)]"
                        >
                          <div className="text-[#272635] text-[14px] mb-3">
                            Select duration
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-end w-full">
                  <button
                    type="button"
                    onClick={saveStep1}
                    disabled={isSubmitting}
                    className={`flex gap-2 items-center justify-center overflow-clip relative rounded-[8px] shrink-0 ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
                      }`}
                  >
                    <div className="text-[#272635] text-[16px] text-center sm:text-left">
                      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-none underline">
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
                    className={`bg-[#273125] h-14 relative rounded-[8px] shrink-0 transition-colors w-full sm:w-auto ${isSubmitting ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[#1a2119]'
                      }`}
                  >
                    <div className="flex gap-2 h-14 items-center justify-center overflow-clip px-5 py-3 relative">
                      <div className="text-[16px] text-white">
                        <p className="leading-none">{isSubmitting ? 'Saving...' : 'Continue'}</p>
                      </div>
                    </div>
                    <div aria-hidden="true" className="absolute border border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[8px]" />
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 2 */}
            {currentStage === 2 && (
              <div className="flex flex-col items-start justify-between w-full min-w-0 gap-8">
                <div className="flex flex-col gap-4 w-full min-w-0">
                  <div>
                    <header className="text-[#272635] text-[16px] md:text-24 font-semibold">Tell Donors Why You’re Fundraising</header>
                    <p className="text-[#27263580]">Clearly provide details to help us understand and process your fund request.</p>
                  </div>
                  <div className="bg-[#f9faf7] flex flex-col gap-2.5 items-start justify-start p-4 sm:p-[20px] relative rounded-[12px] w-full">
                    <div className="flex flex-col gap-2 items-start justify-start w-full">
                    <div className="text-[#272635] text-[16px] w-full">
                        <p className="leading-[1.4]">Give your fundraiser a title</p>
                      </div>

                      <div className="bg-white h-12 min-w-0 relative rounded-[8px] w-full">
                        <div className="flex h-full items-center justify-start overflow-clip px-4 py-3 relative w-full">
                          <input
                            type="text"
                            value={fundraiserTitle}
                            onChange={(e) => setFundraiserTitle(e.target.value)}
                            placeholder="Write a descriptive title"
                            className="w-full bg-transparent outline-none text-[#272635] text-[14px]"
                          />
                        </div>
                        <div
                          aria-hidden="true"
                          className="absolute border border-[rgba(39,38,53,0.1)] border-solid inset-[-0.5px] pointer-events-none rounded-[8.5px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#f9faf7] flex flex-col gap-2.5 items-start justify-start p-4 sm:p-[20px] relative rounded-[12px] w-full">
                    <div className="flex flex-col gap-2 items-start justify-start w-full">
                      <div className="text-[#272635] text-[16px] w-full">
                        <p className="leading-[1.4]">Tell your story (this is your campaign description)</p>
                      </div>

                      <div className="bg-white h-[180px] sm:h-[140px] min-w-0 relative rounded-[8px] w-full">
                        <div className="flex h-full items-start justify-start overflow-clip px-4 py-3 relative w-full">
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

                  <div className="text-[#272635] text-[16px] w-full">
                    <p className="leading-[1.4]">Upload a cover photo</p>
                  </div>

                  <div className="bg-[#f9faf7] flex flex-col gap-3 items-start justify-start p-4 sm:p-[20px] relative rounded-[12px] w-full">
                    <div aria-hidden="true" className="absolute border border-[rgba(39,38,53,0.1)] border-dashed inset-0 pointer-events-none rounded-[12px]" />

                    <div className="w-full">
                      {coverPreviewUrl ? (
                        <div className="w-full max-w-[640px] mx-auto relative">
                          <div className="w-full aspect-[16/9] rounded-[12px] overflow-hidden border border-[rgba(39,38,53,0.12)] bg-white shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]">
                            <img
                              src={coverPreviewUrl}
                              alt="Cover preview"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => setCoverFile(null)}
                            className="absolute top-2 right-2 inline-flex items-center gap-2 rounded-[10px] bg-white/95 backdrop-blur px-3 py-2 text-[12px] text-[#272635] border border-[rgba(39,38,53,0.14)] shadow-[0px_8px_18px_-10px_rgba(39,38,53,0.35)] hover:bg-[#eceee4] transition-colors"
                            aria-label="Remove cover image"
                          >
                            <Trash2 className="size-4" />
                            <span className="font-medium">Remove</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => coverInputRef.current?.click()}
                            className="mt-3 inline-flex items-center gap-2 text-[#198754] text-[14px] underline hover:text-[#146c43] transition-colors"
                          >
                            <Upload className="size-4" />
                            Change photo
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => coverInputRef.current?.click()}
                          className="flex flex-col gap-2 items-center justify-start w-full py-4"
                        >
                          <div className="relative shrink-0 size-7">
                            <img alt="Image Upload" className="block max-w-none size-full" src={imgImage} />
                          </div>

                          <div className="text-[14px] text-[rgba(39,38,53,0.5)] text-center w-full px-2">
                            <p className="leading-[1.4]">
                              <span className="[text-underline-position:from-font] decoration-solid text-[#198754] underline">
                                Click to insert
                              </span>
                              <span className="text-[#272635]">{` or drag and drop your photo here`}</span>
                            </p>
                          </div>

                          <div className="text-[14px] text-[rgba(39,38,53,0.5)] text-center w-full">
                            <p className="leading-[1.4]">Maximum file size is 20MB</p>
                          </div>
                        </button>
                      )}

                      <input
                        ref={coverInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between w-full">
                  <button
                    onClick={() => setCurrentStage(1)}
                    className="flex gap-2 items-center justify-center overflow-clip relative rounded-[8px] shrink-0"
                    disabled={isSubmitting}
                  >
                    <div className="text-[#272635] text-[16px]">
                      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-none underline">
                        Back
                      </p>
                    </div>
                  </button>

                  <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={saveStep2}
                      disabled={isSubmitting}
                      className={`flex gap-2 items-center justify-center overflow-clip relative rounded-[8px] shrink-0 ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
                        }`}
                    >
                      <div className="text-[#272635] text-[16px] text-center sm:text-left">
                        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-none underline">
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
                      className={`bg-[#273125] h-14 relative rounded-[8px] shrink-0 transition-colors w-full sm:w-auto ${isSubmitting ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[#1a2119]'
                        }`}
                    >
                      <div className="flex gap-2 h-14 items-center justify-center overflow-clip px-5 py-3 relative">
                        <div className="text-[16px] text-white">
                          <p className="leading-none">{isSubmitting ? 'Saving...' : 'Continue'}</p>
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
              <div className="flex flex-col items-start justify-between w-full min-w-0 gap-8">
                <div className="flex flex-col gap-6 items-start justify-start w-full min-w-0">
                  <div className="flex flex-col gap-2 items-start justify-start w-full">
                    <div className="text-[#272635] text-[22px] sm:text-[24px] w-full">
                      <p className="leading-[1.4] font-semibold">Boost Credibility With Donors</p>
                    </div>
                    <div className="text-[#272635] text-[16px] w-full">
                      <p className="leading-[1.4]">Upload documents to support your request.</p>
                    </div>
                  </div>

                  <div className="bg-[rgba(39,38,53,0.1)] h-px w-full"></div>

                  <div className="flex flex-col gap-6 items-start justify-start w-full min-w-0">
                    <div className="text-[#272635] text-[18px] w-full">
                      <p className="leading-[1.4] font-semibold">Add documents</p>
                    </div>

                    {uploadedFiles.length === 0 && (
                      <div className="bg-[#f9faf7] flex flex-col gap-4 items-start justify-start p-6 relative rounded-[12px] w-full">
                        <div className="flex flex-col gap-4 items-center justify-start w-full">
                          <div className="relative shrink-0 size-7">
                            <img alt="Image Upload" className="block max-w-none size-full" src={imgImage} />
                          </div>
                          <div className="text-[14px] text-[rgba(39,38,53,0.5)] text-center w-full px-2">
                            <p className="leading-[1.4]">
                              <span className="[text-underline-position:from-font] decoration-solid text-[#198754] underline">Click to insert</span>
                              <span className="text-[#272635]">{` or drag and drop your document here`}</span>
                            </p>
                          </div>
                          <div className="text-[14px] text-[rgba(39,38,53,0.5)] text-center w-full">
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
                      <div className="flex flex-col gap-4 items-start justify-start w-full">
                        {uploadedFiles.map((file) => (
                          <div
                            key={file.id}
                            className="bg-white flex flex-col gap-4 items-start justify-start p-4 relative rounded-[8px] w-full border border-[rgba(39,38,53,0.1)]"
                          >
                            <div className="flex flex-col sm:flex-row gap-4 items-start justify-start w-full">
                              <div className="relative shrink-0 size-10">
                                <img alt="File Icon" className="block max-w-none size-full" src={imgFile} />
                              </div>

                              <div className="flex flex-col gap-4 grow w-full min-w-0">
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between w-full">
                                  <div className="flex flex-col gap-1 items-start justify-start min-w-0 w-full">
                                    <div className="text-[#272635] text-[14px] w-full">
                                      <p className="leading-[1.4] break-words">{file.name}</p>
                                    </div>
                                    <div className="text-[rgba(39,38,53,0.5)] text-[12px]">
                                      <p className="leading-[1.4]">{file.size}</p>
                                    </div>
                                  </div>

                                  <button
                                    onClick={() => removeDoc(file.id)}
                                    className="text-red-500 text-[12px] underline hover:text-red-600 transition-colors shrink-0"
                                    disabled={isSubmitting}
                                  >
                                    <p className="leading-[1.4]">Remove</p>
                                  </button>
                                </div>

                                <div className="flex flex-col gap-1 items-start justify-start w-full">
                                  <div className="bg-[rgba(39,38,53,0.1)] h-1 w-full rounded-full overflow-hidden">
                                    <div
                                      className={`h-full transition-all duration-300 ${file.status === 'completed'
                                          ? 'bg-[#198754]'
                                          : file.status === 'error'
                                            ? 'bg-red-500'
                                            : 'bg-[#198754]'
                                        }`}
                                      style={{ width: `${file.progress}%` }}
                                    />
                                  </div>

                                  <div className="text-[rgba(39,38,53,0.5)] text-[12px]">
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
                          className="text-[#198754] text-[14px] underline hover:text-[#146c43] transition-colors"
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

                    <div className="text-[#272635] text-[14px] w-full">
                      <p className="leading-[1.4]">
                        Examples: admission offer letters, semester exam reports, attestations from your course advisor/lecturer.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between w-full">
                  <button
                    onClick={() => setCurrentStage(2)}
                    className="flex gap-2 items-center justify-center overflow-clip relative rounded-[8px] shrink-0"
                    disabled={isSubmitting}
                  >
                    <div className="text-[#272635] text-[16px]">
                      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid leading-none underline">
                        Back
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={uploadDocumentsAndFinish}
                    disabled={isSubmitting}
                    className={`h-14 relative rounded-[8px] shrink-0 transition-colors w-full sm:w-auto ${isSubmitting ? 'bg-[#6c757d] cursor-not-allowed' : 'bg-[#198754] hover:bg-[#146c43]'
                      }`}
                  >
                    <div className="flex gap-2 h-14 items-center justify-center overflow-clip px-5 py-3 relative">
                      <div className="text-[16px] text-white">
                        <p className="leading-none">{isSubmitting ? 'Creating Campaign...' : 'Create Campaign'}</p>
                      </div>
                    </div>
                    <div aria-hidden="true" className="absolute border border-[#146c43] border-solid inset-0 pointer-events-none rounded-[8px]" />
                  </button>
                </div>
              </div>
            )}
            </div>
          </section>
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
  )
}