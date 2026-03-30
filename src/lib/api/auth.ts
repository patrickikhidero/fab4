import { api } from "./client";

export type LoginRequest = {
  email: string;
};

export type SignUpRequest = {
  email: string;
  user_type?: "STUDENT" | "DONOR";
}

export type LoginResponse = {
  access?: string;
  refresh?: string;
  token?: string;
  access_token?: string;
  refresh_token?: string;
  user?: unknown;
  detail?: string;
  message?: string;
};

export type AuthenticatedUser = {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  last_login?: string;
  user_type?: string;
  mfa_enabled?: boolean;
  photo?: string | null;
};

export type AuthenticateResponse = {
  refresh?: string;
  access?: string;
  user?: AuthenticatedUser;
};

export async function login(payload: LoginRequest) {
  const res = await api.post<LoginResponse>("/authentications/login/", payload);
  return res.data;
}

export async function signup(payload: SignUpRequest){
  const res = await api.post<SignUpRequest>("/authentications/signup/", payload);
  return res.data;
}

export async function authenticate(key: string) {
  const res = await api.get<AuthenticateResponse>(
    `/authentications/authenticate/${encodeURIComponent(key)}/`
  );
  return res.data;
}