import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import {
  createCampaign,
  createCampaignDocument,
  updateCampaign,
  type Campaign,
  type CreateCampaignPayload,
} from "@/lib/student/campaign";

type UpdateCampaignVars = {
  id: number;
  payload: Partial<CreateCampaignPayload>;
};

type CreateCampaignDocumentVars = {
  campaignId: number;
  files: File[];
};

export function useCreateCampaignMutation(
  options?: Omit<UseMutationOptions<Campaign, Error, CreateCampaignPayload, unknown>, "mutationFn">
) {
  return useMutation<Campaign, Error, CreateCampaignPayload>({
    mutationFn: createCampaign,
    ...options,
  });
}

export function useUpdateCampaignMutation(
  options?: Omit<UseMutationOptions<Campaign, Error, UpdateCampaignVars, unknown>, "mutationFn">
) {
  return useMutation<Campaign, Error, UpdateCampaignVars>({
    mutationFn: ({ id, payload }) => updateCampaign(id, payload),
    ...options,
  });
}

export function useCreateCampaignDocumentMutation(
  options?: Omit<UseMutationOptions<unknown, Error, CreateCampaignDocumentVars, unknown>, "mutationFn">
) {
  return useMutation<unknown, Error, CreateCampaignDocumentVars>({
    mutationFn: ({ campaignId, files }) => createCampaignDocument(campaignId, files),
    ...options,
  });
}

