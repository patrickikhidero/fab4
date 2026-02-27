import { api } from "@/lib/api/client";

export type ApiUser = {
  id: number;
  first_name?: string | null;
  email?: string | null;
  [k: string]: any;
};

export type ApiAttachment = {
  id: number;
  file: string;
  uploaded_at?: string;
  [k: string]: any;
};

export type ApiMessage = {
  id: number;
  conversation: number;
  sender: ApiUser;
  text?: string | null;
  attachments?: ApiAttachment[] | null;
  created_at?: string;
  updated_at?: string;
  [k: string]: any;
};

export type ApiConversation = {
  id: number;
  creator: ApiUser;
  receiver: ApiUser;
  purpose: "CAMPAIGN" | "FUND_REQUEST" | "DONORS" | "COMPLAINT" | string;
  academic_session?: string | null;
  is_active: boolean;
  last_message?: ApiMessage | null;
  messages_count?: number;
  created_at?: string;
  updated_at?: string;
  // retrieve endpoint returns messages
  messages?: ApiMessage[];
  [k: string]: any;
};

export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type ConversationPurpose =
  | "CAMPAIGN"
  | "COMPLAINT"
  | "DONORS"
  | "FUND_REQUEST"
  | "all";

export type CreateConversationPayload = {
  receiver_id: number;
  purpose: Exclude<ConversationPurpose, "all">;
  academic_session?: string;
};

export type UpdateConversationPayload = Partial<CreateConversationPayload> & {
  is_active?: boolean;
};

export type SendMessagePayload = {
  text: string;
  uploaded_files?: string[];
};

const BASE = "/conversation/conversation/";

/**
 * List conversations.
 * IMPORTANT: returns ARRAY (results), not the paginated wrapper,
 * so your page can safely do: items.filter(...)
 */
export async function listConversations(params?: {
  purpose?: ConversationPurpose;
  limit?: number;
  offset?: number;
}) {
  const cleaned =
    params?.purpose && params.purpose !== "all"
      ? params
      : { ...params, purpose: undefined };

  const res = await api.get<ApiConversation[]>(BASE, { params: cleaned });
  console.log(res.data)
  return res.data ?? [];
}

export async function createConversation(payload: CreateConversationPayload) {
  const res = await api.post<ApiConversation>(BASE, payload);
  return res.data;
}

export async function getConversation(id: string | number) {
  const res = await api.get<ApiConversation>(`${BASE}${id}/`);
  return res.data;
}

export async function putConversation(id: string | number, payload: UpdateConversationPayload) {
  const res = await api.put<ApiConversation>(`${BASE}${id}/`, payload);
  return res.data;
}

export async function patchConversation(id: string | number, payload: UpdateConversationPayload) {
  const res = await api.patch<ApiConversation>(`${BASE}${id}/`, payload);
  return res.data;
}

export async function deleteConversation(id: string | number) {
  const res = await api.delete<void>(`${BASE}${id}/`);
  return res.data;
}

export async function clearConversationMessages(id: string | number) {
  // POST /conversation/conversation/{id}/clear_messages/
  const res = await api.post(`${BASE}${id}/clear_messages/`);
  return res.data;
}

export async function endConversation(id: string | number) {
  // POST /conversation/conversation/{id}/end_conversation/
  const res = await api.post(`${BASE}${id}/end_conversation/`);
  return res.data;
}

export async function sendConversationMessage(
  id: string | number,
  payload: SendMessagePayload,
) {
  // POST /conversation/conversation/{id}/send_message/
  const res = await api.post<ApiMessage>(`${BASE}${id}/send_message/`, payload);
  return res.data;
}

export async function getConversationsWithUser(params: {
  user_id: number;
  limit?: number;
  offset?: number;
}) {
  // GET /conversation/conversation/with_user/?user_id=...
  const res = await api.get<Paginated<ApiConversation>>(`${BASE}with_user/`, { params });
  return res.data.results ?? [];
}