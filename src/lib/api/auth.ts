import { api } from "./client";

export type LoginRequest = {
  email: string;
  password?: string;
};

export type LoginResponse = {
  access?: string;
  refresh?: string;
  token?: string;
  access_token?: string;
  refresh_token?: string;
  user?: unknown;
};

export async function login(payload: LoginRequest) {
  const res = await api.post<LoginResponse>("/authentications/login/", payload);
  return res.data;
}