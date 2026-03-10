import { CampaignOverview } from '@/components/modules/student'

export default function CampaignPage() {
  const userData = {
    name: 'Influence',
    email: 'talktome@fabfour.org',
    avatar: '/images/avatars/default-avatar.png'
  }

  return (
    <div className="min-h-screen bg-[#eceee4]">
      <CampaignOverview userData={userData} />
    </div>
  )
}
