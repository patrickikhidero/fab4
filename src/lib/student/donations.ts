// lib/student/donations.ts
import { api } from "@/lib/api/client" // whatever axios/fetch wrapper you use

export async function listDonationsByCampaign(campaignId: number) {
  const res = await api.get(`/donations/donations_list/${campaignId}/`)
  return res.data
}