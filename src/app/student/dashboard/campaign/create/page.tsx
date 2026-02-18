import { CreateCampaign } from '@/components/modules/student/CreateCampaign'

export default function CreateCampaignPage() {
  const userData = {
    name: 'Influence',
    email: 'talktome@fabfour.org',
    avatar: '/images/avatars/default-avatar.png'
  }

  return (
    <div className="min-h-screen bg-[#eceee4]">
      <CreateCampaign userData={userData} />
    </div>
  )
}
