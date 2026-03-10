
export type StoredUser = {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  photo?: string | null;
  user_type?: string;
}


export function setAuthTokens(tokens: { access?: string; refresh?: string; user?: object }) {
  if (tokens.access) localStorage.setItem("fab4_access", tokens.access);
  if (tokens.refresh) localStorage.setItem("fab4_refresh", tokens.refresh);
  if (tokens.user) localStorage.setItem("fab4_user", JSON.stringify(tokens.user));
}

export function getAccessToken() {
  return localStorage.getItem("fab4_access");
}

export function getStoredUser(): StoredUser | null {
  if (typeof window === "undefined") return null;
  const userStr = localStorage.getItem("fab4_user");
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
  return null;
}

// Decode JWT to get user ID (for when user data isn't explicitly stored)
export function getUserIdFromToken(): number | null {
  const accessToken = getAccessToken();
  if (!accessToken) return null;
  
  try {
    // JWT format: header.payload.signature
    const parts = accessToken.split('.');
    if (parts.length !== 3) return null;
    
    // Decode the payload (middle part)
    const payload = JSON.parse(atob(parts[1]));
    return payload.user_id || payload.sub || null;
  } catch {
    return null;
  }
}

export function getCurrentUserId(): number | null {
  const u = getStoredUser();
  const id = Number(u?.id);
  if (Number.isFinite(id) && id > 0) return id;
  return getUserIdFromToken();
}